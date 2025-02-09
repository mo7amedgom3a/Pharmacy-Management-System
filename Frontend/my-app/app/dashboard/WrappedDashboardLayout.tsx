"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import ToggleableSidebar from "./DashboardLayout"

export default function WrappedDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ToggleableSidebar>{children}</ToggleableSidebar>
    </LanguageProvider>
  )
}