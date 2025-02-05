"use client"

import { useState } from "react"

import PharmacyEmployeeManagement from "./employee/pharmacy-employee-management"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Employees() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t("Employees")}</h1>
      <PharmacyEmployeeManagement />
    </div>
  )
}

