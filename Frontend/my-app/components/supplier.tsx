"use client"

import SupplierManagement from "./supplier/supplier-management"

export default function Suppliers() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>
      <SupplierManagement />
    </div>
  )
}