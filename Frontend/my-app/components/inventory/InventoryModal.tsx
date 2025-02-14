import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Drug, getDrugs } from "../drugs/api/drug"
import { useLanguage } from "@/contexts/LanguageContext"
import { Inventory } from "./api/inventory"
import { getDrugsByPharmacyId } from "../drugs/api/drug"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryModalProps {
    item: Drug | null
    onSave: (item: Drug) => void
    onClose: () => void,
    pharmacy_id?: number,
}

export function InventoryModal({ item, onSave, onClose, pharmacy_id }: InventoryModalProps) {
    const { t } = useLanguage()
    const [drugs, setDrugs] = useState<Drug[]>([])

    // State for form data
    const [formData, setFormData] = useState<Drug>({
        drug_id: 0,
        name: "",
        barcode: "",
        inventory_id: 0,
        total_quantity: 0,
        current_quantity: 0,
        price_per_unit: 0,
        min_quantity: 0,
    })

    // Fetch the list of drugs with the pharmacy_id
    useEffect(() => {
        if (pharmacy_id !== undefined) {
            getDrugsByPharmacyId(pharmacy_id).then(setDrugs)
        }
    }, [item])

    // Populate form when editing an item
    useEffect(() => {
        if (item) {
            setFormData(item)
        }
    }, [item])

    // Handle drug selection from dropdown
    const handleDrugChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDrug = drugs.find((drug) => drug.drug_id === Number(e.target.value))
        if (selectedDrug) {
            setFormData({
                ...formData,
                drug_id: selectedDrug.drug_id,
                name: selectedDrug.name
            })
        }
    }

    // Handle other input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item ? t("inventory.title") : t("inventory.title")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Drug Dropdown */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="drug_name" className="text-right">
                                {t("inventory.drug_name")}
                            </label>
                            <Select onValueChange={(value) => handleDrugChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder={t("Select a Drug")} />
                                </SelectTrigger>
                                <SelectContent>
                                    {drugs.map((drug) => (
                                        <SelectItem key={drug.drug_id} value={drug.drug_id.toString()}>
                                            {drug.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            
                        </div>

                        {/* Total Quantity */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="total_quantity" className="text-right">
                                {t("inventory.quantity")}
                            </label>
                            <Input
                                id="total_quantity"
                                name="total_quantity"
                                type="number"
                                value={formData.total_quantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        {/* Current Quantity */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="current_quantity" className="text-right">
                                {t("inventory.currentQuantity")}
                            </label>
                            <Input
                                id="current_quantity"
                                name="current_quantity"
                                type="number"
                                value={formData.current_quantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        {/* Price Per Unit */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="price_per_unit" className="text-right">
                                {t("inventory.price")}
                            </label>
                            <Input
                                id="price_per_unit"
                                name="price_per_unit"
                                type="number"
                                step="0.01"
                                value={formData.price_per_unit}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        {/* Min Quantity */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="min_quantity" className="text-right">
                                {t("inventory.minQuantity")}
                            </label>
                            <Input
                                id="min_quantity"
                                name="min_quantity"
                                type="number"
                                value={formData.min_quantity}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    
                    {/* Save Button */}
                    <DialogFooter>
                        <Button type="submit">{item ? t("update") : t("save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
