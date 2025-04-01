/*
 * @Description: 
 * @Date: 2025-03-11 16:28:52
 * @LastEditTime: 2025-03-11 16:29:53
 */
export interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}