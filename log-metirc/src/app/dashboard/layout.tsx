/*
 * @Description: 
 * @Date: 2025-03-06 22:14:14
 * @LastEditTime: 2025-12-04 15:17:37
 */
import React from 'react';
import TopNav from './components/tapNav';
import pool from '@/lib/db';
import { MenuItem } from './lib/define';

function transformMenu(menu: any[]): MenuItem[] {
  const menuMap = new Map<string, MenuItem>();
  menu.forEach(item => {
    const mainId = item.main_id;
     // 如果这个主菜单还没有被处理过
     if (!menuMap.has(mainId)) {
      // 创建主菜单对象
      menuMap.set(mainId, {
        name: item.main_name,
        href: '#',
        current: item.main_active === true,
        title: item.main_title,
        icon: item.main_icon,
        childrenMenu: [] // 初始化子菜单数组
      });
    }
    // 如果这个主菜单已经被处理过，添加子菜单到主菜单的childrenMenu中
    if(item.sub_id && item.sub_id !== '') {
      menuMap.get(mainId)?.childrenMenu?.push({
        name: item.sub_name,
        href: item.sub_title ? `/dashboard/${item.sub_title}` : '#',
        current: item.sub_active === true,
      });
    }
  });

  return Array.from(menuMap.values());
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  // 从数据库获取菜单数据
  let mainMenu: MenuItem[] = [];
  
  try {
    const result = await pool.query(
      `SELECT  m.id as main_id,
        m.menu_name as main_name,
        m.menu_ename as main_title,
        m.icon_path as main_icon,
        m.sort_order as main_sort,
        m.is_active as main_active,
        s.id as sub_id,
        s.menu_name as sub_name,
        s.menu_ename as sub_title,
        s.icon_path as sub_icon,
        s.sort_order as sub_sort,
        s.is_active as sub_active
        FROM main_menus m
        LEFT JOIN sub_menus s ON m.id = s.mother_id
        ORDER BY m.sort_order ASC, s.sort_order ASC`
    );
    mainMenu = transformMenu(result.rows);
    console.log('mainMenu', mainMenu);
  } catch (error) {
    console.error('Error fetching menus:', error);
    // 如果数据库查询失败，使用硬编码的备用数据
    mainMenu = [
      { name: '数据中心', href: '#', current: false, title: 'data', icon: 'i-heroicons-chart-bar-solid', childrenMenu: [
        { name: '数据分析', href: '#', current: true },
        { name: '数据管理', href: '#', current: false },
      ]},
      { name: '日志中心', href: '#', current: false, title: 'log', icon: 'i-heroicons-document-text-solid', childrenMenu: [
        { name: '日志管理', href: '#', current: true },
        { name: '系统设置', href: '#', current: false },
        { name: '日志采集', href: '#', current: false },
      ]},
      { name: '系统监控', href: '#', current: false, title: 'monitor', icon: 'i-heroicons-server-solid', childrenMenu: [
        { name: '系统状态', href: '#', current: true },
        { name: '性能监控', href: '#', current: false },
        { name: '日志监控', href: '#', current: false },
        { name: '告警设置', href: '#', current: false },
      ]},
      { name: '用户中心', href: '#', current: false, icon: 'i-heroicons-user-circle-solid', childrenMenu: [
        { name: '用户管理', href: '#', current: true },
        { name: '角色管理', href: '#', current: false },
        { name: '权限管理', href: '#', current: false },
        { name: '个人设置', href: '#', current: false },
      ]},
      { name: '帮助中心', href: '#', current: false, title: 'help', icon: 'i-heroicons-question-mark-circle-solid', childrenMenu: [
        { name: '使用文档', href: '#', current: true },
        { name: '常见问题', href: '#', current: false },
        { name: '反馈建议', href: '#', current: false },
        { name: '联系我们', href: '#', current: false },
      ]},
    ];
  }

  return (
    <div className="flex h-screen flex-row bg-[#f0f2f5]">
       <div className="flex flex-row">
          <TopNav MainMenu={mainMenu} />
       </div>
       <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4">{children}</main>
          {/* <footer className="bg-blue-100 p-4">仪表盘底部信息</footer> */}
        </div>
    </div>
  );
}

export default DashboardLayout;