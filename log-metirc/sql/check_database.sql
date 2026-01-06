-- 检查数据库连接和表是否存在
-- 执行此 SQL 查看结果

-- 1. 检查当前连接的数据库
SELECT current_database();

-- 2. 检查当前 schema
SELECT current_schema();

-- 3. 检查所有 schemas
SELECT schema_name FROM information_schema.schemata;

-- 4. 搜索 main_menus 表（不区分大小写）
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE LOWER(table_name) LIKE '%menu%';

-- 5. 检查 public schema 中的所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 6. 检查 preview schema 中的所有表
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'preview';

-- 7. 检查 main_menus 表的详细信息（所有 schemas）
SELECT 
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'main_menus'
ORDER BY table_schema, ordinal_position;

