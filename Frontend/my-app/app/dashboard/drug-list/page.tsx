"use client"
import { DrugList } from "@/components/drug-list"
import { useState, useEffect } from "react";
import LoadingComponent from "@/components/loading";
export default function DrugListPage() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);
  if (authToken === null) {
    <LoadingComponent />;
  }
  return (
    <>
      <DrugList />
    </>
  );
}

