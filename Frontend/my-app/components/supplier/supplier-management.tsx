"use client"

import { useState, useEffect } from "react"
import { Supplier, getSuppliers, getSupplierById, updateSupplier, createSupplier, deleteSupplier } from "./api/supplier"
import { SupplierTable } from "./SupplierTable"
import { SupplierModal } from "./SupplierModal"
import { Button } from "@/components/ui/button"

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

  useEffect(() => {
    getSuppliers().then(setSuppliers)
  }, [])

  const handleAddSupplier = async (newSupplier: Supplier) => {
    const createdSupplier = await createSupplier(newSupplier)
    setSuppliers([...suppliers, createdSupplier])
    setIsModalOpen(false)
  }

  const handleEditSupplier = async (updatedSupplier: Supplier) => {
    const editedSupplier = await updateSupplier(updatedSupplier.supplier_id, updatedSupplier)
    setSuppliers(suppliers.map((supplier) => (supplier.supplier_id === editedSupplier.supplier_id ? editedSupplier : supplier)))
    setIsModalOpen(false)
    setEditingSupplier(null)
  }

  const handleDeleteSupplier = async (id: number) => {
    await deleteSupplier(id)
    setSuppliers(suppliers.filter((supplier) => supplier.supplier_id !== id))
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
