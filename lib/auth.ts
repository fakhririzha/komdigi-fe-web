import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { authConfig } from "./auth.config"

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "-",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "-",
    authorization: {
      params: {
        prompt: "select_account", // this is needed for user to choose Google account
      },
    },
    // profile(profile) {
    //   return profile
    // },
    // authorization: {
    //   params: {
    //     prompt: "consent",
    //     access_type: "offline",
    //     response_type: "code",
    //   },
    // },
  }),
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    async authorize(c) {
      if (c.password !== "password") {
        return null
      }

      return {
        id: "1",
        name: "Fill Murray",
        email: "fill@murray.com",
        image: "https://source.boringavatars.com/marble/120",
      }
    },
  }),
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "-",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "-",
      authorization: {
        params: {
          prompt: "select_account", // this is needed for user to choose Google account
        },
      },
    }),
  ],
})
