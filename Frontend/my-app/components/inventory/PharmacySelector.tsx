import type { Pharmacy } from "./mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PharmacySelectorProps {
  pharmacies: Pharmacy[]
  selectedPharmacy: Pharmacy | null
  onSelectPharmacy: (pharmacy: Pharmacy) => void
}

export function PharmacySelector({ pharmacies, selectedPharmacy, onSelectPharmacy }: PharmacySelectorProps) {
  return (
    
    <Select
      onValueChange={(value) =>
        onSelectPharmacy(pharmacies.find((p) => p.id === Number.parseInt(value)) || pharmacies[0])
      }
      value={selectedPharmacy?.id.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a pharmacy" />
      </SelectTrigger>
      <SelectContent>
        {pharmacies.map((pharmacy) => (
          <SelectItem key={pharmacy.id} value={pharmacy.id.toString()}>
            {pharmacy.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

