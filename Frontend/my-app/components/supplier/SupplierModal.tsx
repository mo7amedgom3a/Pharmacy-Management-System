import { useState, useEffect } from "react"
import { Supplier } from "./api/supplier"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SupplierModalProps {
    supplier: Supplier | null
    onSave: (supplier: Supplier) => void
    onClose: () => void
}

export function SupplierModal({ supplier, onSave, onClose }: SupplierModalProps) {
    const [formData, setFormData] = useState<Supplier>({
        supplier_id: supplier?.supplier_id || 0,
        name: "",
        contact_info: "",
        address: "",
    })

    useEffect(() => {
        if (supplier) {
            setFormData(supplier)
        }
    }, [supplier])

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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{supplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right">
                                Name
                            </label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4"></div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="contact_info" className="text-right">
                                Phone
                            </label>
                            <Input id="contact_info" name="contact_info" value={formData.contact_info} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="address" className="text-right">
                                Location
                            </label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{supplier ? "Update" : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
