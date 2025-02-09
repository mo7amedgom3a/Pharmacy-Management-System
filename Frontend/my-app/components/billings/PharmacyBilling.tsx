"use client"

import { useState, useEffect } from "react"
import { Billing, getBillingByPharmacy, getBillingById, updateBilling, createBilling, deleteBilling } from "./api/billing"
import { Pharmacy, fetchPharmacies } from "../pharmacy/api/pharmacy"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BillingTable from "./BillingTable"
import { useLanguage } from "@/contexts/LanguageContext"

export default function PharmacyBilling() {
  const { t } = useLanguage()
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null)
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [billings, setBillings] = useState<Billing[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // fetch all pharmacies
  useEffect(() => {
    fetchPharmacies().then(setPharmacies)
  }, [])

  // fetch billings by pharmacy
  useEffect(() => {
    if (selectedPharmacy) {
      getBillingByPharmacy(selectedPharmacy.pharmacy_id).then(setBillings)
    }
  }, [selectedPharmacy])

  const handlePharmacyChange = (pharmacyId: string) => {
    setSelectedPharmacy(pharmacies.find((pharmacy) => pharmacy.pharmacy_id === Number(pharmacyId)) || null)
  }

  // handle update billing
  const handleBillingUpdate = (billing: Billing) => {
    updateBilling(billing.billing_id, billing).then((updatedBilling) => {
      setBillings((prevBillings) =>
        prevBillings.map((prevBilling) => (prevBilling.billing_id === updatedBilling.billing_id ? updatedBilling : prevBilling))
      )
      handleDialogClose()
    })
  }

  // handle delete billing
  const handleBillingDelete = (billingId: number) => {
    deleteBilling(billingId).then(() => {
      setBillings((prevBillings) => prevBillings.filter((prevBilling) => prevBilling.billing_id !== billingId))
      handleDialogClose()
    })
  }

  // create new billing
  const handleBillingAdd = (billing: Billing) => {
    billing.pharmacy_id = selectedPharmacy?.pharmacy_id || 0
    createBilling(billing).then((newBilling) => {
      setBillings((prevBillings) => [...prevBillings, newBilling])
      handleDialogClose()
    })
  }

  const handleDialogOpen = (billing: Billing | null) => {
    setSelectedBilling(billing)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setSelectedBilling(null)
    setIsDialogOpen(false)
  }

  return (
    <Card className="flex w-full w-full flex-grow-1"> 
      <CardHeader>
        <CardTitle>{t("Billings")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><b>{t("Pharamcies")}</b></p>
        
        <Select onValueChange={handlePharmacyChange} defaultValue={pharmacies[0]?.pharmacy_id.toString()}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select Pharmacy" />
          </SelectTrigger>
          <SelectContent>
            {pharmacies.map((pharmacy) => (
              <SelectItem key={pharmacy.pharmacy_id} value={pharmacy.pharmacy_id.toString()}>
                {pharmacy.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedPharmacy && (
          <BillingTable
            billings={billings}
            onUpdate={handleBillingUpdate}
            onDelete={handleBillingDelete}
            onAdd={handleBillingAdd}
            onDialogOpen={handleDialogOpen}
            onDialogClose={handleDialogClose}
            isDialogOpen={isDialogOpen}
          />
        )}
      </CardContent>
    </Card>
  )
}
