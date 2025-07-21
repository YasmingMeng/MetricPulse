/*
 * @Description: 
 * @Date: 2025-03-06 22:14:14
 * @LastEditTime: 2025-07-09 16:38:30
 */
import React from 'react';
import TopNav from './components/tapNav';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainMenu =  [
    { name: '数据中心', 
      href: '#', 
      current: false, 
      title: 'data',
      icon: 'i-heroicons-chart-bar-solid',
      childrenMenu:[
        { name: '数据分析', href: '#', current: true },
        { name: '数据管理', href: '#', current: false },]
    },
    { name: '日志中心', 
      href: '#', 
      current: false,
      title:'log',
      icon: 'i-heroicons-document-text-solid',
      childrenMenu:[
      { name: '日志管理', href: '#', current: true },
      { name: '系统设置', href: '#', current: false },
      { name: '日志采集', href: '#', current: false },]
    },
    { name: '系统监控', 
      href: '#', 
      current: false, 
      title: 'monitor',
      icon: 'i-heroicons-server-solid',
      childrenMenu:[
        { name: '系统状态', href: '#', current: true },
        { name: '性能监控', href: '#', current: false },
        { name: '日志监控', href: '#', current: false },
        { name: '告警设置', href: '#', current: false },]
    },
    { name: '用户中心', 
      href: '#', 
      current: false, 
      icon: 'i-heroicons-user-circle-solid',
      childrenMenu:[
        { name: '用户管理', href: '#', current: true },
        { name: '角色管理', href: '#', current: false },
        { name: '权限管理', href: '#', current: false },
        { name: '个人设置', href: '#', current: false },]
    },
    { name: '帮助中心', 
      href: '#', 
      current: false, 
      title: 'help',
      icon: 'i-heroicons-question-mark-circle-solid',
      childrenMenu:[
        { name: '使用文档', href: '#', current: true },
        { name: '常见问题', href: '#', current: false },
        { name: '反馈建议', href: '#', current: false },
        { name: '联系我们', href: '#', current: false },]
    },
  ]
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