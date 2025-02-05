"use client"

import { useState, useEffect } from "react"
import { fetchPharmacies, updatePharmacy, createPharmacy, deletePharmacy } from "./api/pharmacy"
import { PharmacyTable } from "./PharmacyTable"
import { PharmacyModal } from "./PharmacyModal"
import { Button } from "@/components/ui/button"

interface Pharmacy {
  pharmacy_id: number
  name: string
  contact_info: string
  location: string
}

export default function PharmacyManagement() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null)

  useEffect(() => {
    fetchPharmacies().then(setPharmacies)
  }, [])

  // update 
  useEffect(() => {
    if (editingPharmacy) {
      updatePharmacy(editingPharmacy)
    }
  }, [editingPharmacy])

  const handleAddPharmacy = async (newPharmacy: Pharmacy) => {
    const createdPharmacy = await createPharmacy(newPharmacy)
    setPharmacies([...pharmacies, createdPharmacy])
    setIsModalOpen(false)
  }

  const handleEditPharmacy = async (updatedPharmacy: Pharmacy) => {
    const editedPharmacy = await updatePharmacy(updatedPharmacy)
    setPharmacies(pharmacies.map((pharmacy) => (pharmacy.pharmacy_id === editedPharmacy.pharmacy_id ? editedPharmacy : pharmacy)))
    setIsModalOpen(false)
    setEditingPharmacy(null)
  }

  const handleDeletePharmacy = async (id: number) => {
    await deletePharmacy(id)
    setPharmacies(pharmacies.filter((pharmacy) => pharmacy.pharmacy_id !== id))
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
