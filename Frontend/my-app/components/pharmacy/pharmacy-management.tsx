"use client"

import { useState } from "react"
import { pharmaciesData, type Pharmacy } from "./mockData"
import { PharmacyTable } from "./PharmacyTable"
import { PharmacyModal } from "./PharmacyModal"
import { Button } from "@/components/ui/button"

export default function PharmacyManagement() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(pharmaciesData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null)

  const handleAddPharmacy = (newPharmacy: Pharmacy) => {
    setPharmacies([...pharmacies, { ...newPharmacy, id: pharmacies.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditPharmacy = (updatedPharmacy: Pharmacy) => {
    setPharmacies(pharmacies.map((pharmacy) => (pharmacy.id === updatedPharmacy.id ? updatedPharmacy : pharmacy)))
    setIsModalOpen(false)
    setEditingPharmacy(null)
  }

  const handleDeletePharmacy = (id: number) => {
    setPharmacies(pharmacies.filter((pharmacy) => pharmacy.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pharmacy Management System</h1>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add New Pharmacy
      </Button>
      <PharmacyTable
        pharmacies={pharmacies}
        onEdit={(pharmacy) => {
          setEditingPharmacy(pharmacy)
          setIsModalOpen(true)
        }}
        onDelete={handleDeletePharmacy}
      />
      {isModalOpen && (
        <PharmacyModal
          pharmacy={editingPharmacy}
          onSave={editingPharmacy ? handleEditPharmacy : handleAddPharmacy}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPharmacy(null)
          }}
        />
      )}
    </div>
  )
}

