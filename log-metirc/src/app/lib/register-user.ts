/*
 * @Description: 
 * @Date: 2025-04-09 23:58:08
 * @LastEditTime: 2025-05-22 11:05:56
 */
"use server";
import { z } from 'zod';
import { Pool } from 'pg';
import { hash } from 'bcrypt';


// 验证模式
const RegisterFormSchema = z.object({
  username: z.string({
    invalid_type_error: '请填写用户名',
  }).min(3, '用户名至少3个字符'),
  email: z.string({
    invalid_type_error: '请填写邮箱',
  }).email('请输入有效的邮箱地址'),
  password: z.string({
    invalid_type_error: '请填写密码',
  }).min(6, '密码至少6个字符'),
});

// 初始化数据库连接池
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export type RegisterState = {
  success: boolean | null;
  errors?: {
    username?: string[] | null;
    email?: string[] | null;
    password?: string[] | null;
  };
  message?: string | null;
  redirectUrl?: string | null;
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  // 验证表单数据
  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get('register-username'),
    email: formData.get('register-email'),
    password: formData.get('register-password'),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    // 验证用户名是否存在
    const userNameCheck = await pool.query(
      'SELECT username FROM user_info WHERE username = $1',
      [validatedFields.data.username]
    );
    if (userNameCheck.rows.length > 0) {
      return {
        success: false,
        message: '该用户名已被注册'
      };
    }

    // 验证邮箱是否存在
    const emailCheck = await pool.query(
      'SELECT email FROM user_info WHERE email = $1',
      [validatedFields.data.email]
    );
    if (emailCheck.rows.length > 0) {
      return {
        success: false,
        message: '该邮箱已注册，请直接登录'
      };
    }
    // 对密码进行加密
    const hashedPassword = await hash(validatedFields.data.password, 10);

    // 插入新用户
    await pool.query(
      `INSERT INTO user_info (username, email, password) 
       VALUES ($1, $2, $3)`,
      [
        validatedFields.data.username,
        validatedFields.data.email,
        hashedPassword
      ]
    );
    // redirect('/dashboard');
    return {
      success: true,
      message: '注册成功',
      redirectUrl: '/dashboard'  // Add this new property
    };
  } catch (error) {
    console.error('注册错误:', error);
    return {
      success: false,
      message: '注册失败，请稍后重试'
    };
  }
}

