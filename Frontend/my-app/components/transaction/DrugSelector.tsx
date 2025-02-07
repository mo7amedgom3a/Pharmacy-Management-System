import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Inventory } from "../inventory/api/inventory"
interface DrugSelectorProps {
  inventory: Inventory[]
  selectedDrug: Inventory | null
  onSelectDrug: (drug: Inventory) => void
}

export function InventorySelector({ inventory, selectedDrug, onSelectDrug }: DrugSelectorProps) {
  return (
    <Select
      onValueChange={(value) =>
        onSelectDrug(inventory.find((item) => item.inventory_id === Number.parseInt(value)) || inventory[0])
      }
      value={selectedDrug?.inventory_id.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a drug" />
      </SelectTrigger>
      <SelectContent>
        {inventory.map((item) => (
          <SelectItem key={item.inventory_id} value={item.inventory_id.toString()}>
            {item.inventory_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

