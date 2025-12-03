// 测试数据库连接和表结构
const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');

// 按照 Next.js 的优先级加载环境变量
// 优先级从高到低：.env.local > .env.development.local > .env.development > .env
// 先加载低优先级的，后加载高优先级的（使用 override: true 确保覆盖前面的值）
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}
if (fs.existsSync('.env.development')) {
  dotenv.config({ path: '.env.development', override: true });
}
if (fs.existsSync('.env.development.local')) {
  dotenv.config({ path: '.env.development.local', override: true });
}
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true }); // 最后加载，优先级最高，覆盖所有前面的值
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testDatabase() {
  try {
    console.log('🔍 开始检查数据库连接...\n');
    
    // 显示环境变量信息（隐藏密码）
    const dbUrl = process.env.DATABASE_URL || '未设置';
    const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':***@'); // 隐藏密码
    console.log('📋 DATABASE_URL:', maskedUrl);
    console.log('📋 DATABASE_SCHEMA:', process.env.DATABASE_SCHEMA || 'preview (默认)');
    console.log('');
    
    const client = await pool.connect();
    console.log('✅ 数据库连接成功\n');
    
    // 1. 检查当前数据库、schema 和 search_path
    const dbResult = await client.query(`
      SELECT 
        current_database() as db,
        current_schema() as schema,
        current_setting('search_path') as search_path
    `);
    console.log('📍 当前数据库:', dbResult.rows[0].db);
    console.log('📍 当前 Schema:', dbResult.rows[0].schema);
    console.log('📍 Search Path:', dbResult.rows[0].search_path);
    
    // 检查数据库名是否匹配
    if (dbResult.rows[0].db !== 'astron') {
      console.log(`⚠️  警告: 当前连接的数据库是 "${dbResult.rows[0].db}"，不是 "astron"`);
      console.log('   如果希望使用 astron 数据库，请修改 .env.local 中的 DATABASE_URL');
      console.log('   格式: postgresql://username:password@host:port/astron\n');
    }
    console.log('');
    
    // 2. 检查所有 schemas
    const schemasResult = await client.query('SELECT schema_name FROM information_schema.schemata');
    console.log('📁 可用的 Schemas:');
    schemasResult.rows.forEach(row => console.log('  -', row.schema_name));
    console.log('');
    
    // 3. 搜索所有菜单相关的表
    const tablesResult = await client.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE LOWER(table_name) LIKE '%menu%'
      ORDER BY table_schema, table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('📋 找到的菜单表:');
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_schema}.${row.table_name}`);
      });
      console.log('');
    } else {
      console.log('⚠️  未找到任何菜单相关的表\n');
    }
    
    // 4. 列出 public schema 中的所有表
    const allTablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📋 Public Schema 中的所有表:');
    if (allTablesResult.rows.length > 0) {
      allTablesResult.rows.forEach(row => {
        console.log('  -', row.table_name);
      });
    } else {
      console.log('  (空)');
    }
    console.log('');
    
    // 5. 检查 preview schema 中的所有表
    const previewTablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'preview'
      ORDER BY table_name
    `);
    
    console.log('📋 Preview Schema 中的所有表:');
    if (previewTablesResult.rows.length > 0) {
      previewTablesResult.rows.forEach(row => {
        console.log('  -', row.table_name);
      });
    } else {
      console.log('  (空)');
    }
    console.log('');
    
    // 6. 测试查询 main_menus 表的不同写法
    console.log('🔎 测试查询 main_menus 表...\n');
    
    const queries = [
      { name: 'preview."main_menus"', query: 'SELECT COUNT(*) as count FROM preview."main_menus"' },
      { name: 'public."main_menus"', query: 'SELECT COUNT(*) as count FROM public."main_menus"' },
      { name: 'main_menus', query: 'SELECT COUNT(*) as count FROM main_menus' },
      { name: 'preview."Main_Menus"', query: 'SELECT COUNT(*) as count FROM preview."Main_Menus"' },
    ];
    
    for (const { name, query } of queries) {
      try {
        const result = await client.query(query);
        console.log(`✅ 查询 ${name} 成功, 记录数:`, result.rows[0].count);
      } catch (e) {
        console.log(`❌ 查询 ${name} 失败:`, e.message);
      }
    }
    
    client.release();
    pool.end();
    
    console.log('\n✅ 测试完成');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testDatabase();

