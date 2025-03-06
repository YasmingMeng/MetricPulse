/*
 * @Description: 
 * @Date: 2025-03-04 22:53:30
 * @LastEditTime: 2025-03-06 15:10:10
 */
"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here

    // On successful login, redirect to the desired page
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-100">
      <h2 className="mt-10 text-center h-15 text-2xl/9 font-bold tracking-tight text-gray-900">登录你的账号</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-205 h-115 bg-white shadow-md rounded-md p-6">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">邮箱地址</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-400 hover:outline-blue-300 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">密码</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-400 hover:text-indigo-500">忘记密码？</a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-400 hover:outline-blue-300 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">登录</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
         不是会员？
          <a href="#" className="font-semibold text-blue-400 hover:text-indigo-400">14天免费试用</a>
        </p>
     </div>
    </div>
  );
};

export default Login;