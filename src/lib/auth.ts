import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  basePath: "/restapi/auth",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          userName: profile.name,
          email: profile.email,
          image: profile.picture,
          displayName: profile.email.split("@")[0],
          ssoAuthProvider: "google",
          ssoAuthId: profile.sub,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const user = await (prisma as any).user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier as string },
              { userName: credentials.identifier as string }
            ],
            deletedAt: null 
          }
        });
        
        if (!user || !user.credential) {
          throw new (class extends CredentialsSignin { code = "user_not_found" })();
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.credential
        );

        if (!isPasswordValid) {
          throw new (class extends CredentialsSignin { code = "invalid_password" })();
        }

        return {...user};
      }
    })    
  ],
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user);
      const data = { 
        lastLoggedin: new Date(),
      }
 
      await (prisma as any).user.update({
        where: { id: user.id },
        data
      });
    }
  },  
  callbacks: {    
    ...authConfig.callbacks,
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.displayName = user.displayName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.userName = token.userName as string;
        session.user.displayName = token.displayName as string;
      }
      return session;
    }
  }  
});
