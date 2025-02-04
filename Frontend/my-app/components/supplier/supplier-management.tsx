"use client"

import { useState } from "react"
import { suppliersData, type Supplier } from "./mockData"
import { SupplierTable } from "./SupplierTable"
import { SupplierModal } from "./SupplierModal"
import { Button } from "@/components/ui/button"

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(suppliersData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

  const handleAddSupplier = (newSupplier: Supplier) => {
    setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(suppliers.map((supplier) => (supplier.id === updatedSupplier.id ? updatedSupplier : supplier)))
    setIsModalOpen(false)
    setEditingSupplier(null)
  }

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add New Supplier
      </Button>
      <SupplierTable
        suppliers={suppliers}
        onEdit={(supplier) => {
          setEditingSupplier(supplier)
          setIsModalOpen(true)
        }}
        onDelete={handleDeleteSupplier}
      />
      {isModalOpen && (
        <SupplierModal
          supplier={editingSupplier}
          onSave={editingSupplier ? handleEditSupplier : handleAddSupplier}
          onClose={() => {
            setIsModalOpen(false)
            setEditingSupplier(null)
          }}
        />
      )}
    </div>
  )
}

