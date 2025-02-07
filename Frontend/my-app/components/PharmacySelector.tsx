import React from "react"
import { Pharmacy } from "./pharmacy/api/pharmacy"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PharmacySelectorProps {
    pharmacies: Pharmacy[]
    selectedPharmacy: Pharmacy | null
    onSelectPharmacy: (pharmacy: Pharmacy) => void
}

export const PharmacySelector: React.FC<PharmacySelectorProps> = ({ pharmacies, selectedPharmacy, onSelectPharmacy }) => {
    return (
        <Select
            value={selectedPharmacy?.pharmacy_id.toString() || ""}
            onValueChange={(value) => {
                const selected = pharmacies.find(p => p.pharmacy_id === Number(value))
                if (selected) onSelectPharmacy(selected)
            }}
        >
            <SelectTrigger className="border rounded-md">
                <SelectValue placeholder="Select Pharmacy" />
            </SelectTrigger>
            <SelectContent>
                {pharmacies.map(pharmacy => (
                    <SelectItem key={pharmacy.pharmacy_id} value={pharmacy.pharmacy_id.toString()}>
                        {pharmacy.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
