/*
 * @Description: 
 * @Date: 2024-11-20 10:38:03
 * @LastEditTime: 2025-03-31 18:16:41
 */
import type { NextAuthOptions } from 'next-auth';
 

// ... existing imports ...

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login' // 添加错误重定向
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('signIn', user, account);
      // 自定义登录条件判断
      if (account?.provider === 'credentials') {
        return !!user; // 仅允许通过验证的用户登录
      }
      return true;
    },
    async session({ session, token }) {
      // 将用户ID注入session
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // 将用户信息注入JWT
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  // ... existing providers ...
  providers: [
  ]
};