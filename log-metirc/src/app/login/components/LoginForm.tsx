/*
 * @Description: 
 * @Date: 2025-04-07 13:46:52
 * @LastEditTime: 2025-04-07 16:41:54
 */
"use client";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { LoginState } from '@/app/lib/user';

interface LoginFormProps {
  formAction: (formData: FormData) => void;
  state: LoginState | null;
  isPending: boolean;
  onFlip: () => void;
}

export default function LoginForm({ formAction, state, isPending, onFlip }: LoginFormProps) {
  return (
    <div className="card-face front bg-white/20 backdrop-blur-sm shadow-md rounded-md p-6">
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm/6 font-medium text-white">账号</label>
          <div className="mt-2 relative">
             <input 
              type="email" 
              name="username" 
              id="username"
             autoComplete="off"
              className="input-transparent"
             />  
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
            <label htmlFor="password" className="block text-sm/6 font-medium text-white">密码</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-blue-400 hover:text-blue-800">忘记密码？</a>
            </div>
          </div>
          <div className="mt-2 relative">
            <input 
              type="password"
              name="password" 
              id="password" 
             autoComplete="off"
             className="input-transparent"
            />
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
      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {state?.success === false && state?.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
      <p className="mt-10 text-center text-sm/6 text-blue-50">
        未注册？
        <button 
          onClick={onFlip}
          className="font-semibold text-blue-400 hover:text-blue-800 ml-1"
        >
          注册后开始使用
        </button>
      </p>
    </div>
  );
}