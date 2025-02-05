import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pharmacy } from "./api/pharmacy"
import DeleteDialog from "../DeleteDialog"
import { useState } from "react"

interface PharmacyTableProps {
  pharmacies: Pharmacy[]
  onEdit: (pharmacy: Pharmacy) => void
  onDelete: (id: number) => void
}

export function PharmacyTable({ pharmacies, onEdit, onDelete }: PharmacyTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedPharmacyId(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedPharmacyId !== null) {
      onDelete(selectedPharmacyId)
      setDeleteDialogOpen(false)
      setSelectedPharmacyId(null)
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pharmacies.map((pharmacy) => (
            <TableRow key={pharmacy.pharmacy_id}>
              <TableCell>{pharmacy.name}</TableCell>
              <TableCell>{pharmacy.contact_info}</TableCell>
              <TableCell>{pharmacy.location}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(pharmacy)} variant="outline" className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDeleteClick(pharmacy.pharmacy_id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
