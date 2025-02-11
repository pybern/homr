import NextAuth from "next-auth";
import { authConfig } from "@/app/ai/(auth)/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/ai", "/ai/:id", "/ai/api/:path*", "/ai/login", "/ai/register"],
};