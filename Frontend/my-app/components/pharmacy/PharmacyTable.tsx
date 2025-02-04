import type { Pharmacy } from "./mockData"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface PharmacyTableProps {
  pharmacies: Pharmacy[]
  onEdit: (pharmacy: Pharmacy) => void
  onDelete: (id: number) => void
}

export function PharmacyTable({ pharmacies, onEdit, onDelete }: PharmacyTableProps) {
  return (
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
          <TableRow key={pharmacy.id}>
            <TableCell>{pharmacy.name}</TableCell>
            <TableCell>{pharmacy.phone}</TableCell>
            <TableCell>{pharmacy.location}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(pharmacy)} variant="outline" className="mr-2">
                Edit
              </Button>
              <Button onClick={() => onDelete(pharmacy.id)} variant="destructive">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

