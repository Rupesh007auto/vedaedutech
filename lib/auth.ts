import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login/student",
    error: "/login/student",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
          role: credentials.role,
        }).select("+password");

        if (!user) {
          throw new Error(
            "No account found with this email for the selected role"
          );
        }

        if (!user.isActive) {
          throw new Error(
            "This account has been deactivated. Contact the administrator."
          );
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as {
          role: "admin" | "teacher" | "student";
        }).role;

        token.id = (user as { id: string }).id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as
          | "admin"
          | "teacher"
          | "student";

        session.user.id = token.id as string;
      }

      return session;
    },
  },
};