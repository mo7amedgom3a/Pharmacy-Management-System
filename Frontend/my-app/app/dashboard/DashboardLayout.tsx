"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarComponent } from "./sidebar"
import "./styles/sidebar.css"
import React from "react"
import { useState } from "react"
import { useContext } from "react"
import { Menu } from "lucide-react"
export function DashboardLayout({ children }: { children: ReactNode }) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <div className={`flex h-screen main-container ${language === "ar" ? "rtl" : "ltr"}`}>
      <SidebarProvider>
        <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col flex-row overflow-hidden">
          <header className="h-16 bg-white border-b border-gray-400 flex items-center justify-between px-4">
            <Button onClick={toggleSidebar}>
              <Menu size={24} />
            </Button>
            <Button onClick={toggleLanguage}>{t("languageToggle")}</Button>
          </header>
          <main
            className={`flex-1 overflow-auto p-4 content ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
            style={{ transition: "all 0.3s ease-in-out" }}
          >
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}