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
      console.log("callback:jwt:Token:", token);      
      console.log("callback:jwt:user:", user);      
      console.log("callback:jwt:account:", account);    
      // 'user' is only available on the first sign-in      
      if (user) {
        token.id = user.id;
        token.role = user.role;   
        token.userName = user.userName;
        token.name = user.name;
        token.bio = user.bio;   
        token.lastLoggedin = user.lastLoggedin;   
        token.ssoAuthId = user.ssoAuthId;
        token.sessionToken = user.sessionToken;
        token.accessToken = user.accessToken;      
      }
      if (account) {
        token.accessToken = account.access_token;        
      }      
      return token;
    },
    async session({ session, token, user, account }: any) {      
      console.log("callback:session:Token:", token);      
      console.log("callback:session:session:", session);      
      // console.log("callback:session:user:", user);      
      // console.log("callback:session:account:", account);    
      // Transfer data from the token to the session object  
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;      
        session.user.userName = token.userName;
        session.user.name = token.name;
        session.user.bio = token.bio;
        session.user.lastLoggedin = token.lastLoggedin;
        session.user.ssoAuthId = token.ssoAuthId;        
        session.sessionToken = token.sessionToken;        
        session.accessToken = token.accessToken;
      }
      return session;
    }    
  },
} satisfies NextAuthConfig;
