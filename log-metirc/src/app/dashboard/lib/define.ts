/*
 * @Description: 
 * @Date: 2025-06-27 11:04:26
 * @LastEditTime: 2025-06-27 11:05:02
 */

 //菜单结构
export interface MenuItem {
  name: string;
  href: string;
  current: boolean;
  title?: string;
  icon?: string;
  childrenMenu?: { name: string; href: string; current: boolean }[];
}

export interface TopNavProps {
  MainMenu: MenuItem[];
}