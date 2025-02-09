// "use client";

// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { cn } from "@/lib/utils";
// import "./styles/sidebar.css";
// import { isAdmin } from "@/hooks/useAuth";



// interface SidebarComponentProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
// }
// const extractNameFromToken = (token: string) => {
//   const payload = token.split(".")[1];
//   const decodedPayload = atob(payload);
//   const { name } = JSON.parse(decodedPayload);
//   return name;
// };

// export function SidebarComponent({
//   isOpen,
//   toggleSidebar,
// }: SidebarComponentProps) {
//   const pathname = usePathname();
//   const { t } = useLanguage();
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     setAuthToken(token);
//     if (token) {
//       setIsAdminUser(isAdmin(token));
//     }
//   }, []);

//   const itemsToRender = isAdminUser
//     ? [...adminNavItems, ...navItems]
//     : navItems;
//   if (authToken === null) {
//     return null;
//   }

//   const isActive = (href: string) => pathname === href;

//   return (
//     <>
//       {isOpen && (
//         <Sidebar className="border-r min-h-screen transition-all duration-500 ease-in-out sm:w-64">
//           <SidebarHeader className="p-4 border-b">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <BriefcaseMedical className="h-6 w-6 text-primary" />
//                 <span className="font-bold text-lg">PharmaCare</span>
//               </div>
//             </div>
//           </SidebarHeader>

//           <SidebarContent>
//             <SidebarMenu>
//               {itemsToRender.map((item) => (
//                 <SidebarMenuItem key={item.href}>
//                   <SidebarMenuButton asChild>
//                     <Link
//                       href={item.href}
//                       className={cn(
//                         "flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md",
//                         isActive(item.href) && "bg-gray-200"
//                       )}
//                     >
//                       {item.icon}
//                       <span className="transition-all">{t(item.label)}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>

//           <SidebarFooter className="border-t p-4">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
//                 A
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium">
//                   Hello {extractNameFromToken(authToken)} 👋
//                 </span>
//               </div>
//             </div>
//           </SidebarFooter>
//         </Sidebar>
//       )}
//     </>
//   );
// }
