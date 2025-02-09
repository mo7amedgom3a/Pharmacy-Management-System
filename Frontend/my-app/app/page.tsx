"use client"
import { useState, useEffect } from "react";
import LoginPage from "@/components/login";
import DashboardOverview from "./dashboard/page";
export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  if (token === null) {
    return <LoginPage  />;
    
  } else {
    return window.location.replace("/dashboard");
  }
}
