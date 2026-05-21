"use client"

import { LoginForm } from "@/components/login-form"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
// import { GalleryVerticalEndIcon } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      redirect("/dashboard")
    }
  }, [session])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-16 items-center justify-center rounded-md bg-primary p-4 text-primary-foreground">
            <Image
              src="/logo_komdigi.png"
              width={500}
              height={500}
              alt="Logo-Komdigi"
            />
          </div>
          KOMDIGI PROVINSI SUMATERA UTARA
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
