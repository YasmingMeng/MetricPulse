/*
 * @Description: 
 * @Date: 2025-10-27 17:09:28
 * @LastEditTime: 2025-10-30 10:53:24
 */
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, menu_name as name, menu_ename as title, icon_path as icon, sort_order, is_active as current FROM main_menus WHERE is_active = 1 ORDER BY sort_order ASC'
    );

    // 格式化菜单数据，添加 href 和空的子菜单
    const menus = result.rows.map((menu) => ({
      name: menu.name,
      href: '#',
      current: menu.current === 1 || menu.current === true,
      title: menu.title,
      icon: menu.icon,
      childrenMenu: [], // 子菜单可以从其他表加载
    }));

    return NextResponse.json({ menus }, { status: 200 });
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

