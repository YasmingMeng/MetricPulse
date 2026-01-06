-- 注意区分测试环境和正式环境，测试环境是preview schema，正式环境是public schema

CREATE TABLE preview."sub_meuns"(
 id INT Primary key,
 mother_id INT not null,
 menu_name VARCHAR(100) NOT NULL,
 menu_ename VARCHAR(100),
 icon_path VARCHAR(200),
 sort_order INT NOT NULL,
 is_active BOOLEAN DEFAULT true,
 created_at TIMESTAMP DEFAULT NOW(),
 CONSTRAINT fk_mother_menu FOREIGN KEY (mother_id) 
    REFERENCES preview."main_menus"(id) 
    ON DELETE CASCADE
);
  
INSERT INTO preview."sub_menus" 
  (id, mother_id, menu_name, menu_ename, icon_path, sort_order, is_active, created_at) 
VALUES
  -- 数据中心的子菜单
  (1, 1, '数据分析', 'data-analysis', NULL, 1, false, NOW()),
  (2, 1, '数据管理', 'data-management', NULL, 2, false, NOW()),
  
  -- 日志中心的子菜单
  (3, 2, '日志管理', 'log-management', NULL, 1, false, NOW()),
  (4, 2, '系统设置', 'system-settings', NULL, 2, false, NOW()),
  (5, 2, '日志采集', 'log-collection', NULL, 3, false, NOW()),
  
  -- 系统监控的子菜单
  (6, 3, '系统状态', 'system-status', NULL, 1, false, NOW()),
  (7, 3, '性能监控', 'performance-monitor', NULL, 2, false, NOW()),
  (8, 3, '日志监控', 'log-monitor', NULL, 3, false, NOW()),
  (9, 3, '告警设置', 'alert-settings', NULL, 4, false, NOW()),
  
  -- 用户中心的子菜单
  (10, 4, '用户管理', 'user-management', NULL, 1, false, NOW()),
  (11, 4, '角色管理', 'role-management', NULL, 2, false, NOW()),
  (12, 4, '权限管理', 'permission-management', NULL, 3, false, NOW()),
  (13, 4, '个人设置', 'personal-settings', NULL, 4, false, NOW()),
  
  -- 帮助中心的子菜单
  (14, 5, '使用文档', 'documentation', NULL, 1, false, NOW()),
  (15, 5, '常见问题', 'faq', NULL, 2, false, NOW()),
  (16, 5, '反馈建议', 'feedback', NULL, 3, false, NOW()),
  (17, 5, '联系我们', 'contact', NULL, 4, false, NOW())
ON CONFLICT (id) DO UPDATE SET
  mother_id = EXCLUDED.mother_id,
  menu_name = EXCLUDED.menu_name,
  menu_ename = EXCLUDED.menu_ename,
  icon_path = EXCLUDED.icon_path,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;
