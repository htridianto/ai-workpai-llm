"use server"

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
});

const RegisterSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { identifier, password } = validatedFields.data;

//   try {
//     await signIn("credentials", {
//       identifier,
//       password,
//       redirectTo: "/dashboard", // Customize as needed
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials!" };
//         default:
//           return { error: "Something went wrong!" };
//       }
//     }

//     throw error;
//   }
// };

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, userName, name } = validatedFields.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { userName }
      ]
    }
  });

  if (existingUser) {
    return { error: "Email or Username already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      userName,
      credential: hashedPassword,
    },
  });

  return { success: "User created!" };
};
