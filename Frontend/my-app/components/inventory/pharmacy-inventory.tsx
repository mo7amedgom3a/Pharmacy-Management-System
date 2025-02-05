"use client"

import { useState, useEffect } from "react"
import { pharmacies, inventoryData, type Pharmacy, type InventoryItem } from "./mockData"
import { PharmacySelector } from "./PharmacySelector"
import { DrugSelector } from "../transaction/DrugSelector"
import { InventoryTable } from "./InventoryTable"
import { InventoryModal } from "./InventoryModal"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
export default function PharmacyInventory() {
  const { t } = useLanguage()
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(pharmacies[0] || null)
  const [selectedDrug, setSelectedDrug] = useState<InventoryItem | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  useEffect(() => {
    if (selectedPharmacy) {
      const firstInventoryItem = inventoryData.find(item => item.pharmacyId === selectedPharmacy.id) || null
      setSelectedDrug(firstInventoryItem)
    }
  }, [selectedPharmacy])

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
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2">{t("Select Pharmacy")}</label>
          <PharmacySelector
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onSelectPharmacy={setSelectedPharmacy}
          />
        </div>
        {selectedPharmacy && (
          <div>
            <label className="block mb-2">{t("Select Inventory")}</label>
            <DrugSelector inventory={filteredInventory} selectedDrug={selectedDrug} onSelectDrug={setSelectedDrug} />
          </div>
        )}
      </div>
      {selectedPharmacy && (
        <>
          <Button onClick={() => setIsModalOpen(true)} className="my-4">
            {t("Add New Item")}
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
