import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Status: The shape of the user object returned in the OAuth providers and `authorize` callback.
   */
  interface User {
    userName?: string | null;
    displayName?: string | null;
    role?: string | null;
    bio?: string | null;
    lastLoggedIn?: string | null;
    ssoAuthProvider?: string | null;
    ssoAuthId?: string | null;    
    sessionToken?: string | null;
    accessToken?: string | null;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    sessionToken?: string;
    user: {
      id: string;
      userName?: string | null;
      displayName?: string | null;   
      role?: string | null;
      bio?: string | null;
      lastLoggedIn?: string | null;
      ssoAuthId?: string | null;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    accessToken?: string;
    sessionToken?: string;
    userName?: string | null;
    displayName?: string | null;
    role?: string | null;
    ssoAuthId?: string | null;  
  }
}
