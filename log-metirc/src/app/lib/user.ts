/*
 * @Description: 
 * @Date: 2024-11-11 14:23:43
 * @LastEditTime: 2025-04-07 10:58:16
 */
"use client";
import {  z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
 
const LoginFormSchema = z.object({
  id: z.string(),
  query: z.object({
    nextauth: z.boolean() || false,
    pathname: z.string() || './dashboard',
  }),
  username: z.string({
    invalid_type_error: '请填写账号',
  }),
  password: z.string({
    invalid_type_error: '请填写密码',
  }),
});
 
const LoginConfirm = LoginFormSchema.omit({ id: true, query: true });

export type LoginState = {
  success?:boolean | null;
  errors?: { 
    username?: string[] | null;
    password?: string[] | null;
  };
  message?: string | null;
};

export async function authenticate(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validatedFields = LoginConfirm.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await signIn('credentials', {
      username: validatedFields.data.username,
      password: validatedFields.data.password,
      redirect: false,
    });
    if (result?.error) {
     return { success: false, message: result.error };
    }
    console.log('登录成功', result);
    return { success: true, message: '登录成功' };
  } catch (error) {
    console.error('登录失败:', error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: '登录失败' };
  }
}