import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { BillingRow, Drug } from "./lib/mockData"
import DrugDetailsModal from "./DrugDetailsModal"
import BillingForm from "./BillingForm"

interface BillingTableProps {
  billings: BillingRow[]
  onUpdate: (billing: BillingRow) => void
  onDelete: (id: string) => void
  onAdd: (billing: BillingRow) => void
}

export default function BillingTable({ billings, onUpdate, onDelete, onAdd }: BillingTableProps) {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[] | null>(null)
  const [editingBilling, setEditingBilling] = useState<BillingRow | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleDrugDetails = (drugs: Drug[]) => {
    setSelectedDrugs(drugs)
  }

  const handleEdit = (billing: BillingRow) => {
    setEditingBilling(billing)
  }

  const handleDelete = (id: string) => {
    onDelete(id)
  }

  const handleSubmit = (billing: BillingRow) => {
    if (editingBilling) {
      onUpdate(billing)
    } else {
      onAdd(billing)
    }
    setEditingBilling(null)
    setIsAdding(false)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing) => (
            <TableRow key={billing.id}>
              <TableCell>{billing.customerName}</TableCell>
              <TableCell>${billing.totalAmount.toFixed(2)}</TableCell>
              <TableCell>${billing.paidAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleDrugDetails(billing.drugs)}>
                  Drug Details
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(billing)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(billing.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={() => setIsAdding(true)}>
        Add New Billing
      </Button>
      {selectedDrugs && <DrugDetailsModal drugs={selectedDrugs} onClose={() => setSelectedDrugs(null)} />}
      {(editingBilling || isAdding) && (
        <BillingForm
          billing={editingBilling}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingBilling(null)
            setIsAdding(false)
          }}
        />
      )}
    </div>
  )
}

