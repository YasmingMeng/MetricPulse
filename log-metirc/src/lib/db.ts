/*
 * @Description: 
 * @Date: 2025-06-12 10:53:09
 * @LastEditTime: 2025-12-03 15:42:44
 */
import { Pool, PoolClient } from 'pg';
import { getDatabaseSchema } from './db-config';

// 验证 schema 名称的安全性（只允许字母、数字、下划线）
function validateSchemaName(schema: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema);
}

// 获取当前 schema
function getSchema(): string {
  const schema = getDatabaseSchema();
  if (validateSchemaName(schema)) {
    console.log(`schema路径: ${schema}, preview, db_ts`);
    return schema;
  }
  console.error(`校验失败: ${schema}. 使用'public'代替.`);
  return 'public';
}

// 验证 DATABASE_URL 是否存在
function validateDatabaseUrl(): void {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL 环境变量未设置！\n' +
      '请在 .env.local 文件中添加：\n' +
      'DATABASE_URL=postgresql://username:password@localhost:5432/astron'
    );
  }
  
  // 验证连接字符串格式
  const url = process.env.DATABASE_URL;
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    console.warn('⚠️  DATABASE_URL 格式可能不正确，应以 postgresql:// 或 postgres:// 开头');
  }
}

// 验证环境变量
validateDatabaseUrl();

// 创建数据库连接池
const basePool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 获取当前 schema
const getSchemaForPath = () => getSchema();

// 用于跟踪已设置 search_path 的连接
const connectionsWithSearchPath = new WeakSet<PoolClient>();

// 设置 search_path 的函数
async function ensureSearchPath(client: PoolClient): Promise<void> {
  // 如果这个连接已经设置过，跳过
  if (connectionsWithSearchPath.has(client)) {
    return;
  }
  
  const schema = getSchemaForPath();
  try {
    await client.query(`SET search_path TO "${schema}", public`);
    // 标记这个连接已设置
    connectionsWithSearchPath.add(client);
  } catch (error: any) {
    console.error(`设置search_path失败:`, error.message);
    throw error;
  }
}

// 添加连接错误处理
basePool.on('error', (err: Error) => {
  console.error('数据库连接池错误:', err.message);
  if (err.message.includes('ECONNREFUSED')) {
    console.error('请确保 PostgreSQL 数据库服务正在运行');
  }
});

// 在每个新连接建立时设置 search_path
basePool.on('connect', async (client: PoolClient) => {
  console.log("✅ 数据库连接成功");
  await ensureSearchPath(client);
});

// 导出原始的 pool（用于需要自定义的地方）
export { basePool };

// 创建包装的 pool，确保使用正确的 search_path
const pool = {
  ...basePool,
  // 重写 query 方法，确保 search_path 正确
  query: async (text: string, params?: any[]) => {
    try {
      console.log('text', text);
      return await basePool.query(text, params); // pool.query 会自动处理连接
    } catch (error: any) {
      // 错误信息打印
      console.error('数据库查询错误:', error.message);
      throw error;
    }
  },
};

export default pool; 