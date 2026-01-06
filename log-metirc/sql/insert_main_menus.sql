-- 正式环境（public schema）菜单数据插入语句
-- 使用方法：在 pgAdmin4 中选择正确的数据库，然后执行此文件
-- 注意区分测试环境和正式环境，测试环境是preview schema，正式环境是public schema
-- 如果表不存在，先创建表
CREATE TABLE IF NOT EXISTS public."main_menus" (
  id INT PRIMARY KEY,
  menu_name VARCHAR(100) NOT NULL,
  menu_ename VARCHAR(100),
  icon_path VARCHAR(200),
  sort_order INT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 清空表（如果需要重新插入）
-- TRUNCATE TABLE public."main_menus";

-- 插入菜单数据
INSERT INTO public."main_menus" (id, menu_name, menu_ename, icon_path, sort_order, is_active, created_at) VALUES
(1, '数据中心', 'data', 'i-heroicons-chart-bar-solid', 1, true, NOW()),
(2, '日志中心', 'log', 'i-heroicons-document-text-solid', 2, false, NOW()),
(3, '系统监控', 'monitor', 'i-heroicons-server-solid', 3, false, NOW()),
(4, '用户中心', 'user', 'i-heroicons-user-circle-solid', 4, false, NOW()),
(5, '帮助中心', 'help', 'i-heroicons-question-mark-circle-solid', 5, false, NOW())
ON CONFLICT (id) DO UPDATE SET
  menu_name = EXCLUDED.menu_name,
  menu_ename = EXCLUDED.menu_ename,
  icon_path = EXCLUDED.icon_path,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

