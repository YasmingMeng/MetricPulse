/*
 * @Description: 
 * @Date: 2025-03-28 17:23:19
 * @LastEditTime: 2025-04-07 10:56:39
 */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Pool } from 'pg';
import { compare } from "bcrypt";

// 初始化数据库连接池
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('请输入用户名和密码');
        }
        try {
          const result = await pool.query(
            'SELECT * FROM user_info WHERE username = $1',
            [credentials.username]
          );
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
            name: user.name,
            email: user.email
          };
        } catch (error) {
          console.error('认证错误1:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST }; 