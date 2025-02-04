"use client"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import PharmacyTransaction from "./transaction/pharmacy-transaction"
// Mock data for transactions
// const initialTransactions = [
//   { id: 1, customer: "John Doe", date: "2022-01-01", amount: 100, status: "Paid" },
//   { id: 2, customer: "Jane Doe", date: "2022-01-02", amount: 200, status: "Paid" },
//   { id: 3, customer: "Alice", date: "2022-01-03", amount: 150, status: "Pending" },
// ]

export function Transactions() {
    
    const { language, t } = useLanguage()
  
    
    return (
        <div className="space-y-4">
        <h1 className="text-2xl font-bold">{t("transactions.title")}</h1>
        <PharmacyTransaction />
        </div>
    )
    }