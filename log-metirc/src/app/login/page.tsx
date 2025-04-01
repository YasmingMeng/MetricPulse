/*
 * @Description: 
 * @Date: 2025-03-04 22:53:30
 * @LastEditTime: 2025-03-31 18:57:33
 */
"use client";
import React from 'react';
import { useActionState } from 'react';
import { authenticate, LoginState } from '@/app/lib/user';
import { ExclamationCircleIcon} from '@heroicons/react/24/outline';

const Login: React.FC = () => {
  const initialState: LoginState = {success: null, errors: {}, message: null};
  const [state, formAction, isPending] = useActionState(authenticate, initialState);
  
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-100 text-white bg-linear-to-r/hsl from-blue-950 to-teal-400">
      <h2 className="mt-10 text-center h-15 text-2xl/9 font-bold tracking-tight text-blue-50">登录你的账号</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-205 h-115 bg-white shadow-md rounded-md p-6">
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">账号</label>
            <div className="mt-2 relative">
              <input 
              type="email" 
              name="username" 
              id="username"
              autoComplete="email" 
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
              placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 hover:outline-blue-300 sm:text-sm/6" />
             <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state && state.errors?.username &&
              state.errors.username.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">密码</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-400 hover:text-blue-800">忘记密码？</a>
              </div>
            </div>
            <div className="mt-2 relative">
              <input 
              type="password"
               name="password" 
               id="password" 
               autoComplete="current-password" 
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
               focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 hover:outline-blue-300 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button 
            type="submit"
            aria-disabled={isPending}
            className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs 
            hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
            >
              {isPending ? '正在登录...' : '登录'}
            </button>
          </div>
        </form>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
         未注册？
          <a href="#" className="font-semibold text-blue-400 hover:text-blue-800">注册后开始使用</a>
        </p>
     </div>
    </div>
  );
};

export default Login;