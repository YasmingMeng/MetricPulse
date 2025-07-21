/*
 * @Description: 
 * @Date: 2025-06-27 11:04:26
 * @LastEditTime: 2025-06-27 11:05:02
 */

 //菜单结构
interface MenuItem {
  name: string;
  href: string;
  current: boolean;
  childrenMenu?: { name: string; href: string; current: boolean }[];
}

export interface TopNavProps {
  MainMenu: MenuItem[];
}