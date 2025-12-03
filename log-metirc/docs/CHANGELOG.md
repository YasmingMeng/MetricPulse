# 更新日志

## 2025-10-27 - 数据库环境管理

### ✨ 新增功能

1. **环境配置管理** (`src/lib/db-config.ts`)

   - 新增 `getDatabaseSchema()` 获取当前 schema
   - 新增 `formatTableName()` 格式化表名
   - 新增 `isTest()` 和 `isProduction()` 判断环境

2. **环境变量配置**

   - 通过 `DATABASE_SCHEMA` 控制使用哪个 schema
   - 默认使用 `preview`（测试环境）
   - 正式环境设置为 `public`

3. **新的 SQL 文件**
   - `sql/insert_main_menus_preview.sql` - 测试环境数据
   - `sql/insert_main_menus_production.sql` - 正式环境数据

### 🔧 修改内容

1. **src/app/dashboard/layout.tsx**

   - 使用动态 schema（`formatTableName()`）
   - 支持环境切换

2. **src/app/api/menus/route.ts**

   - 使用动态 schema
   - 支持环境切换

3. **配置文件**
   - 所有查询使用环境变量控制的 schema
   - 测试环境默认使用 `preview` schema

### 📝 文档更新

- 新增 `docs/DATABASE_ENV.md` - 详细的环境配置文档
- 新增 `README_ENV_SETUP.md` - 快速开始指南
- 更新 `sql/README.md` - 添加环境切换说明

### 🐛 Bug 修复

- 修复 ESLint `require()` 错误（使用 `.cjs` 扩展名）
- 修复表名大小写和 schema 问题

## 使用方法

### 配置环境变量

```env
# 测试环境（默认）
DATABASE_SCHEMA=preview

# 正式环境
DATABASE_SCHEMA=public
```

### 初始化数据库

测试环境：

```bash
psql -U user -d database -f sql/insert_main_menus_preview.sql
```

正式环境：

```bash
psql -U user -d database -f sql/insert_main_menus_production.sql
```
