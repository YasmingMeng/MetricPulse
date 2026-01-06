# 数据库环境配置说明

## 环境架构

项目使用 PostgreSQL 数据库，包含两个 schema：

- **preview schema**：测试环境数据库
- **public schema**：正式环境数据库

## 环境变量配置

### .env 文件配置

创建 `.env.local` 文件（或 `.env`）并配置以下变量：

```env
# 数据库连接配置
DATABASE_URL=postgresql://username:password@localhost:5432/astron

# 数据库 Schema 配置
# preview = 测试环境（默认）
# public = 正式环境
DATABASE_SCHEMA=preview

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 使用方法

### 切换环境

1. **测试环境**（默认）：

   ```env
   DATABASE_SCHEMA=preview
   ```

   使用 `preview` schema 中的表

2. **正式环境**：
   ```env
   DATABASE_SCHEMA=public
   ```
   使用 `public` schema 中的表

### Search Path 自动设置

系统会自动为每个数据库连接设置 `search_path`，这意味着：

- ✅ 查询时可以直接使用表名：`SELECT * FROM main_menus`
- ✅ 不需要显式指定 schema：`SELECT * FROM preview.main_menus`
- ✅ 代码更简洁，维护更方便

### 在代码中使用

代码会自动根据 `DATABASE_SCHEMA` 环境变量切换到对应的 schema：

```typescript
import { formatTableName, getDatabaseSchema, isTest } from '@/lib/db-config'

// 获取当前使用的 schema
const schema = getDatabaseSchema() // 'preview' 或 'public'

// 格式化表名
const tableName = formatTableName('main_menus') // preview."main_menus" 或 public."main_menus"

// 判断环境
if (isTest()) {
  console.log('当前为测试环境')
}
```

## 数据库表结构

### main_menus 表

需要在两个 schema 中创建相同的表结构：

```sql
-- 在 preview schema 中创建（测试环境）
CREATE TABLE preview."main_menus" (
  id INT PRIMARY KEY,
  menu_name VARCHAR(100) NOT NULL,
  menu_ename VARCHAR(100),
  icon_path VARCHAR(200),
  sort_order INT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 在 public schema 中创建（正式环境）
CREATE TABLE public."main_menus" (
  id INT PRIMARY KEY,
  menu_name VARCHAR(100) NOT NULL,
  menu_ename VARCHAR(100),
  icon_path VARCHAR(200),
  sort_order INT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 初始化数据

### 测试环境

在 pgAdmin4 中执行：

```bash
# 执行前确保选择了正确的数据库
# 在 preview schema 中执行
```

然后执行 `sql/insert_main_menus.sql`（该文件已配置为使用 preview schema）

### 正式环境

1. 修改 `sql/insert_main_menus.sql` 中的 schema 为 `public`
2. 或创建专门的 `sql/insert_main_menus_prod.sql`

## 注意事项

1. **数据同步**：preview 和 public 的数据需要分别维护
2. **测试隔离**：测试环境变更不会影响正式环境
3. **环境切换**：修改环境变量后需要重启开发服务器
4. **安全性**：不要在代码中硬编码 schema，始终使用环境变量

## 故障排查

### 检查当前使用的 schema

运行诊断脚本：

```bash
npm run test:db
```

会显示当前连接的数据库和 schema 信息。

### 常见错误

1. **表不存在**：

   - 确认表在对应 schema 中存在
   - 检查 `DATABASE_SCHEMA` 环境变量是否正确

2. **权限问题**：

   - 确认数据库用户有访问对应 schema 的权限

3. **连接失败**：
   - 检查 `DATABASE_URL` 是否正确
   - 确认数据库服务正在运行
