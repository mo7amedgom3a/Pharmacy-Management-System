"use client"
import { Menu, X } from "lucide-react"
import { adminNavItems, navItems } from "./navItems"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BriefcaseMedical } from "lucide-react";
import './layout.css'
import { useLanguage } from "@/contexts/LanguageContext";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { isAdmin } from "@/hooks/useAuth";


export default function ToggleableSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t, setLanguage, language } = useLanguage();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    if (token) {
      setIsAdminUser(isAdmin(token));
    }
  }, []);

  const itemsToRender = isAdminUser
    ? [...adminNavItems, ...navItems]
    : navItems;
  if (authToken === null) {
    return null;
  }

  const isActive = (href: string) => pathname === href;

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen ">
        <Sidebar className="border-r min-h-screen transition-all duration-500 ease-in-out sm:w-64">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BriefcaseMedical className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg font-serif">Mekkawy Pharma</span>
              </div>
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                {language === "ar" ? "English" : "عربي"}
              </Button>
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
                      <span className="transition-all">{t(item.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-medium">
                  Hello 👋
                </span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="main-content flex-1 p-4">
          <SidebarToggle />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

function SidebarToggle() {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      className="mb-4"
      onClick={toggleSidebar}
      aria-label={open ? "Close sidebar" : "Open sidebar"}
    >
      {open ? <Menu className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  )
}
