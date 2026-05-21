import type { OpdFromDB } from "@/lib/models/opd.model";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string;
    opdId?: number | null;
    opdRef?: OpdFromDB;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      opdId?: number | null;
      opdRef?: OpdFromDB;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    opdId?: number | null;
    opdRef?: OpdFromDB;
  }
}
