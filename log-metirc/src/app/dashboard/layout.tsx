/*
 * @Description: 
 * @Date: 2025-03-06 22:14:14
 * @LastEditTime: 2025-03-09 20:21:08
 */
import React from 'react';
import TopNav from './components/tapNav';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainMenu =  [
    { name: '日志管理', href: '#', current: true },
    { name: '指标分析', href: '#', current: false },
    { name: '项目管理', href: '#', current: false },
    { name: '用户管理', href: '#', current: false },
    { name: '系统设置', href: '#', current: false },
  ]
  return (
    <div className="flex h-screen flex-col bg-[#f0f2f5]">
       <div className="flex flex-col">
         <TopNav />
       </div>
       <div className="flex flex-1 flex-row">
          <aside className="w-50 text-white bg-[#142334]">
          <nav>
            <ul>
              {mainMenu.map((item) => (
                <li
                  key={item.name}
                  className="hover:bg-[#5e7987] focus:bg-indigo-400 p-3 text-sm"
                >
                  {item.name} 
                </li>
            ))} 
            </ul>
          </nav>
          </aside>
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4">{children}</main>
            {/* <footer className="bg-blue-100 p-4">仪表盘底部信息</footer> */}
          </div>
       </div>
    </div>
  );
}

export default DashboardLayout;