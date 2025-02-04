import { useState, useEffect } from "react"
import type { InventoryItem } from "./mockData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface InventoryModalProps {
    item: InventoryItem | null
    onSave: (item: InventoryItem) => void
    onClose: () => void
    pharmacyId: number
}

export function InventoryModal({ item, onSave, onClose, pharmacyId }: InventoryModalProps) {
    const [formData, setFormData] = useState<InventoryItem>({
        id: item?.id || 0,
        pharmacyId,
        drugName: "",
        totalQuantity: 0,
        currentQuantity: 0,
        price: 0,
        minimumQuantity: 0,
    })

    useEffect(() => {
        if (item) {
            setFormData(item)
        }
    }, [item])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === "drugName" ? value : Number(value) })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item ? "Edit Inventory Item" : "Add New Inventory Item"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="drugName" className="text-right">
                                Drug Name
                            </label>
                            <Input
                                id="drugName"
                                name="drugName"
                                value={formData.drugName}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="totalQuantity" className="text-right">
                                Total Quantity
                            </label>
                            <Input
                                id="totalQuantity"
                                name="totalQuantity"
                                type="number"
                                value={formData.totalQuantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="currentQuantity" className="text-right">
                                Current Quantity
                            </label>
                            <Input
                                id="currentQuantity"
                                name="currentQuantity"
                                type="number"
                                value={formData.currentQuantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="price" className="text-right">
                                Price
                            </label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="minimumQuantity" className="text-right">
                                Minimum Quantity
                            </label>
                            <Input
                                id="minimumQuantity"
                                name="minimumQuantity"
                                type="number"
                                value={formData.minimumQuantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{item ? "Update" : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
