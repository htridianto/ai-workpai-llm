import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/lib/db";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { createUser } from "../models";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "rahasia-super-aman-minimal-32-karakter"
);

const sanitizeEmailToUsername = (email: string) => {
  return email
    .toLowerCase()                   // Rule: Lowercase only
    .trim()                          // Rule: No leading/trailing spaces
    .replace(/\s+/g, '_')            // Rule: Replace internal spaces with underscores
    .replace(/[^a-z0-9._-]/g, '_');  // Rule: Replace @ and other symbols with underscores
}

const generateDummyEmail = (name: string, domain = "workpai.dummy") => {
  const cleanName = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^a-z0-9._-]/g, '');  // Remove illegal characters

  return `${cleanName}@${domain}`;
}

const signAccessToken = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Token hangus dalam 2 jam
    .sign(secret);
}

const authAnythingLLM = async(identifier: string, password: string): Promise<any> => {
  try {
    // Real authentication against RAG_API_URL
    const ragApiUrl = process.env.RAG_API_URL;    
    if (!ragApiUrl) {
      return {
          message: 'Server configuration error.', status: 500
      };
    }
    const payload = { username: identifier, password };
    const authResponse = await fetch(`${ragApiUrl}/api/request-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    const authData = await authResponse.json();
    // console.log("Auth Data:", authData);
    if (!authResponse.ok || !authData.valid || !authData.user)  {
      return {
        message: authData.message || 'Invalid credentials.', status: 401
      };
    }
    return {      
      status: 200,
      success: true,
      token: authData.token,
      user: {
        id: authData.user?.id || 'u-external', // Use ID from response or fallback
        name: authData.user?.display_name || authData.user?.username, // Use name from response or fallback
        email: authData.user?.email || identifier,
        role: authData.user?.role || 'admin', // Default role
        bio: authData.user?.bio || '',
      }      
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: 'Login error', status: 500
    };    
  }
}

const createOrAuthAnythingLLM = async(identifier: string, password: string, bio?: string): Promise<any> => {
  try {
    // Real authentication against RAG_API_URL
    const ragApiUrl = process.env.RAG_API_URL;    
    if (!ragApiUrl) {
      return {
          message: 'Server configuration error.', status: 500
      };
    }
    const payload = { username: identifier, password, role: 'admin', bio: bio || `joined via google-auth` };
    const createResponse = await fetch(`${ragApiUrl}/api/v1/admin/users/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RAG_API_KEY}`
        },
        body: JSON.stringify(payload)
    });
    const createData = await createResponse.json();
    // console.error("createData:", createData );
      
    const authExternal = await authAnythingLLM(identifier, password);
    if (authExternal.success) {
      return {      
        status: 200, success: true,
        ...authExternal
      };
    }
    return {      
      status: 401, success: false,
      message: 'Create account anythingllm error', 
    };
  } catch (error) {
    console.error("Create account anythingllm error:", error);
    return {
      message: 'Create account anythingllm error', status: 500
    };    
  }
}

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
          userName: sanitizeEmailToUsername(profile.email.split("@")[0]),
          // userName: sanitizeEmailToUsername(profile.name),
          email: profile.email,
          name: profile.name,
          image: profile.picture,          
          ssoAuthProvider: "google",
          ssoAuthId: profile.sub,
          // emailVerified: 1,          
          // role: 'admin',
          lastLoggedin: new Date().toISOString()  
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

        const authExternal = await authAnythingLLM(credentials.identifier as string, credentials.password as string);
        if (!authExternal.success) {
          throw new (class extends CredentialsSignin { code = "user_not_found" })();
        }        

        const user = await (prisma as any).user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier as string },
              { userName: credentials.identifier as string }
            ],
            // deletedAt: null 
          }
        });

        // GENERATE TOKEN DI SINI
        const accessToken = await signAccessToken({
          id: authExternal.user?.id,
          username: authExternal.user?.name,
          role: user?.role || 'admin'
        });

        if (!user) {
          // do create user
          const hash = await bcrypt.hash(credentials.password as string, 10);
          const newUser = await createUser({
            userName: credentials.identifier as string,
            email: generateDummyEmail(credentials.identifier as string),
            name: credentials.identifier as string,
            credential: hash,
            emailVerified: 0,
            ssoAuthProvider: "anythingllm",
            ssoAuthId: `${authExternal.user?.id}`,
            role: 'admin',
            bio: authExternal.user?.bio || null,
            lastLoggedin: new Date(),
            sessionToken: authExternal.token
          });
          /*
          const newUser = await (prisma as any).user.create({
            data: {
              // id: nanoid(10)+'--'+authExternal.user?.id as string,
              userName: credentials.identifier as string,
              email: generateDummyEmail(credentials.identifier as string),
              name: credentials.identifier as string,
              credential: hash,
              emailVerified: 0,
              ssoAuthProvider: "anythingllm",
              ssoAuthId: `${authExternal.user?.id}`,
              role: 'owner',
              bio: authExternal.user?.bio || null,
              lastLoggedin: new Date(),
              sessionToken: authExternal.token
            }
          });
          // console.log("New User:", newUser);
          */
          return {...newUser, accessToken: accessToken}; //sessionToken: authExternal.token
        }else {
          // do update user
          const updatedUser = await (prisma as any).user.update({
            where: { id: user.id },
            data: {
              lastLoggedin: new Date(),
              sessionToken: authExternal.token,
              // role: authExternal.user?.role || 'default',
              // bio: authExternal.user?.bio || null,
              deletedAt: null 
            }
          });
          return {...updatedUser, accessToken: accessToken};
        }        
      }
    })    
  ],
  events: {
    async signIn({ user, account, isNewUser }) {      
      console.log("events::signIn::user:", user, isNewUser);
      if(isNewUser) {
          const data = {
            bio: user.bio || `i'm focuses on analyzing citizen feedback, generate sentiment reports and identify service.\n${(account?.provider === 'google') ? 'joined via google-auth' : 'joined via credentials'}`,                        
          } as any;
          if(account?.provider === 'google'){
            data.credential = await bcrypt.hash('raganythingllm' as string, 10);
            data.emailVerified = 1;
            data.role = 'admin';
          }
          await (prisma as any).user.update({
            where: { id: user.id },
            data
          });
          
          //@todo: create default organization for new user, with organization id is new user id, check if organization with id is new user id already exists first
          const existingOrganization = await (prisma as any).organization.findUnique({
            where: {
              id: user.id
            }
          })
          if (!existingOrganization) {
            await (prisma as any).organization.create({
              data: {
                id: user.id,
                name: user.name + ' Team',
                description: 'Default organization for ' + user.name + ' team',
              }
            })
          }
      }
    }
  },  
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      console.log("callbacks::signIn.....", user, 'account', account);       
      if(user && account?.provider === 'google') {
        try {
          const identifier = user.userName as string;
          const authExternal = await createOrAuthAnythingLLM(identifier, 'raganythingllm');
          // console.debug("callbacks::signIn::authExternal:", authExternal);   
          if (authExternal.success) {
            // (account as any ).access_token = authExternal.token;
            user.sessionToken = authExternal.token;
            user.ssoAuthId = `${authExternal.user?.id}`;       
          }            
          // console.debug("callbacks::signIn::user:", user);
          // console.debug("callbacks::signIn::account:", account);                 
          return authExternal.success; 
        }catch(error){
          console.error("callbacks::signIn::error:", error);      
        }                     
      }
      return (user && true);
    },
  }  
});
