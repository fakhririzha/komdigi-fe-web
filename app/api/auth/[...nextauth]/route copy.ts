// @ts-nocheck
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/github"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "-",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "-",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  signIn({ account, profile }) {
    if (account.provider === "google") {
      return profile.email_verified && profile.email.endsWith("@example.com")
    }
    return true // Do different verification for other providers that don't have `email_verified`
  },
}

export default NextAuth(authOptions)
