"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock data for drugs
const initialDrugs = [
  { id: 1, name: { en: "Aspirin", ar: "أسبرين" }, quantity: 100, price: 5.99, expirationDate: "2024-12-31" },
  { id: 2, name: { en: "Ibuprofen", ar: "ايبوبروفين" }, quantity: 50, price: 7.99, expirationDate: "2024-10-15" },
  { id: 3, name: { en: "Amoxicillin", ar: "أموكسيسيلين" }, quantity: 30, price: 15.99, expirationDate: "2023-11-30" },
]

export function DrugList() {
  const [drugs, setDrugs] = useState(initialDrugs)
  const [filter, setFilter] = useState("")
  const { language, t } = useLanguage()

  const filteredDrugs = drugs.filter((drug) => drug.name[language].toLowerCase().includes(filter.toLowerCase()))

  const updateQuantity = (id: number, newQuantity: number) => {
    setDrugs(drugs.map((drug) => (drug.id === id ? { ...drug, quantity: newQuantity } : drug)))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("drugList.title")}</h1>
      <Input placeholder={t("search.placeholder")} value={filter} onChange={(e) => setFilter(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("drugList.name")}</TableHead>
            <TableHead>{t("drugList.quantity")}</TableHead>
            <TableHead>{t("drugList.price")}</TableHead>
            <TableHead>{t("drugList.expirationDate")}</TableHead>
            <TableHead>{t("drugList.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDrugs.map((drug) => (
            <TableRow key={drug.id}>
              <TableCell>{drug.name[language]}</TableCell>
              <TableCell>{drug.quantity}</TableCell>
              <TableCell>${drug.price.toFixed(2)}</TableCell>
              <TableCell>{drug.expirationDate}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={drug.quantity}
                  onChange={(e) => updateQuantity(drug.id, Number.parseInt(e.target.value))}
                  className="w-20 mr-2"
                />
                <Button onClick={() => updateQuantity(drug.id, drug.quantity)}>{t("drugList.update")}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

