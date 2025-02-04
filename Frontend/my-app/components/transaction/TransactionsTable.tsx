import type { Transaction, InventoryItem } from "./mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface TransactionsTableProps {
  transactions: Transaction[]
  inventory: InventoryItem[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: number) => void
}

export function TransactionsTable({ transactions, inventory, onEdit, onDelete }: TransactionsTableProps) {
  const getDrugName = (inventoryItemId: number) => {
    const item = inventory.find((item) => item.id === inventoryItemId)
    return item ? item.drugName : "Unknown"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Drug Name</TableHead>
          <TableHead>Transaction Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
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
                Edit
              </Button>
              <Button onClick={() => onDelete(transaction.id)} variant="destructive">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

