"use client"
import React, { useState, useEffect } from "react";
import Pharmacy from "@/components/pharmacy";
import { isAdmin } from "@/hooks/useAuth";
import LoadingComponent from "@/components/loading";

export default function Home() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (authToken === null) {
    return <LoadingComponent />;
  }

  if (!isAdmin(authToken)) {
    return <LoadingComponent />;
  }

  return <Pharmacy />;
}