"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock data for billing
const initialBillings = [
  {
    id: 1,
    customerName: { en: "John Doe", ar: "جون دو" },
    date: "2023-05-15",
    amount: 55.99,
    status: { en: "Paid", ar: "مدفوع" },
  },
  {
    id: 2,
    customerName: { en: "Jane Smith", ar: "جين سميث" },
    date: "2023-05-14",
    amount: 32.5,
    status: { en: "Pending", ar: "قيد الانتظار" },
  },
  {
    id: 3,
    customerName: { en: "Bob Johnson", ar: "بوب جونسون" },
    date: "2023-05-13",
    amount: 78.25,
    status: { en: "Paid", ar: "مدفوع" },
  },
]

export function BillingDetails() {
  const [billings] = useState(initialBillings)
  const { language, t } = useLanguage()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("billingDetails.title")}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("billingDetails.customer")}</TableHead>
            <TableHead>{t("billingDetails.date")}</TableHead>
            <TableHead>{t("billingDetails.amount")}</TableHead>
            <TableHead>{t("billingDetails.status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing) => (
            <TableRow key={billing.id}>
              <TableCell>{billing.customerName[language]}</TableCell>
              <TableCell>{billing.date}</TableCell>
              <TableCell>${billing.amount.toFixed(2)}</TableCell>
              <TableCell>{billing.status[language]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button>{t("billingDetails.generateBill")}</Button>
    </div>
  )
}