import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Billing, getDrugsByBilling } from "./api/billing"
import DrugDetailsModal from "./DrugDetailsModal"
import { Drug, getDrugs } from "../drugs/api/drug"
import BillingForm from "./BillingForm"
import DeleteDialog from "../DeleteDialog"
import { useLanguage } from "@/contexts/LanguageContext"
import { isAdmin } from "@/hooks/useAuth"

interface BillingTableProps {
  billings: Billing[]
  onUpdate: (billing: Billing) => void
  onDelete: (id: number) => void
  onAdd: (billing: Billing) => void,
  onDialogOpen: (billing: Billing | null) => void, 
  onDialogClose: () => void,
  isDialogOpen: boolean,
  pharmacy_id: number
}

export default function BillingTable({ billings, onUpdate, onDelete, onAdd, onDialogClose, onDialogOpen, isDialogOpen, pharmacy_id }: BillingTableProps) {
  const { t } = useLanguage()
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[] | null>(null)
  const [editingBilling, setEditingBilling] = useState<Billing | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBillingId, setSelectedBillingId] = useState<number | null>(null)
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  // get drugs by billing
  useEffect(() => {
    if (selectedBillingId) {
      getDrugsByBilling(selectedBillingId).then(setSelectedDrugs)
    }
  }, [selectedBillingId])

  const handleEdit = (billing: Billing) => {
    setEditingBilling(billing)
    onDialogOpen(billing)
  }

  const handleDelete = (id: number) => {
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
            <TableRow key={billing.billing_id}>
              <TableCell>{billing.customer_name}</TableCell>
              <TableCell>${billing.total_amount.toFixed(2)}</TableCell>
              <TableCell>${billing.paid_amount.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedBillingId(billing.billing_id)}>
                  {t("billingDetails.drugDetails")}
                </Button>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(billing)}>
                  {t("billingDetails.updatebilling")}
                </Button>
                {isAdmin(authToken) && <Button variant="destructive" size="sm" onClick={() => handleDelete(billing.billing_id)}>
                  {t("delete")}
                </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="mt-4" onClick={() => {
        setIsAdding(true)
        onDialogOpen(null)
      }}>
        {t("billingDetails.addBilling")}
      </Button>
      {selectedDrugs && <DrugDetailsModal drugs={selectedDrugs} onClose={() => setSelectedDrugs(null)} />}
      {(editingBilling || isAdding) && (
        <BillingForm
          billing={editingBilling}
          onAdd={onAdd}
          onEdit={onUpdate}
          pharmacy_id={pharmacy_id}
          onCancel={() => {
            setEditingBilling(null)
            setIsAdding(false)
            onDialogClose()
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
