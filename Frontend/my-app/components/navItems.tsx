import { Home, Pill, ShoppingCart, ClipboardList } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "dashboard.overview", icon: <Home size={20} /> },
  { href: "/dashboard/drug-list", label: "dashboard.drugList", icon: <Pill size={20} /> },
  { href: "/dashboard/billing", label: "dashboard.billing", icon: <ShoppingCart size={20} /> },
  { href: "/dashboard/inventory", label: "dashboard.inventory", icon: <ClipboardList size={20} /> },
];

export default navItems;
