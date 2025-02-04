import { useState, useEffect } from "react"
import type { Transaction, InventoryItem } from "./mockData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransactionModalProps {
    transaction: Transaction | null
    onSave: (transaction: Transaction) => void
    onClose: () => void
    pharmacyId: number
    inventoryItemId: number
    inventory: InventoryItem[]
}

export function TransactionModal({
    transaction,
    onSave,
    onClose,
    pharmacyId,
    inventoryItemId,
    inventory,
}: TransactionModalProps) {
    const [formData, setFormData] = useState<Transaction>({
        id: transaction?.id || 0,
        pharmacyId,
        inventoryItemId,
        type: "purchase",
        quantity: 0,
        date: new Date().toISOString().split("T")[0],
    })

    useEffect(() => {
        if (transaction) {
            setFormData(transaction)
        }
    }, [transaction])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === "quantity" ? Number(value) : value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="inventoryItemId" className="text-right">
                                Drug
                            </label>
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, inventoryItemId: Number.parseInt(value) })}
                                value={formData.inventoryItemId.toString()}
                            >
                                <SelectTrigger className="col-span-3">
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
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="type" className="text-right">
                                Type
                            </label>
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, type: value as "purchase" | "sale" })}
                                value={formData.type}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select transaction type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="purchase">Purchase</SelectItem>
                                    <SelectItem value="sale">Sale</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="quantity" className="text-right">
                                Quantity
                            </label>
                            <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="date" className="text-right">
                                Date
                            </label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{transaction ? "Update" : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
