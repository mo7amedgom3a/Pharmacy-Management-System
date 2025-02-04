import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { BillingRow } from "./lib/mockData"
import { useLanguage } from "@/contexts/LanguageContext"

interface BillingFormProps {
  billing?: BillingRow | null
  onSubmit: (billing: BillingRow) => void
  onCancel: () => void
}

export default function BillingForm({ billing, onSubmit, onCancel }: BillingFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<Omit<BillingRow, "id" | "drugs">>({
    customerName: "",
    totalAmount: 0,
    paidAmount: 0,
  })

  useEffect(() => {
    if (billing) {
      setFormData({
        customerName: billing.customerName,
        totalAmount: billing.totalAmount,
        paidAmount: billing.paidAmount,
      })
    }
  }, [billing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "customerName" ? value : Number.parseFloat(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: billing?.id || Date.now().toString(),
      ...formData,
      drugs: billing?.drugs || [],
    })
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
              <label htmlFor="customerName" className="text-right">
                {t("billingDetails.customer")}
              </label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="totalAmount" className="text-right">
                {t("billingDetails.amount")}
              </label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paidAmount" className="text-right">
                {t("billingDetails.paidAmount")}
              </label>
              <Input
                id="paidAmount"
                name="paidAmount"
                type="number"
                value={formData.paidAmount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
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
