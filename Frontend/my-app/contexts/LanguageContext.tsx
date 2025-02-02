"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    "dashboard.title": "Pharmacy Dashboard",
    "drugList.title": "Drug List",
    "drugList.name": "Name",
    "drugList.quantity": "Quantity",
    "drugList.price": "Price",
    "drugList.expirationDate": "Expiration Date",
    "drugList.action": "Action",
    "drugList.update": "Update",
    "billingDetails.title": "Billing Details",
    "billingDetails.customer": "Customer",
    "billingDetails.date": "Date",
    "billingDetails.amount": "Amount",
    "billingDetails.status": "Status",
    "billingDetails.generateBill": "Generate New Bill",
    "lowStock.title": "Low Stock Alert",
    "lowStock.message": "{drug} is running low. Current quantity: {quantity}",
    "search.placeholder": "Search drugs, transactions, or customers...",
    "search.button": "Search",
    languageToggle: "عربي",
    "dashboard.overview": "Overview",
    "dashboard.drugList": "Drug List",
    "dashboard.billing": "Billing",
    "dashboard.inventory": "Inventory",
    "inventory.comingSoon": "Coming soon",
  },
  ar: {
    "dashboard.title": "لوحة تحكم الصيدلية",
    "drugList.title": "قائمة الأدوية",
    "drugList.name": "الاسم",
    "drugList.quantity": "الكمية",
    "drugList.price": "السعر",
    "drugList.expirationDate": "تاريخ انتهاء الصلاحية",
    "drugList.action": "الإجراء",
    "drugList.update": "تحديث",
    "billingDetails.title": "تفاصيل الفواتير",
    "billingDetails.customer": "العميل",
    "billingDetails.date": "التاريخ",
    "billingDetails.amount": "المبلغ",
    "billingDetails.status": "الحالة",
    "billingDetails.generateBill": "إنشاء فاتورة جديدة",
    "lowStock.title": "تنبيه المخزون المنخفض",
    "lowStock.message": "{drug} على وشك النفاد. الكمية الحالية: {quantity}",
    "search.placeholder": "البحث عن الأدوية أو المعاملات أو العملاء...",
    "search.button": "بحث",
    languageToggle: "English",
    "dashboard.overview": "نظرة عامة",
    "dashboard.drugList": "قائمة الأدوية",
    "dashboard.billing": "الفواتير",
    "dashboard.inventory": "المخزون",
    "inventory.comingSoon": "قريبًا",
  },
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

