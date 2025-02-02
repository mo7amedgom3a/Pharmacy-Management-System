"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function InventoryPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <h1 className="text-2xl font-bold mb-4">{t("dashboard.inventory")}</h1>
      <p>{t("inventory.comingSoon")}</p>
    </div>
  )
}

