import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Drug } from "./api/drug"
import { fetchInventoryByPharmacy, Inventory } from "../inventory/api/inventory"
import { useLanguage } from "@/contexts/LanguageContext"
interface DrugDialogProps {
  drug: Drug | null
  isOpen: boolean
  onClose: () => void
  updateDrug: (updatedDrug: Drug) => Promise<void>
  addDrug: (newDrug: Drug) => Promise<void>
  isAdding: boolean
  isVisible: boolean,
}

const emptyDrug: Drug = {
    drug_id: 0,
    name: "",
    type: "",
    image_url: "",
    barcode: "",
    inventory_id: 0,
    manufacturer: "",
    description: "",
    price_per_unit: 0,
    total_quantity: 0,
    current_quantity: 0,
    min_quantity: 0,
}

export function DrugDialog({ drug, isOpen, onClose, updateDrug, addDrug, isAdding, isVisible }: DrugDialogProps) {
  const { t } = useLanguage()
  const [editedDrug, setEditedDrug] = useState<Drug>(emptyDrug)
  const [drugInventory, setDrugInventory] = useState<Inventory[]>([])
  const [inventory, setInventory] = useState<Inventory>()
  useEffect(() => {
    setEditedDrug(drug || emptyDrug)
  }, [drug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedDrug((prev) => ({
      ...prev,
      [name]: ["price", "total_quantity", "current_quantity", "min_quantity"].includes(name) ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    if (isAdding) {
      addDrug(editedDrug)
    } else {
      updateDrug(editedDrug)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] sm:max-h-[600px] w-[90vw] h-[90vh] p-0 overflow-hidden rounded-xl">
        <div
          className={`transition-transform duration-300 ease-in-out transform ${isVisible ? "translate-y-0" : "-translate-y-full"} h-full overflow-y-auto`}
        >
          <DialogHeader className="p-6">
            <DialogTitle>{isAdding ? t("drugList.addDrug") : t("drugList.update")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 p-4">
            <div className="grid grid-cols-3 items-center gap-2">
                
              <label htmlFor="name" className="text-right text-sm">
                {t("drugList.name")}
              </label>
              <Input id="name" name="name" value={editedDrug.name} onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="type" className="text-right text-sm">
                {t("drugList.type")}
              </label>
              <Input id="type" name="type" value={editedDrug.type} onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="image_url" className="text-right text-sm">
                {t("drugList.image")}
              </label>
              <Input id="image_url" name="image_url" value={editedDrug.image_url} onChange={handleChange} className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="manufacturer" className="text-right text-sm">
                {t("drugList.manufacturer")}
              </label>
              <Input
                id="manufacturer"
                name="manufacturer"
                value={editedDrug.manufacturer}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2">
              <label htmlFor="description" className="text-sm">
                {t("drugList.Description")}
              </label>
              <Textarea
                id="description"
                name="description"
                value={editedDrug.description}
                onChange={handleChange}
                className="col-span-1"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="price_per_unit" className="text-right text-sm">
                {t("drugList.price")}
              </label>
              <Input
                id="price_per_unit"
                name="price_per_unit"
                type="number"
                value={editedDrug.price_per_unit}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="total_quantity" className="text-right text-sm">
                {t("drugList.totalQuantity")}
              </label>
              <Input
                id="total_quantity"
                name="total_quantity"
                type="number"
                value={editedDrug.total_quantity}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="current_quantity" className="text-right text-sm">
                {t("drugList.currentQuantity")}
              </label>
              <Input
                id="current_quantity"
                name="current_quantity"
                type="number"
                value={editedDrug.current_quantity}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="min_quantity" className="text-right text-sm">
                {t("drugList.minQuantity")}
              </label>
              <Input
                id="min_quantity"
                name="min_quantity"
                type="number"
                value={editedDrug.min_quantity}
                onChange={handleChange}
                className="col-span-2"
              />
            </div>
          </div>
          <DialogFooter className="p-4">
            <Button type="submit" onClick={handleSubmit}>
              {isAdding ? t("save") : t("update")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}