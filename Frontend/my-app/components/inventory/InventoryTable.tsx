import type { InventoryItem } from "./mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import DeleteDialog from "../DeleteDialog"
import { useState, useEffect } from "react"
import { isAdmin } from "@/hooks/useAuth"
interface InventoryTableProps {
  inventory: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: number) => void
}

export function InventoryTable({ inventory, onEdit, onDelete }: InventoryTableProps) {
  const { t } = useLanguage()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleDeleteClick = (item: InventoryItem) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete.id)
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
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.drugName}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
              <TableCell>{item.currentQuantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.minimumQuantity}</TableCell>
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
