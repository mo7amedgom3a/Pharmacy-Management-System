"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { DashboardLayout } from "./DashboardLayout"

export default function WrappedDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </LanguageProvider>
  )
}