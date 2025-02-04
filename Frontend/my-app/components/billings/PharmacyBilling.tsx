"use client"

import { useState, useEffect } from "react"
import { pharmacies, billingData, type BillingRow, type Pharmacy } from "./lib/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BillingTable from "./BillingTable"

export default function PharmacyBilling() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(pharmacies[0] || null)
  const [billings, setBillings] = useState<BillingRow[]>(billingData[pharmacies[0]?.id] || [])

  const handlePharmacyChange = (pharmacyId: string) => {
    const pharmacy = pharmacies.find((p) => p.id === pharmacyId) || null
    setSelectedPharmacy(pharmacy)
    setBillings(billingData[pharmacyId] || [])
  }

  const handleBillingUpdate = (updatedBilling: BillingRow) => {
    setBillings((prevBillings) =>
      prevBillings.map((billing) => (billing.id === updatedBilling.id ? updatedBilling : billing)),
    )
  }

  const handleBillingDelete = (billingId: string) => {
    setBillings((prevBillings) => prevBillings.filter((billing) => billing.id !== billingId))
  }

  const handleBillingAdd = (newBilling: BillingRow) => {
    setBillings((prevBillings) => [...prevBillings, newBilling])
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Pharmacy Billing System</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handlePharmacyChange} defaultValue={pharmacies[0]?.id}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select Pharmacy" />
          </SelectTrigger>
          <SelectContent>
            {pharmacies.map((pharmacy) => (
              <SelectItem key={pharmacy.id} value={pharmacy.id}>
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
          />
        )}
      </CardContent>
    </Card>
  )
}
