/*
 * @Description: 
 * @Date: 2024-11-11 14:23:43
 * @LastEditTime: 2025-03-31 19:03:56
 */
"use server";
import {  z } from 'zod';
// import { sql } from '@vercel/postgres';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { signIn } from '../../../auth';
 
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

export async function authenticate (
  preState: LoginState,
  formData: FormData 
): Promise<LoginState>{
  // Validate form fields using Zod
  const validatedFields = LoginConfirm.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  console.log('...正在登录', formData, validatedFields);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const signInData: Record<string, string | number | boolean | object> = {};
    formData.forEach((value, key) => {
      signInData[key] = value.toString();
    });
    signInData['query'] = {
      nextauth: 'credentials',
      pathname: './dashboard',
    };
    console.log('signInData', signInData);
     // 确保 req.query 存在
    const result  = await signIn('credentials', signInData);
    console.log('result', result);
    if(result){
      return { success: true, message: '认证成功' };
    } else {
      return { success: false, message: '认证失败' };
    }
  } catch (error: unknown) {
    console.error('认证失败', error);
    if (error) {
      return { success: false, message: '认证失败' };
    }
    throw error;
  }
}