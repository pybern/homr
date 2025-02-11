import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: "/ai/login",
    newUser: "/",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnChat = nextUrl.pathname.startsWith("/ai");
      let isOnRegister = nextUrl.pathname.startsWith("/ai/register");
      let isOnLogin = nextUrl.pathname.startsWith("/ai/login");

      // If on login/register pages
      if (isOnLogin || isOnRegister) {
        // Redirect logged in users away from auth pages
        if (isLoggedIn) {
          return Response.redirect(new URL("/ai", nextUrl));
        }
        return true; // Allow access to auth pages for non-logged in users
      }

      // For chat pages, require authentication
      if (isOnChat) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/ai/login", nextUrl));
      }

      // For all other pages
      return true; // Allow access by default
    },
  },
} satisfies NextAuthConfig;