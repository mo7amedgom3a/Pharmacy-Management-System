import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { BillingRow, Drug } from "./lib/mockData"
import DrugDetailsModal from "./DrugDetailsModal"
import BillingForm from "./BillingForm"
import DeleteDialog from "../DeleteDialog"
import { useLanguage } from "@/contexts/LanguageContext"

interface BillingTableProps {
  billings: BillingRow[]
  onUpdate: (billing: BillingRow) => void
  onDelete: (id: string) => void
  onAdd: (billing: BillingRow) => void
}

export default function BillingTable({ billings, onUpdate, onDelete, onAdd }: BillingTableProps) {
  const { t } = useLanguage()
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[] | null>(null)
  const [editingBilling, setEditingBilling] = useState<BillingRow | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(null)

  const handleDrugDetails = (drugs: Drug[]) => {
    setSelectedDrugs(drugs)
  }

  const handleEdit = (billing: BillingRow) => {
    setEditingBilling(billing)
  }

  const handleDelete = (id: string) => {
    setSelectedBillingId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedBillingId) {
      onDelete(selectedBillingId)
      setSelectedBillingId(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("billingDetails.customer")}</TableHead>
            <TableHead>{t("billingDetails.amount")}</TableHead>
            <TableHead>{t("billingDetails.paidAmount")}</TableHead>
            <TableHead>{t("billingDetails.status")}</TableHead>
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
                  {t("billingDetails.drugDetails")}
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(billing)}>
                  {t("billingDetails.updatebilling")}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(billing.id)}>
                  {t("delete")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={() => setIsAdding(true)}>
        {t("billingDetails.addBilling")}
      </Button>
      {selectedDrugs && <DrugDetailsModal drugs={selectedDrugs} onClose={() => setSelectedDrugs(null)} />}
      {(editingBilling || isAdding) && (
        <BillingForm
          billing={editingBilling}
          onSubmit={onUpdate}
          onCancel={() => {
            setEditingBilling(null)
            setIsAdding(false)
          }}
        />
      )}
      {deleteDialogOpen && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
