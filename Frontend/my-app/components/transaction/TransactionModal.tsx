import { useState, useEffect } from "react"
import type { Transaction, InventoryItem } from "./mockData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"

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

    const [searchQuery, setSearchQuery] = useState("")

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

    const filteredInventory = inventory.filter(item =>
        item.drugName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const { t } = useLanguage()
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? t("transactions.title") : t("transactions.title")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="inventoryItemId" className="text-right">
                                {t("transactions.drug_name")}
                            </label>
                            <div className="col-span-3">
                                <Select
                                    onValueChange={(value) => setFormData({ ...formData, inventoryItemId: Number.parseInt(value) })}
                                    value={formData.inventoryItemId.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("transactions.drug_name")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className="p-2">
                                            <Input
                                                id="search"
                                                name="search"
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={t("transactions.drug_name")}
                                            />
                                        </div>
                                        {filteredInventory.map((item) => (
                                            <SelectItem key={item.id} value={item.id.toString()}>
                                                {item.drugName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="type" className="text-right">
                                {t("transactions.type")}
                            </label>
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, type: value as "purchase" | "sale" })}
                                value={formData.type}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder={t("transactions.type")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IN">IN</SelectItem>
                                    <SelectItem value="OUT">OUT</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="quantity" className="text-right">
                                {t("transactions.quantity")}
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
                                {t("transactions.date")}
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
                        <Button type="submit">{transaction ? t("edit") : t("save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
