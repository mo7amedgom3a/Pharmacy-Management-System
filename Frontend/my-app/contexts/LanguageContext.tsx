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
    "Are you sure you want to delete this?": "Are you sure you want to delete this?",
    "update": "Update",
    "edit": "Edit",
    "delete": "Delete",
    "dashboard.title": "Pharmacy Dashboard",

    "drugList.title": "Drug List",
    "drugList.name": "Name",
    "drugList.addDrug": "Add Drug",
    "drugList.image": "Image",
    "drugList.moreInfo": "More Info",
    "drugList.quantity": "Quantity",
    "drugList.type": "Type",
    "drugList.price": "Price",
    "drugList.action": "Action",
    "drugList.expirationDate": "Expiration Date",
    "drugList.description": "Description",
    "drugList.manufacturer": "Manufacturer",
    "drugList.supplier": "Supplier",
    "drugList.update": "Update",
    "drugList.minQuantity": "Min Quantity",
    "drugList.totalQuantity": "Total Quantity",
    "drugList.currentQuantity": "Current Quantity",



    "billingDetails.title": "Billing Details",
    "billingDetails.customer": "Customer",
    "billingDetails.date": "Date",
    "billingDetails.amount": "Amount",
    "billingDetails.paidAmount": "Paid Amount",
    "billingDetails.status": "Status",
    "billingDetails.addBilling": "Generate New Bill",
    "billingDetails.drugDetails": "Drug Details",
    


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
    "employees.title": "Employees",
    "employees.name": "Name",
    "employees.position": "Position",
    "employees.salary": "Salary",
    "employees.action": "Action",
    "inventory.title": "Inventory",
    "inventory.name": "Name",
    "inventory.quantity": "Quantity",
    "inventory.price": "Price",
    "inventory.expirationDate": "Expiration Date",
    "inventory.action": "Action",
    "transactions.title": "Transactions",
    "transactions.customer": "Customer",
    "transactions.date": "Date",
    "transactions.amount": "Amount",

  },
  ar: {
    "Update": "تحديث",
    "save": "حفظ",
    "edit": "تعديل",
    "delete": "حذف",
    "cancel": "إلغاء",
    "dashboard.title": "لوحة تحكم الصيدلية",


    "drugList.title": "قائمة الأدوية",
    "drugList.name": "الاسم",
    "drugList.addDrug": "إضافة دواء",
    "drugList.image": "الصورة",
    "drugList.moreInfo": "المزيد",
    "drugList.type": "النوع",
    "drugList.quantity": "الكمية",
    "drugList.price": "السعر",
    "drugList.Description": "الوصف",
    "drugList.expirationDate": "تاريخ انتهاء الصلاحية",
    "drugList.action": "الإجراء",
    "drugList.update": "تحديث",
    "drugList.manufacturer": "الشركة المصنعة",
    "drugList.supplier": "المورد",
    "drugList.drugDetails": "تفاصيل الدواء",
    "drugList.minQuantity": "الحد الأدنى للكمية",
    "drugList.totalQuantity": "الكمية الإجمالية",
    "drugList.currentQuantity": "الكمية الحالية",


    "billingDetails.title": "تفاصيل الفواتير",
    "billingDetails.customer": "العميل",
    "billingDetails.date": "التاريخ",
    "billingDetails.amount": "المبلغ الإجمالي",
    "billingDetails.paidAmount": "المبلغ المدفوع",
    "billingDetails.status": "الحالة",
    "billingDetails.addBilling": "إنشاء فاتورة جديدة",
    "billingDetails.updatebilling": "تحديث الفاتورة",
    "billingDetails.drugDetails": "تفاصيل الدواء",
    "Are you sure you want to delete this?": "هل أنت متأكد أنك تريد حذف هذه البيانات؟",
    
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
    "employees.title": "الموظفين",
    "employees.name": "الاسم",
    "employees.position": "المنصب",
    "employees.salary": "المرتب",
    "employees.action": "تعديل",
    "inventory.title": "المخزون",
    "inventory.name": "الاسم",
    "inventory.quantity": "الكمية",
    "inventory.price": "السعر",
    "inventory.expirationDate": "تاريخ انتهاء الصلاحية",
    "inventory.action": "تعديل",
    "transactions.title": "المعاملات",
    "transactions.customer": "العميل",
    "transactions.date": "التاريخ",
    "transactions.amount": "المبلغ",
    "transactions.status": "الحالة",
    
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

