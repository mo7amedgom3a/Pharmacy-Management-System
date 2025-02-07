import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Drug } from "../drugs/api/drug"
import DeleteDialog from "../DeleteDialog"
import { useState, useEffect } from "react"
import { isAdmin } from "@/hooks/useAuth"
interface InventoryTableProps {
  drugs: Drug[]
  onEdit: (item: Drug) => void
  onDelete: (id: number) => void
}

export function InventoryTable({ drugs, onEdit, onDelete }: InventoryTableProps) {
  const { t } = useLanguage()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<Drug | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleDeleteClick = (item: Drug) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete.drug_id)
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("inventory.name")}</TableHead>
            <TableHead>{t("inventory.quantity")}</TableHead>
            <TableHead>{t("inventory.currentQuantity")}</TableHead>
            <TableHead>{t("inventory.price")}</TableHead>
            <TableHead>{t("inventory.minQuantity")}</TableHead>
            <TableHead>{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drugs.map((item) => (
            <TableRow key={item.drug_id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.total_quantity}</TableCell>
              <TableCell>{item.current_quantity}</TableCell>
              <TableCell>${item.price_per_unit.toFixed(2)}</TableCell>
              <TableCell>{item.min_quantity}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(item)} variant="outline" className="mr-2">
                  {t("edit")}
                </Button>
               {isAdmin(authToken) && <Button onClick={() => handleDeleteClick(item)} variant="outline">
                  {t("delete")}
                </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {itemToDelete && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
