import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pharmacy } from "../pharmacy/api/pharmacy"
interface PharmacySelectorProps {
  pharmacies: Pharmacy[]
  selectedPharmacy: Pharmacy | null
  onSelectPharmacy: (pharmacy: Pharmacy) => void
}

export function PharmacySelector({ pharmacies, selectedPharmacy, onSelectPharmacy }: PharmacySelectorProps) {
  return (
    <Select
      onValueChange={(value) =>
        onSelectPharmacy(pharmacies.find((p) => p.pharmacy_id === Number.parseInt(value)) || pharmacies[0])
      }
      value={selectedPharmacy?.pharmacy_id.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a pharmacy" />
      </SelectTrigger>
      <SelectContent>
        {pharmacies.map((pharmacy) => (
          <SelectItem key={pharmacy.pharmacy_id} value={pharmacy.pharmacy_id.toString()}>
            {pharmacy.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

