/*
 * @Description: 
 * @Date: 2025-06-27 11:03:28
 * @LastEditTime: 2025-07-21 10:24:09
 */
"use client" 
import React from 'react';
import {TopNavProps} from "@/app/dashboard/lib/define";

export const MenuList = ({ MainMenu }: TopNavProps) => {
  const [openMenus, setOpenMenus] = React.useState<Set<string>>(new Set(['数据中心']));

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <nav>
     <ul className="flex flex-col space-y-1 p-2">
        {MainMenu.map((item) => (
          <li key={item.name} className="group relative">
            {item.childrenMenu ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-cyan-300/10 transition-colors duration-200 rounded"
                     onClick={() => toggleMenu(item.name)}>
                  <span className="text-sm text-[#9AE6B4] font-bold">{item.name}</span>
                  {/* <ChevronRightIcon 
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      openMenus.has(item.name) ? 'rotate-90' : ''
                    }`}
                  /> */}
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openMenus.has(item.name) ? 'max-h-96' : 'max-h-0'
                  }`}>
                  {item.childrenMenu.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="block menuitem"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <span
                onClick={() => toggleMenu(item.name)}
                className="block menuitem"
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};