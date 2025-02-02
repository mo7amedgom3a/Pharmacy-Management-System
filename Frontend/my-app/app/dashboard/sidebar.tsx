"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import "./styles/sidebar.css"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, Pill, ShoppingCart, ClipboardList } from 'lucide-react'

const navItems = [
  { href: "/dashboard", label: "dashboard.overview", icon: <Home size={20} /> },
  { href: "/dashboard/drug-list", label: "dashboard.drugList", icon: <Pill size={20} /> },
  { href: "/dashboard/billing", label: "dashboard.billing", icon: <ShoppingCart size={20} /> },
  { href: "/dashboard/inventory", label: "dashboard.inventory", icon: <ClipboardList size={20} /> },
]
interface SidebarComponentProps {
  isOpen: boolean
  toggleSidebar: () => void
}
export function SidebarComponent({ isOpen, toggleSidebar }: SidebarComponentProps) {
  const pathname = usePathname()
  
  const { t } = useLanguage()



  return (
    <>

      {isOpen && (
        <Sidebar
          className={cn(
        "border-r sidebar border-gray-500 min-h-screen transition-all duration-500 ease-in-out",
        isOpen ? "w-64" : "w-16"
          )}
        >
          <SidebarHeader className="p-4 border-b border-gray-400">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-2", !isOpen && "hidden")}>
            <Pill className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">PharmaCare</span>
          </div>
        </div>
          </SidebarHeader>

          <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild>
            <Link
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              {item.icon}
              <span className={cn("transition-all", !isOpen && "hidden")}>
            {t(item.label)}
              </span>
            </Link>
          </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            A
          </div>
          <div className={cn("flex flex-col", !isOpen && "hidden")}>
            <span className="font-medium">Admin User</span>
            <span className="text-sm text-gray-500">admin@pharmacy.com</span>
          </div>
        </div>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  )
}