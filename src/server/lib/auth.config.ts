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
    async jwt({ token, user, account }: any) {
      // console.log("callback:jwt:Token:", token);      
      // console.log("callback:jwt:user:", user);      
      // console.log("callback:jwt:account:", account);    
      // 'user' is only available on the first sign-in      
      if (user) {
        token.id = user.id;
        token.role = user.role;   
        token.userName = user.user_name;
        token.name = user.display_name;
        token.bio = user.bio;   
        token.lastLoggedin = user.last_loggedin;   
        token.ssoAuthId = user.sso_auth_id;
        token.ssoAuthProvider = user.sso_auth_provider;
        // token.sessionToken = user.session_token;
        token.accessToken = user.access_token;      
      }    
      return token;
    },
    async session({ session, token, user, account }: any) {      
      // console.log("callback:session:Token:", token);      
      // console.log("callback:session:session:", session);          
      // Transfer data from the token to the session object  
      if (session && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;      
        session.user.userName = token.userName;
        session.user.name = token.name;
        session.user.bio = token.bio;
        session.user.lastLoggedin = token.lastLoggedin;
        session.user.ssoAuthId = token.ssoAuthId;      
        session.user.ssoAuthProvider = token.ssoAuthProvider;  
        // session.sessionToken = token.sessionToken;        
        session.accessToken = token.accessToken;
      }
      return session;
    }    
  },
} satisfies NextAuthConfig;
