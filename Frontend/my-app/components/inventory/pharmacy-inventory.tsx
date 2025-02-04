"use client"

import { useState } from "react"
import { pharmacies, inventoryData, type Pharmacy, type InventoryItem } from "./mockData"
import { PharmacySelector } from "./PharmacySelector"
import { InventoryTable } from "./InventoryTable"
import { InventoryModal } from "./InventoryModal"
import { Button } from "@/components/ui/button"

export default function PharmacyInventory() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(pharmacies[0] || null)
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  const filteredInventory = selectedPharmacy ? inventory.filter((item) => item.pharmacyId === selectedPharmacy.id) : []

  const handleAddItem = (newItem: InventoryItem) => {
    setInventory([...inventory, { ...newItem, id: inventory.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditItem = (updatedItem: InventoryItem) => {
    setInventory(inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <PharmacySelector
        pharmacies={pharmacies}
        selectedPharmacy={selectedPharmacy}
        onSelectPharmacy={setSelectedPharmacy}
      />
      {selectedPharmacy && (
        <>
          <Button onClick={() => setIsModalOpen(true)} className="my-4">
            Add New Item
          </Button>
          <InventoryTable
            inventory={filteredInventory}
            onEdit={(item) => {
              setEditingItem(item)
              setIsModalOpen(true)
            }}
            onDelete={handleDeleteItem}
          />
        </>
      )}
      {isModalOpen && (
        <InventoryModal
          item={editingItem}
          onSave={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
          pharmacyId={selectedPharmacy?.id || 0}
        />
      )}
    </div>
  )
}
