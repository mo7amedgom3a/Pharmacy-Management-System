"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Drug, deleteDrug, updateDrug, createDrug, getDrugsByInventoryId } from "./api/drug"
import { DrugDialog } from "./drug-dialog"
import { Search } from "lucide-react"
import { DrugInfoCard } from "./drug-info-card"
import { Input } from "@/components/ui/input"
import { Pharmacy, fetchPharmacies } from "../pharmacy/api/pharmacy"
import { Inventory, fetchInventoryByPharmacy } from "../inventory/api/inventory"
import { PharmacySelector } from "../PharmacySelector"
import { InventorySelector } from "../InventorySelector"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import DeleteDialog from "../DeleteDialog"
import { isAdmin } from "@/hooks/useAuth"

export default function DrugManagement() {
  const { t } = useLanguage()
  
  // State management
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null)
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddingDrug, setIsAddingDrug] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSlideVisible, setIsSlideVisible] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [drugToDelete, setDrugToDelete] = useState<Drug | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch auth token
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setAuthToken(token)
  }, [])

  // Fetch pharmacies
  useEffect(() => {
    fetchPharmacies().then((data) => {
      setPharmacies(data)
      if (data.length > 0) setSelectedPharmacy(data[0]) // Default selection
    })
  }, [])

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
      getDrugsByInventoryId(selectedInventory.inventory_id).then(setDrugs)
    }
  }, [selectedInventory])

  // create new drug
  const addDrug = async (newDrug: Drug) => {
    newDrug.inventory_id = selectedInventory?.inventory_id || 0
    const createdDrug = await createDrug(newDrug)
    setDrugs([...drugs, createdDrug])
    closeDialog()
  }
  const updateDrugHandler = async (updatedDrug: Drug) => {
      try {
          const updated = await updateDrug(updatedDrug.drug_id, updatedDrug)
          if (updated) {
              setDrugs(drugs.map((drug) => (drug.drug_id === updated.drug_id ? updated : drug)))
          }
            closeDialog()
      } catch (error) {
          console.error("Failed to update drug", error)
      }
  }

  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => setIsSlideVisible(true), 50)
    } else {
      setIsSlideVisible(false)
    }
  }, [isDialogOpen])
  
  const confirmDeleteDrug = (drug: Drug) => {
    setDrugToDelete(drug)
    setIsDeleteDialogOpen(true)
  }


  const handleDeleteDrug = async () => {
    if (drugToDelete) {
      await deleteDrug(drugToDelete.drug_id)
      setDrugs(drugs.filter((drug) => drug.drug_id !== drugToDelete.drug_id))
      setIsDeleteDialogOpen(false)
      setDrugToDelete(null)
    }
  }
  const openAddDrugDialog = () => {
    setIsAddingDrug(true)
    setSelectedDrug(null)
    setIsDialogOpen(true)
    setIsEditMode(false)
  }

  const openInfoDialog = (drug: Drug) => {
    setSelectedDrug(drug)
    setIsDialogOpen(true)
    setIsAddingDrug(false)
    setIsEditMode(false)
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const closeDialog = () => {
    setIsSlideVisible(false)
    setTimeout(() => {
      setIsDialogOpen(false)
      setIsAddingDrug(false)
      setIsEditMode(false)
    }, 300) // Match this delay with the CSS transition time
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="flex w-full w-full flex-grow-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4">{t("drugList.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <label className="block mb-2 p-2">{t("Select Pharmacy")}</label>
          <PharmacySelector
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onSelectPharmacy={setSelectedPharmacy}
          />
        </div>

        {/* Inventory Selector */}
        {selectedPharmacy && (
          <div className="mb-4">
            <label className="block mb-2">{t("Select Inventory")}</label>
            <InventorySelector
              inventory={inventory}
              selectedInventory={selectedInventory}
              onSelectInventory={setSelectedInventory}
            />
          </div>
        )}

        <div className="flex mb-4">
          <Button onClick={openAddDrugDialog} className="mr-4">
            {t("drugList.addDrug")}
          </Button>
          <Input
            id="search"
            name="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("transactions.drug_name")}
            className="pl-10"
          />
        </div>
  
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("drugList.image")}</TableHead>
              <TableHead>{t("drugList.name")}</TableHead>
              <TableHead>{t("drugList.type")}</TableHead>
              <TableHead>{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrugs.map((drug) => (
              <TableRow key={drug.drug_id}>
                <TableCell>
                  <Image src={drug.image_url || "/placeholder.svg"} alt={drug.name} width={50} height={50} />
                </TableCell>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.type}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2" onClick={() => openInfoDialog(drug)}>
                    {t("drugList.moreInfo")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isDialogOpen && !isAddingDrug && !isEditMode && selectedDrug && (
          <DrugInfoCard
            drug={selectedDrug}
            isOpen={isDialogOpen}
            onClose={closeDialog}
            onEdit={handleEditClick}
          />
        )}

        {(isAddingDrug || isEditMode) && (
          <DrugDialog
            drug={selectedDrug}
            isOpen={isDialogOpen}
            onClose={closeDialog}
            updateDrug={updateDrugHandler}
            addDrug={addDrug}
            isAdding={isAddingDrug}
            isVisible={isSlideVisible}
          />
        )}

        {isDeleteDialogOpen && drugToDelete && (
          <DeleteDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={handleDeleteDrug}
          />
        )}
      </CardContent>
    </Card>
  )
}
