import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPublicPath = nextUrl.pathname === '/login' || 
                       nextUrl.pathname.startsWith('/restapi/auth');

  if (isPublicPath) {
    if (isLoggedIn && nextUrl.pathname === '/login') {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    return;
  }

  if (!isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
