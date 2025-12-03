<!--
 * @Description:
 * @Date: 2025-10-27 17:10:31
 * @LastEditTime: 2025-10-29 16:21:41
-->

# 菜单数据库配置

## 数据库表结构

### main_menus 表

| 字段名     | 类型      | 说明                   |
| ---------- | --------- | ---------------------- |
| id         | INT       | 主键，菜单 ID          |
| menu_name  | VARCHAR   | 菜单名称（中文）       |
| menu_ename | VARCHAR   | 菜单英文名称           |
| icon_path  | VARCHAR   | 图标路径               |
| sort_order | INT       | 排序顺序               |
| is_active  | TINYINT   | 是否激活（1=是，0=否） |
| created_at | TIMESTAMP | 创建时间               |

## 使用方法

### 1. 执行 SQL 插入语句

在数据库中执行以下 SQL 文件来初始化菜单数据：

```bash
# 在数据库中执行
psql -U your_username -d astron -f sql/insert_main_menus.sql
```

或直接在数据库管理工具中执行 `sql/insert_main_menus.sql` 文件。

### 2. 检查数据

执行以下 SQL 查询验证数据是否正确插入：

```sql
SELECT * FROM main_menus ORDER BY sort_order ASC;
```

## 功能说明

### 从数据库加载菜单

系统已经配置为从数据库加载菜单数据：

1. **layout.tsx**: 在服务端组件中直接从数据库查询菜单
2. **API 路由**: 已创建 `/api/menus` 接口（可选使用）
3. **备用机制**: 如果数据库查询失败，会自动使用硬编码的备用数据

### 自定义菜单

要添加或修改菜单，只需在数据库中更新 `main_menus` 表即可，无需修改代码。

### 添加子菜单

目前子菜单数据（childrenMenu）需要单独处理。可以：

1. 创建 `sub_menus` 表存储子菜单
2. 在数据库中关联父子菜单关系
3. 更新 layout.tsx 中的查询逻辑加载子菜单

## 注意事项

- 确保 `.env` 文件中配置了正确的 `DATABASE_URL`
- `is_active` 设置为 1 的菜单才会显示
- 菜单按照 `sort_order` 字段排序

## 常见问题

### 问题：表不存在错误 (relation "main_menus" does not exist)

如果遇到此错误，但表在 pgAdmin4 中确实存在，可能是以下原因：

1. **表名大小写问题**：

   - PostgreSQL 对大小写敏感
   - 如果表创建时加了引号（如 `"Main_Menus"`），查询时也必须加引号
   - 我们已经使用 `public."main_menus"` 来指定 schema 和表名

2. **Schema 问题**：

   - 表可能在不同的 schema 中
   - 使用 `sql/check_database.sql` 检查表的实际位置

3. **数据库连接问题**：
   - 确认 `.env` 中的 `DATABASE_URL` 指向正确的数据库

#### 解决方案

1. **运行测试脚本诊断问题**：

```bash
npm run test:db
```

这个脚本会自动检测数据库连接、schema、表名等，并给出详细的诊断信息。

2. **在 pgAdmin4 中执行诊断 SQL**：
   执行 `sql/check_database.sql` 查看表的位置和所有相关信息。

3. **根据诊断结果修复**：
   - 如果表在其他 schema 中，修改代码中的 `public` 为实际 schema
   - 如果表名实际是 `"Main_Menus"`（大写），请执行：

```sql
-- 方案A：重命名表为小写（推荐）
ALTER TABLE public."Main_Menus" RENAME TO main_menus;

-- 或者方案B：保持原表名，修改代码中的表名
-- 找到所有 public."main_menus" 改为 public."Main_Menus"
```

4. **确保环境变量正确**：
   检查 `.env` 文件中的 `DATABASE_URL` 是否指向正确的数据库：

```env
DATABASE_URL=postgresql://username:password@localhost:5432/astron
```
