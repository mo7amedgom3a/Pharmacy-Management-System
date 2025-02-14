"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/contexts/LanguageContext"
import ToggleableSidebar from "./DashboardLayout"
import { PharmacyProvider } from "@/contexts/PharmacyContext"

export default function WrappedDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PharmacyProvider>
      <LanguageProvider>
      <ToggleableSidebar>{children}</ToggleableSidebar>
      </LanguageProvider>
    </PharmacyProvider>

  )
}