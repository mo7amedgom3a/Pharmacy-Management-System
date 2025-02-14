import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Billing } from "./api/billing"
import { Drug, getDrugsByPharmacyId } from "../drugs/api/drug"
import { useLanguage } from "@/contexts/LanguageContext"

interface BillingFormProps {
  billing?: Billing | null
  onAdd: (data: Omit<Billing, "id">) => void
  onEdit: (data: Omit<Billing, "id">) => void,
  pharmacy_id?: number,
  onCancel: () => void
}

export default function BillingForm({ billing, onAdd, onEdit, onCancel, pharmacy_id }: BillingFormProps) {
  const { t } = useLanguage()
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
  useEffect(() => {
    if (!billing && pharmacy_id !== undefined) {
      getDrugsByPharmacyId(pharmacy_id).then(setDrugs)
    }
  }, [billing])
  
  const [formData, setFormData] = useState<Omit<Billing, "id" | "drugs">>({
    billing_id: 0,
    pharmacy_id: pharmacy_id || 0,
    customer_name: "",
    total_amount: 0,
    paid_amount: 0,
    drug_id: undefined,
    quantity: 0,
    price: 0,
  })

  useEffect(() => {
    if (billing) {
      setFormData({
        billing_id: billing.billing_id,
        pharmacy_id: billing.pharmacy_id,
        customer_name: billing.customer_name,
        total_amount: billing.total_amount,
        paid_amount: billing.paid_amount,
        drug_id: billing.drug_id,
        quantity: billing.quantity,
        price: billing.price,
      })
    }
  }, [billing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "customer_name" ? value : Number.parseFloat(value) }))
  }

  const handleDrugChange = (drugId: number) => {
    const selected = drugs.find((drug) => drug.drug_id === drugId) || null
    setSelectedDrug(selected)
    setFormData((prev) => ({ ...prev, drug_id: drugId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (billing) {
      onEdit(formData)
    } else {
      onAdd(formData)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{billing ? t("billingDetails.updatebilling") : t("billingDetails.addBilling")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="customer_name" className="text-right">
                {t("billingDetails.customer")}
              </label>
              <Input
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="total_amount" className="text-right">
                {t("billingDetails.amount")}
              </label>
              <Input
                id="total_amount"
                name="total_amount"
                type="number"
                value={formData.total_amount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paid_amount" className="text-right">
                {t("billingDetails.paidAmount")}
              </label>
              <Input
                id="paid_amount"
                name="paid_amount"
                type="number"
                value={formData.paid_amount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right">
                {t("billingDetails.quantity")}
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right">
                {t("billingDetails.price")}
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {!billing && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="drug" className="text-right">
                  {t("billingDetails.drug")}
                </label>
                <Select onValueChange={(value) => handleDrugChange(Number(value))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t("billingDetails.selectDrug")} />
                  </SelectTrigger>
                  <SelectContent>
                    {drugs.map((drug) => (
                      <SelectItem key={drug.drug_id} value={drug.drug_id.toString()}>
                        {drug.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
            <Button type="submit">{t("save")}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
