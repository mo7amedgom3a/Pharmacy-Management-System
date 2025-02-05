"use client"
import { SearchBar } from "@/components/search-bar"
import { LowStockAlert } from "@/components/low-stock-alert"
import { useState, useEffect } from "react"
import { isAdmin } from "@/hooks/useAuth";
import LoginPage from "@/components/login";
import Link from "next/link";
export default function DashboardOverview() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);
  if (authToken === null) {
    return <h1>Unauthorized</h1>;
  }
  return (
    <>
      <SearchBar />
      <LowStockAlert />
    </>
  );
}

