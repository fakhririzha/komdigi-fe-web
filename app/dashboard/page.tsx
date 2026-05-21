"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useMemo } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createLaporanColumns, Laporan } from "./components/columns"
import { DataTable } from "./components/data-tables"
import data from "../../public/data-source.json"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Page() {
  const { data: session } = useSession()
  const laporanData: Laporan[] = data.data

  const columns = useMemo(() => createLaporanColumns(), [])

  useEffect(() => {
    if (!session) {
      redirect("/auth/login")
    }
  }, [session])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Halo, {session?.user?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Laporan Dinas Sumber Daya Air, Bina Marga, dan Bina
                    Konstruksi
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {/* @ts-ignore */}
            <DataTable columns={columns} data={laporanData} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
