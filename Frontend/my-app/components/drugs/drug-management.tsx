"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { type Drug, mockDrugs } from "./mockData"
import { DrugDialog } from "./drug-dialog"
import { DrugInfoCard } from "./drug-info-card"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import DeleteDialog from "../DeleteDialog"
import { isAdmin } from "@/hooks/useAuth"

export default function DrugManagement() {
  const { t } = useLanguage()
  const [drugs, setDrugs] = useState<Drug[]>(mockDrugs)
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddingDrug, setIsAddingDrug] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSlideVisible, setIsSlideVisible] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [drugToDelete, setDrugToDelete] = useState<Drug | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }, []);

  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => setIsSlideVisible(true), 50)
    } else {
      setIsSlideVisible(false)
    }
  }, [isDialogOpen])

  const addDrug = (newDrug: Drug) => {
    setDrugs([...drugs, { ...newDrug, id: (drugs.length + 1).toString() }])
    closeDialog()
  }

  const updateDrug = (updatedDrug: Drug) => {
    setDrugs(drugs.map((drug) => (drug.id === updatedDrug.id ? updatedDrug : drug)))
    setSelectedDrug(updatedDrug)
    setIsEditMode(false)
  }

  const confirmDeleteDrug = (drug: Drug) => {
    setDrugToDelete(drug)
    setIsDeleteDialogOpen(true)
  }

  const deleteDrug = () => {
    if (drugToDelete) {
      setDrugs(drugs.filter((drug) => drug.id !== drugToDelete.id))
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

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">{t("drugList.title")}</h1>

      <Button onClick={openAddDrugDialog} className="mb-4">
        {t("drugList.addDrug")}
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("drugList.image")}</TableHead>
            <TableHead>{t("drugList.name")}</TableHead>
            <TableHead>{t("drugList.type")}</TableHead>
            <TableHead>{t("drugList.price")}</TableHead>
            <TableHead>{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drugs.map((drug) => (
            <TableRow key={drug.id}>
              <TableCell>
                <Image src={drug.image || "/placeholder.svg"} alt={drug.name} width={50} height={50} />
              </TableCell>
              <TableCell>{drug.name}</TableCell>
              <TableCell>{drug.type}</TableCell>
              <TableCell>${drug.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => openInfoDialog(drug)}>
                  {t("drugList.moreInfo")}
                </Button>
               {isAdmin(authToken) && <Button variant="outline" onClick={() => confirmDeleteDrug(drug)}>
                  {t("drugList.delete")}
                </Button>}
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
          isVisible={isSlideVisible}
        />
      )}

      {(isAddingDrug || isEditMode) && (
        <DrugDialog
          drug={selectedDrug}
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onUpdate={updateDrug}
          onAdd={addDrug}
          isAdding={isAddingDrug}
          isVisible={isSlideVisible}
        />
      )}

      {isDeleteDialogOpen && drugToDelete && (
        <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={deleteDrug}
        />
      )}
    </div>
  )
}
