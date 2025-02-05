"use client"
import { useState, useEffect } from "react";
import Suppliers from "@/components/supplier";
import { isAdmin } from "@/hooks/useAuth";

export default function SupplierPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (!authToken || !isAdmin(authToken)) {
    return <h1>Unauthorized</h1>;
  }

  return <Suppliers />;
}