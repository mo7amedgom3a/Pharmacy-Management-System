"use client"
import { Inventory } from "@/components/inventory";
import { useState, useEffect } from "react";
export default function InventoryPage() {
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
      <Inventory />
    </>
  );
}