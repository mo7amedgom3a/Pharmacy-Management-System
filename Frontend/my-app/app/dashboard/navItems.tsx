
import {
    Home,
    Pill,
    ShoppingCart,
    ClipboardList,
    Users,
    ListTodoIcon,
    BriefcaseMedical,
  } from "lucide-react";
export const adminNavItems = [
    {
      href: "/dashboard/pharmacy",
      label: "Pharmacies",
      icon: <BriefcaseMedical size={20} />,
    },
    {
      href: "/dashboard/supplier",
      label: "suppliers",
      icon: <ListTodoIcon size={20} />,
    },
    {
      href: "/dashboard/employees",
      label: "employees.title",
      icon: <Users size={20} />,
    },
  ];
  
export  const navItems = [
    { href: "/dashboard", label: "dashboard.overview", icon: <Home size={20} /> },
    {
      href: "/dashboard/drug-list",
      label: "dashboard.drugList",
      icon: <Pill size={20} />,
    },
    {
      href: "/dashboard/billing",
      label: "dashboard.billing",
      icon: <ClipboardList size={20} />,
    },
    {
      href: "/dashboard/inventory",
      label: "dashboard.inventory",
      icon: <ShoppingCart size={20} />,
    },
    {
      href: "/dashboard/transactions",
      label: "transactions.title",
      icon: <ListTodoIcon size={20} />,
    },
  ];