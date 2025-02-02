"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock data for low stock alerts
const lowStockDrugs = [
  { id: 1, name: { en: "Ibuprofen", ar: "ايبوبروفين" }, quantity: 10 },
  { id: 2, name: { en: "Amoxicillin", ar: "أموكسيسيلين" }, quantity: 5 },
]

export function LowStockAlert() {
  const { language, t } = useLanguage()

  return (
    <div className="space-y-4">
      {lowStockDrugs.map((drug) => (
        <Alert variant="destructive" key={drug.id}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t("lowStock.title")}</AlertTitle>
          <AlertDescription>
            {t("lowStock.message")
              .replace("{drug}", drug.name[language])
              .replace("{quantity}", drug.quantity.toString())}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

