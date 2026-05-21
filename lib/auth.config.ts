import type { NextAuthConfig } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { appBasePath, withBasePath } from "@/lib/utils/base-path"

// types
import type { Account, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

// const PUBLIC_PATHS = ["/public/*"]

/**
 * Edge-safe NextAuth configuration.
 * This file must NOT import any Node.js-only modules (e.g., mysql2, drizzle db)
 * because it is used by middleware which runs in the Edge runtime.
 *
 * The Credentials provider is declared here with a no-op authorize stub.
 * The real authorize logic (with DB access) is provided in auth.ts via
 * the callbacks.signIn or by overriding the provider in the full config.
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "-",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "-",
      authorization: {
        params: {
          prompt: "select_account", // this is needed for user to choose Google account
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) return false

      return true
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
      }
      return token
    },
    async session({ session }): Promise<Session> {
      return session
    },
    // only need below code if UI needs to know provider name (e.g., "google")
    // async jwt({ token, account }: { token: JWT; account: Account | null }) {
    //   if (account) token.provider = account.provider
    //   return token
    // },
    // session: ({ session, token }: { session: Session; token: JWT }) => {
    //   if (token.provider) session.provider = token.provider
    //   return session
    // },
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id
  //       token.role = user.role
  //       token.opdId = user.opdId ?? undefined
  //       token.opdRef = user.opdRef
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.id = token.id as string
  //       session.user.role = token.role as string
  //       session.user.opdId = token.opdId
  //       session.user.opdRef = token.opdRef
  //     }
  //     return session
  //   },
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user
  //     const pathname = nextUrl.pathname
  //     const authPath = withBasePath("/auth")
  //     const dashboardPath = withBasePath("/dashboard")

  //     const isPublicPaths = (pathname: string) => {
  //       return PUBLIC_PATHS.some((publicPath) => {
  //         const bp = withBasePath(publicPath)
  //         return (
  //           pathname === publicPath ||
  //           pathname.startsWith(`${publicPath}/`) ||
  //           pathname === bp ||
  //           pathname.startsWith(`${bp}/`)
  //         )
  //       })
  //     }

  //     // Do not enforce auth for framework/static files (including basePath-prefixed URLs).
  //     const isStaticOrPublicAsset =
  //       pathname.includes("/_next/static/") ||
  //       pathname.includes("/_next/image") ||
  //       pathname === "/favicon.ico" ||
  //       pathname.endsWith("/favicon.ico") ||
  //       /\.[^/]+$/.test(pathname)

  //     if (isStaticOrPublicAsset) return true

  //     if (isPublicPaths(pathname)) return true

  //     const isOnAuth =
  //       pathname === "/auth" ||
  //       pathname.startsWith("/auth/") ||
  //       pathname === authPath ||
  //       pathname.startsWith(`${authPath}/`)

  //     const isAuthApi =
  //       pathname === "/api/auth" ||
  //       pathname.startsWith("/api/auth/") ||
  //       pathname === withBasePath("/api/auth") ||
  //       pathname.startsWith(`${withBasePath("/api/auth")}/`)

  //     if (isAuthApi) return true

  //     const isRootPath =
  //       pathname === "/" ||
  //       pathname === appBasePath ||
  //       pathname === `${appBasePath}/`

  //     // Let `src/app/page.tsx` handle root redirect (session + `redirect()`). Middleware cannot be
  //     // excluded for basePath home (`/sapakota`) with a static matcher alone, so allow through here.
  //     if (isRootPath) return true

  //     if (isOnAuth) {
  //       // Redirect logged-in users away from auth pages
  //       if (isLoggedIn) {
  //         return NextResponse.redirect(new URL(dashboardPath, nextUrl))
  //       }

  //       return true // Allow unauthenticated access to auth pages
  //     }

  //     // Protect all other routes
  //     return isLoggedIn
  //   },
  // },
  pages: {
    signIn: withBasePath("/auth/login"),
    signOut: withBasePath("/auth/login"),
  },
  // session: {
  //   strategy: "jwt",
  // },
} satisfies NextAuthConfig
