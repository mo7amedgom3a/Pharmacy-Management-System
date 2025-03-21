"use client"
import "../layout.css";
import PharmacyBilling from "@/components/billings/PharmacyBilling";
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/loading";

export default function BillingPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (authToken === null) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <PharmacyBilling />
    </div>
  );
}

