/*
 * @Description: 
 * @Date: 2025-03-04 22:53:30
 * @LastEditTime: 2025-04-07 13:47:52
 */
"use client";
import React, { useState } from 'react';
import { useActionState } from 'react';
import { authenticate, LoginState } from '@/app/lib/user';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const Login: React.FC = () => {
  const initialState: LoginState = { success: null, errors: {}, message: null };
  const [state, formAction, isPending] = useActionState(authenticate, initialState);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-100 text-white bg-linear-to-r/hsl from-blue-950 to-teal-400">
      <h2 className="mt-10 text-center h-15 text-2xl/9 font-bold tracking-tight text-blue-50">
        {isFlipped ? '注册新账号' : '登录你的账号'}
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-205 h-115">
        <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
          <LoginForm 
            formAction={formAction}
            state={state}
            isPending={isPending}
            onFlip={() => setIsFlipped(true)}
          />
          <RegisterForm onFlip={() => setIsFlipped(false)} />
        </div>
      </div>
    </div>
  );
};

export default Login;