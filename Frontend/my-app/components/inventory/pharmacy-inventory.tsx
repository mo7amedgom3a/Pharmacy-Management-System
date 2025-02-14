"use client"

import { useState, useEffect } from "react"
import { Inventory, createInventory, fetchInventoryByPharmacy, CreateInventoryinterface } from "./api/inventory"
import { Pharmacy, fetchPharmacies } from "../pharmacy/api/pharmacy"
import { PharmacySelector } from "./PharmacySelector"
import { InventorySelector } from "../InventorySelector"
import { InventoryTable } from "./InventoryTable"
import { Drug, getDrugsByInventoryId, createDrug, updateDrug, deleteDrug } from "../drugs/api/drug"
import { InventoryModal } from "./InventoryModal"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { isAdmin, getAuthToken, getTokenPayload } from "@/hooks/useAuth"
import { InventoryCreateDialog } from "./inventory_create"

export default function PharmacyInventory() {
  const { t } = useLanguage()

  // States
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Drug | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [drugs, setDrugInventory] = useState<Drug[]>([])
  const isAdminUser = isAdmin(getAuthToken())

  // Fetch pharmacies
  useEffect(() => {
    fetchPharmacies().then((pharmacies_data) => {
      const filteredPharmacies = isAdminUser 
        ? pharmacies_data 
        : pharmacies_data.filter((pharmacy: Pharmacy) => pharmacy.pharmacy_id === getTokenPayload(getAuthToken()).pharmacy_id)
      setPharmacies(filteredPharmacies)
      if (filteredPharmacies.length > 0) setSelectedPharmacy(filteredPharmacies[0]) // Default selection
    })
  }, [isAdminUser])

  // Fetch inventory when pharmacy changes
  useEffect(() => {
    if (selectedPharmacy) {
      fetchInventoryByPharmacy(selectedPharmacy.pharmacy_id).then(setInventory)
      setSelectedInventory(null) // Reset selected inventory
    }
  }, [selectedPharmacy])

  // Fetch drugs when inventory changes
  useEffect(() => {
    if (selectedInventory) {
      getDrugsByInventoryId(selectedInventory.inventory_id).then(setDrugInventory)
    }
  }, [selectedInventory])

  // Inventory CRUD handlers
  const handleAddItem = (newItem: Drug) => {
    newItem.inventory_id = selectedInventory?.inventory_id || 0
    createDrug(newItem).then((data) => {
      setDrugInventory([...drugs, data])
      setIsModalOpen(false)
    })
  }

  const handleEditItem = (updatedItem: Drug) => {
    if (selectedInventory?.inventory_id !== undefined) {
      updateDrug(updatedItem.drug_id, updatedItem).then((data) => {
        setDrugInventory(drugs.map((item) => (item.drug_id === data.drug_id ? data : item)))
        setIsModalOpen(false)
      })
    }
  }

  const handleDeleteItem = (drug_id: number) => {
    if (selectedInventory?.inventory_id !== undefined) {
      deleteDrug(drug_id).then(() => {
        setDrugInventory(drugs.filter((item) => item.drug_id !== drug_id))
      })
    }
  }

  const handleOpenEditModal = (item: Drug) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleCreateInventory = (newInventory: CreateInventoryinterface) => {
    createInventory(newInventory).then((data) => {
      setInventory([...inventory, data])
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        {/* Pharmacy Selector */}
        <div>
          <label className="block mb-2">{t("Select Pharmacy")}</label>
          <PharmacySelector
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onSelectPharmacy={setSelectedPharmacy}
          />
        </div>

        {/* Inventory Selector */}
        {selectedPharmacy && (
          <div>
            <label className="block mb-2">{t("Select Inventory")}</label>
            <InventorySelector
              inventory={inventory}
              selectedInventory={selectedInventory}
              onSelectInventory={setSelectedInventory}
            />
          </div>
        )}

        {/* Create New Inventory Button */}
        {isAdminUser && (
          <div>
            <label className="block mb-2">{t("Create New Inventory")}</label>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              {t("Create New Inventory")}
            </Button>
          </div>
        )}

        {/* Inventory Create Dialog */}
        {isCreateDialogOpen && (
          <InventoryCreateDialog
            pharmacyId={selectedPharmacy?.pharmacy_id || 0}
            onClose={() => setIsCreateDialogOpen(false)}
            onSave={handleCreateInventory}
          />
        )}
      </div>

      {/* Inventory Modal */}
      {isModalOpen && (
        <InventoryModal
          pharmacy_id={selectedPharmacy?.pharmacy_id || 0}
          item={editingItem}
          onSave={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
        />
      )}

      {/* Inventory Table */}
      {selectedPharmacy && (
        <>
          <Button onClick={() => setIsModalOpen(true)} className="my-4">
            {t("Add New Item")}
          </Button>
          {selectedInventory && (
            <InventoryTable
              drugs={drugs}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteItem}
            />
          )}
        </>
      )}
    </div>
  )
}
