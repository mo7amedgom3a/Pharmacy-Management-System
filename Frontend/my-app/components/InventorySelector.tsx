import React from "react"
import { Inventory } from "./inventory/api/inventory"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventorySelectorProps {
    inventory: Inventory[]
    selectedInventory: Inventory | null
    onSelectInventory: (inventory: Inventory) => void
}

export const InventorySelector: React.FC<InventorySelectorProps> = ({ inventory, selectedInventory, onSelectInventory }) => {
    return (
        <Select
            value={selectedInventory?.inventory_id?.toString() || ""}
            onValueChange={(value) => {
                const selected = inventory.find(i => i.inventory_id === Number(value))
                if (selected) onSelectInventory(selected)
            }}
        >
            <SelectTrigger className="border p-2 rounded-md">
                <SelectValue placeholder="Select Inventory" />
            </SelectTrigger>
            <SelectContent>
                {inventory.map(item => (
                    <SelectItem key={item.inventory_id} value={item.inventory_id.toString()}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
