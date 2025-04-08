/*
 * @Description: 
 * @Date: 2025-04-07 13:47:25
 * @LastEditTime: 2025-04-07 16:20:35
 */
"use client";
// import { inputStyles } from "../styles/inputStyles";
interface RegisterFormProps {
  onFlip: () => void;
}

export default function RegisterForm({ onFlip }: RegisterFormProps) {
  return (
    <div className="card-face back bg-sky-100/20 backdrop-blur-sm shadow-md rounded-md p-6">
      <form className="space-y-6">
        <div>
          <label htmlFor="register-username" className="block text-sm/6 font-medium text-white-900">用户名</label>
          <input 
            type="email" 
            name="register-username" 
            id="register-username"
            className="input-transparent"
          />
        </div>
        <div>
          <label htmlFor="register-email" className="block text-sm/6 font-medium text-white-900">邮箱</label>
          <input 
            type="email" 
            name="register-email" 
            id="register-email"
            className="input-transparent"
          />
        </div>
        <div>
          <label htmlFor="register-password" className="block text-sm/6 font-medium text-white-900">密码</label>
          <input 
            type="password" 
            name="register-password" 
            id="register-password"
            className="input-transparent"
          />
        </div>
        <button 
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white"
        >
          注册
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
