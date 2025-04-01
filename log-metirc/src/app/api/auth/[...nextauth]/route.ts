/*
 * @Description: 
 * @Date: 2025-03-28 17:23:19
 * @LastEditTime: 2025-03-31 15:00:59
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import { compare } from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码');
        }
        const result = await pool.query(
          `SELECT * FROM users WHERE email = ${credentials.email}`,
          [credentials.email]
        );
        console.log('routes.result', result);
        const user = result.rows[0];

        if (!user) {
          throw new Error('用户不存在');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('密码错误');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST }; 