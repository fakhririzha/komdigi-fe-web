import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: [
    // Exclude "/", static assets, and auth API even when app is served under a basePath (e.g. /sapakota).
    // `(?!$)` skips the homepage so `src/app/page.tsx` can handle redirect without running auth middleware.
    "/((?!$)(?!.*(?:_next/static|_next/image|favicon.ico|api/auth|api/public|public)).*)",
  ],
}

export default middleware
