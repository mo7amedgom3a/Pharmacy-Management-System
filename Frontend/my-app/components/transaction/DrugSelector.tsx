import type { InventoryItem } from "../inventory/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DrugSelectorProps {
  inventory: InventoryItem[]
  selectedDrug: InventoryItem | null
  onSelectDrug: (drug: InventoryItem) => void
}

export function DrugSelector({ inventory, selectedDrug, onSelectDrug }: DrugSelectorProps) {
  return (
    <Select
      onValueChange={(value) =>
        onSelectDrug(inventory.find((item) => item.id === Number.parseInt(value)) || inventory[0])
      }
      value={selectedDrug?.id.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a drug" />
      </SelectTrigger>
      <SelectContent>
        {inventory.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.drugName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

