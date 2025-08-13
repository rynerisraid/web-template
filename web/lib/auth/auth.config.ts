import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
     // 验证失败就会跳到该页面
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    /**
     * 每次页面路由进行切换时被调用
     */
  },
} satisfies NextAuthConfig;
