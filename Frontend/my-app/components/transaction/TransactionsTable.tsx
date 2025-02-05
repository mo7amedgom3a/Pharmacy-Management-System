import type { Transaction, InventoryItem } from "./mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import DeleteDialog from "../DeleteDialog"
import { useState } from "react"

interface TransactionsTableProps {
  transactions: Transaction[]
  inventory: InventoryItem[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

export function TransactionsTable({ transactions, inventory, onEdit, onDelete }: TransactionsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null)

  const getDrugName = (inventoryItemId: number) => {
    const item = inventory.find((item) => item.id === inventoryItemId)
    return item ? item.drugName : "Unknown"
  }

  const { t } = useLanguage()

  const handleDeleteClick = (id: number) => {
    setSelectedTransactionId(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedTransactionId !== null) {
      onDelete(selectedTransactionId)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("transactions.drug_name")}</TableHead>
            <TableHead>{t("transactions.type")}</TableHead>
            <TableHead>{t("transactions.quantity")}</TableHead>
            <TableHead>{t("transactions.date")}</TableHead>
            <TableHead>{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{getDrugName(transaction.inventoryItemId)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(transaction)} variant="outline" className="mr-2">
                  {t("edit")}
                </Button>
                <Button onClick={() => handleDeleteClick(transaction.id)} variant="destructive">
                  {t("delete")}
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
