"use client"
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/loading";
import WrappedDashboardLayout from "./WrappedDashboardLayout";
import { LowStockAlert } from "@/components/low-stock-alert";
export default function DashboardOverview() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (authToken === null) {
    return <LoadingComponent />;
  }

  return (
    
      <LowStockAlert />
    
  );
}

