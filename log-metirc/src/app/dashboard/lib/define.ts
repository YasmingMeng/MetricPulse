/*
 * @Description: 
 * @Date: 2025-06-27 11:04:26
 * @LastEditTime: 2025-12-04 15:18:32
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

interface MenuQueryResult {
  main_id: number;
  main_name: string;
  main_title: string | null;
  main_icon: string | null;
  main_sort: number;
  main_active: boolean;
  sub_id: number | null;
  sub_name: string | null;
  sub_title: string | null;
  sub_sort: number | null;
  sub_active: boolean | null;
}

export interface TopNavProps {
  MainMenu: MenuItem[];
}