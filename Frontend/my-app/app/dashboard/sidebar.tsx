"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import "./styles/sidebar.css"
import { isAdmin } from "@/hooks/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Home, Pill, ShoppingCart, ClipboardList, Users, ListTodoIcon, BriefcaseMedical   } from 'lucide-react'

const adminNavItems = [
    { href: "/dashboard/pharmacy", label: "Pharmacies", icon: <BriefcaseMedical size={20} /> },
    { href: "/dashboard/supplier", label: "suppliers", icon: <ListTodoIcon size={20} /> },
    { href: "/dashboard/employees", label: "employees.title", icon: <Users size={20} /> },
]

const navItems = [
  { href: "/dashboard", label: "dashboard.overview", icon: <Home size={20} /> },
  { href: "/dashboard/drug-list", label: "dashboard.drugList", icon: <Pill size={20} /> },
  { href: "/dashboard/billing", label: "dashboard.billing", icon: < ClipboardList size={20} /> },
  { href: "/dashboard/inventory", label: "dashboard.inventory", icon: <ShoppingCart size={20} /> },
  { href: "/dashboard/transactions", label: "transactions.title", icon: <ListTodoIcon size={20} /> },
]

interface SidebarComponentProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export function SidebarComponent({ isOpen, toggleSidebar }: SidebarComponentProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setAuthToken(token)
    if (token) {
      setIsAdminUser(isAdmin(token))
    }
  }, [])

  const itemsToRender = isAdminUser ? [...adminNavItems, ...navItems] : navItems
  if (authToken === null) {
    return null
  }

  const isActive = (href: string) => pathname === href

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
                <BriefcaseMedical className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">PharmaCare</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {itemsToRender.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md",
                        isActive(item.href) && "bg-gray-200"
                      )}
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