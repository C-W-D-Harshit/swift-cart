import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { User as UserType } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType & DefaultSession["user"];
  }

  interface User extends UserType {
    role: UserType["role"];
  }

  // interface User extends UserType {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Check if email and password are provided
        if (!email || !password)
          throw new Error("Email and password are required");

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new Error("User not found");

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) throw new Error("Invalid password");

        // Return success response
        return {
          ...user,
          role: user.role,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.fullName = user.fullName;
        token.phoneNumber = user.phoneNumber;
        token.avatarUrl = user.avatarUrl;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as UserType["role"];
      session.user.fullName = token.fullName as string;
      session.user.phoneNumber = token.phoneNumber as string;
      session.user.avatarUrl = token.avatarUrl as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
});
