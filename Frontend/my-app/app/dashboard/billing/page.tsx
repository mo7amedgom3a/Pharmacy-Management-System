"use client"
// import { BillingDetails } from "@/components/billings/billing-details"
import PharmacyBilling from "@/components/billings/PharmacyBilling"
import { useState, useEffect } from "react";
export default function BillingPage() {
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
      <PharmacyBilling />
    </>
  );
}

