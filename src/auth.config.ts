import type { NextAuthConfig } from "next-auth";

// Edge-safe config (no Prisma / bcrypt). Used by middleware.
export const authConfig = {
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      const isAdminArea = path.startsWith("/admin") && path !== "/admin/login";
      if (isAdminArea) return isLoggedIn; // redirect to signIn page if false
      return true;
    }
  },
  providers: []
} satisfies NextAuthConfig;
