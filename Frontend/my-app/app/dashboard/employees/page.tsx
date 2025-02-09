"use client"
import React, { useState, useEffect } from "react";
import Employees from "@/components/employees";
import { isAdmin } from "@/hooks/useAuth";
import LoadingComponent from "@/components/loading";

export default function EmployeesPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  if (!authToken || !isAdmin(authToken)) {
    return <LoadingComponent />;
  }

  return <Employees />;
}