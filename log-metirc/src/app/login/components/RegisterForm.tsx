/*
 * @Description: 
 * @Date: 2025-04-07 13:47:25
 * @LastEditTime: 2025-04-25 17:31:46
 */
"use client";
// import { inputStyles } from "../styles/inputStyles";
import { RegisterState } from "@/app/lib/register-user";
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
interface RegisterFormProps {
  onFlip: () => void;
}

interface RegisterFormProps {
  // 表单提交处理函数，接收 FormData 参数
  formAction: (formData: FormData) => void;
  
  // 注册状态对象（包含 success/errors/message 等属性），允许为 null
  state: RegisterState | null;
  
  // 是否正在处理注册请求的加载状态
  isPending: boolean;
  
  // 切换登录/注册表单的回调函数
  onFlip: () => void;
}

export default function RegisterForm({formAction, state, isPending,  onFlip }: RegisterFormProps) {
  return (
    <div className="card-face back bg-sky-100/20 backdrop-blur-sm shadow-md rounded-md p-6">
      <form className="space-y-6" action={formAction}>
        <div>
          <label htmlFor="register-username" className="block text-sm/6 font-medium text-white-900">用户名</label>
          <input 
            type="text" 
            name="register-username" 
            id="register-username"
            className="input-transparent"
          />
           {state && state.errors?.username &&
            state.errors.username.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div>
          <label htmlFor="register-email" className="block text-sm/6 font-medium text-white-900">邮箱</label>
          <input 
            type="email" 
            name="register-email" 
            id="register-email"
            className="input-transparent"
          />
          {state && state.errors?.username &&
            state.errors.username.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div>
          <label htmlFor="register-password" className="block text-sm/6 font-medium text-white-900">密码</label>
          <input 
            type="password" 
            name="register-password" 
            id="register-password"
            className="input-transparent"
          />
          {state && state.errors?.password &&
            state.errors.password.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {state?.success === false && state?.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-300" />
            <p className="text-sm text-red-300">{state.message}</p>
          </>
        )}
      </div>
        <button 
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white"
        >
          {isPending ? '正在注册...' : '注册'}
        </button>
      </form>
      <p className="mt-10 text-center text-sm/6 text-blue-50">
        已有账号？
        <button 
          onClick={onFlip}
          className="font-semibold text-blue-400 hover:text-blue-800 ml-1"
        >
          返回登录
        </button>
      </p>
    </div>
  );
}
