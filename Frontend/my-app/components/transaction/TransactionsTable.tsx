import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Transaction } from "./api/transaction"
import { useLanguage } from "@/contexts/LanguageContext"
import DeleteDialog from "../DeleteDialog"
import { useState, useEffect } from "react"
import { isAdmin } from "@/hooks/useAuth"
import { Drug } from "../drugs/api/drug"
import { DrugInfoCard } from "../drugs/drug-info-card"
interface TransactionsTableProps {
  transactions: Transaction[],
  drug: Drug,
}

export function TransactionsTable({ transactions, drug }: TransactionsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const { t } = useLanguage()

  const handleDeleteClick = (id: number) => {
    setSelectedTransactionId(id)
    setDeleteDialogOpen(true)
  }
  const handleDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }
  const handleTime = (date: string) => {
    return new Date(date).toLocaleTimeString()
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
            <TableHead>{t("transactions.time")}</TableHead>
            <TableHead>{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.transaction_id}>
              <TableCell>{drug.name}</TableCell>
              <TableCell>{transaction.transaction_type}</TableCell>
              <TableCell>{transaction.quantity}</TableCell>
              <TableCell>{handleDate(transaction.transaction_date)}</TableCell>
              <TableCell>{handleTime(transaction.transaction_date)}</TableCell>
              <TableCell>
                <Button onClick={() => setSelectedTransactionId(transaction.transaction_id)}> More Details </Button>
                {selectedTransactionId === transaction.transaction_id && (
                  <DrugInfoCard 
                    drug={drug} 
                    onClose={() => setSelectedTransactionId(null)} 
                    isOpen={selectedTransactionId === transaction.transaction_id} 
                    onEdit={() => { /* handle edit logic here */ }} 
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      /> */}
    </>
  )
}
