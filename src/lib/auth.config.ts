import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [], 
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath = nextUrl.pathname === '/login' || 
                           nextUrl.pathname.startsWith('/_next') || 
                           nextUrl.pathname.startsWith('/static') || 
                           nextUrl.pathname.startsWith('/restapi/auth');
      
      if (!isPublicPath && !isLoggedIn) {
        return false;
      }
      
      if (nextUrl.pathname === '/login' && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
