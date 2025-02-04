import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Drug } from "./mockData"
import { useLanguage } from "@/contexts/LanguageContext"

interface DrugDialogProps {
  drug: Drug | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedDrug: Drug) => void
  onAdd: (newDrug: Drug) => void
  isAdding: boolean
  isVisible: boolean
}

const emptyDrug: Drug = {
  id: "",
  name: "",
  type: "",
  price: 0,
  image: "/placeholder.svg?height=100&width=100",
  total_quantity: 0,
  current_quantity: 0,
  min_quantity: 0,
  description: "",
  manufacturer: "",
  supplier: "",
}

export function DrugDialog({ drug, isOpen, onClose, onUpdate, onAdd, isAdding, isVisible }: DrugDialogProps) {
  const { t } = useLanguage()
  const [editedDrug, setEditedDrug] = useState<Drug>(emptyDrug)

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
      onAdd(editedDrug)
    } else {
      onUpdate(editedDrug)
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
              <label htmlFor="image" className="text-right text-sm">
                {t("drugList.image")}
              </label>
              <Input id="image" name="image" value={editedDrug.image} onChange={handleChange} className="col-span-2" />
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
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="supplier" className="text-right text-sm">
                {t("drugList.supplier")}
              </label>
              <Input
                id="supplier"
                name="supplier"
                value={editedDrug.supplier}
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
              <label htmlFor="price" className="text-right text-sm">
                {t("drugList.price")}
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={editedDrug.price}
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
              {isAdding ? t("drugList.addDrug") : t("drugList.update")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
