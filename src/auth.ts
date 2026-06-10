import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email    = String(creds?.email    || "").toLowerCase().trim();
        const password = String(creds?.password || "");
        if (!email || !password) return null;

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string; id?: string }).role = token.role as string | undefined;
        if (token.sub) session.user.id = token.sub;
      }
      return session;
    }
  }
});
