"use client"
import type React from "react"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"

const publicRoutes = ["/", "/login", "/register"]

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const isPublicRoute = publicRoutes.includes(pathname)

  if (isPublicRoute) {
    return <div className="w-full">{children}</div>
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-background min-h-screen">
        {children}
      </main>
    </div>
  )
}