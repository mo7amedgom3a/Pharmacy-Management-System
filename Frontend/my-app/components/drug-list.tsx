"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import DrugManagement from "./drugs/drug-management"
// Mock data for drugs
// const initialDrugs = [
//   { id: 1, name: { en: "Aspirin", ar: "أسبرين" }, quantity: 100, price: 5.99, expirationDate: "2024-12-31" },
//   { id: 2, name: { en: "Ibuprofen", ar: "ايبوبروفين" }, quantity: 50, price: 7.99, expirationDate: "2024-10-15" },
//   { id: 3, name: { en: "Amoxicillin", ar: "أموكسيسيلين" }, quantity: 30, price: 15.99, expirationDate: "2023-11-30" },
// ]

export function DrugList() {
 

  return (
    <div className="space-y-4">
      <DrugManagement />
    </div>
  )
}

