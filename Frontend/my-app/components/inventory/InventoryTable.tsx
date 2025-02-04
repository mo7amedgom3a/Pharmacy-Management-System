import type { InventoryItem } from "./mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface InventoryTableProps {
  inventory: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: number) => void
}

export function InventoryTable({ inventory, onEdit, onDelete }: InventoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Drug Name</TableHead>
          <TableHead>Total Quantity</TableHead>
          <TableHead>Current Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Minimum Quantity</TableHead>
          <TableHead>Actions</TableHead>
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
                Edit
              </Button>
              <Button onClick={() => onDelete(item.id)} variant="destructive">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

