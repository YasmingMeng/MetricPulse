/*
 * @Description: 
 * @Date: 2025-03-11 16:21:09
 * @LastEditTime: 2025-03-31 19:01:34
 */

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/define/userDefine';
import bcrypt from 'bcrypt';
// import { redirect } from 'next/navigation';
import { Pool } from 'pg';
import type { DefaultSession } from 'next-auth';

// 扩展Session类型
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

// 初始化数据库连接池
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials): Promise<{ id: string } | null> {
        try {
          // 类型安全验证
          const schema = z.object({
            username: z.string().min(3),
            password: z.string().min(6)
          });
          console.log('auth', credentials)
          const parsed = schema.safeParse(credentials);
          if (!parsed.success) return null;

          // 参数化查询
          const result = await pool.query<User>(
            'SELECT id, password FROM users WHERE id = ${username}',
            [parsed.data.username]
          );
          
          const user = result.rows[0];
          if (!user) return null;

          const isValid = await bcrypt.compare(parsed.data.password, user.password);
          return isValid ? { id: user.id } : null;

        } catch (error) {
          console.error('认证错误:', error instanceof Error ? error.message : error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

// ... 保持导出部分不变 ...
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };