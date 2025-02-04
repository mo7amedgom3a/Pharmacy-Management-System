"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import PharmacyInventory from "./inventory/pharmacy-inventory"
// // Mock data for inventory
// const initialInventory = [
//   { id: 1, name: "Paracetamol", quantity: 100, price: 5, expirationDate: "2022-12-31" },
//   { id: 2, name: "Ibuprofen", quantity: 50, price: 10, expirationDate: "2023-01-31" },
//   { id: 3, name: "Aspirin", quantity: 20, price: 3, expirationDate: "2023-02-28" },
// ]

export function Inventory() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("inventory.title")}</h1>
      <PharmacyInventory />
    </div>
  )
}
