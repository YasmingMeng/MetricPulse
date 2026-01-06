<!--
 * @Description:
 * @Date: 2025-10-28 17:24:04
 * @LastEditTime: 2025-10-28 17:24:33
-->

# 环境配置快速指南

## 快速开始

### 1. 配置环境变量

创建 `.env.local` 文件：

```env
# 数据库连接
DATABASE_URL=postgresql://username:password@localhost:5432/astron

# 环境配置（测试环境使用 preview，正式环境使用 public）
DATABASE_SCHEMA=preview
```

### 2. 初始化测试数据库

在 pgAdmin4 中执行：

```bash
# 执行测试环境的 SQL
sql/insert_main_menus_preview.sql
```

或在命令行执行：

```bash
psql -U your_username -d astron -f sql/insert_main_menus_preview.sql
```

### 3. 启动项目

```bash
npm install
npm run dev
```

## 环境切换

### 切换到测试环境

```env
DATABASE_SCHEMA=preview
```

### 切换到正式环境

```env
DATABASE_SCHEMA=public
```

> ⚠️ **注意**：切换环境后需要重启开发服务器

## 数据库 Schema 说明

### Preview Schema（测试环境）

- 用于开发和测试
- 表路径：`preview."main_menus"`
- 数据不会影响生产环境

### Public Schema（正式环境）

- 用于生产环境
- 表路径：`public."main_menus"`
- 仅在上线时使用

## 完整文档

详细配置请参考：[docs/DATABASE_ENV.md](docs/DATABASE_ENV.md)
