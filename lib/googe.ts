import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
  ],
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.id = user.id;
          }
          return token;
      },
      async session({ session, token }) {
          if (session.user) {
              session.user.id = token.id as string;
          }
          return session;
      },
      async signIn({ user, account}) {
          if (account?.provider === "google") {
              try {
                  // First check if user exists
                  const existingUser = await prisma.user.findUnique({
                      where: { email: user.email! }
                  });

                  // Only create user if they don't exist
                  if (!existingUser) {
                      await prisma.user.create({
                          data: {
                              email: user.email!,
                              name: user.name || '',
                              image: user.image || null,
                          }
                      });
                  }
              } catch (error) {
                  console.error("Error saving user to database:", error);
                  return false;
              }
          }
          return true;
      },
      },
};