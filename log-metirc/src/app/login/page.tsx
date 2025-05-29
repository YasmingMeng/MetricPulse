/*
 * @Description: 
 * @Date: 2025-03-04 22:53:30
 * @LastEditTime: 2025-05-22 11:09:43
 */
"use client";
import React, { useState,useEffect  } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { authenticate, LoginState } from '@/app/lib/user';
import { registerUser, RegisterState } from '@/app/lib/register-user';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Login: React.FC = () => {
  const loginInitialState: LoginState = { success: null, errors: {}, message: null };
  const registerInitialState: RegisterState = { success: null, errors: {}, message: null };
  const router = useRouter();
  
  const [loginState, loginAction, loginPending] = useActionState(authenticate, loginInitialState);
  const [registerState, registerAction, registerPending] = useActionState(registerUser, registerInitialState);
  const [isFlipped, setIsFlipped] = useState(false);

  if (loginState.success || registerState.success) {
    // 登录成功，跳转到首页
    window.location.href = '/dashboard';
  }
  useEffect(() => {
    if (loginState.success && registerState.redirectUrl) {
      router.push('/dashboard');
    }
  }, [loginState, registerState, router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-100 text-white bg-linear-to-r/hsl from-blue-950 to-teal-400">
      <h2 className="mt-10 text-center h-15 text-2xl/9 font-bold tracking-tight text-blue-50">
        {isFlipped ? '注册新账号' : '登录你的账号'}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-205 h-115">
        <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
          <LoginForm 
            formAction={loginAction}
            state={loginState}
            isPending={loginPending}
            onFlip={() => setIsFlipped(true)}
          />
          <RegisterForm 
            formAction={registerAction}
            state={registerState}
            isPending={registerPending}
            onFlip={() => setIsFlipped(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;