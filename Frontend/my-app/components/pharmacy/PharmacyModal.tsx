import { useState, useEffect } from "react"
import { Pharmacy } from "./api/pharmacy"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

interface PharmacyModalProps {
    pharmacy: Pharmacy | null
    onSave: (pharmacy: Pharmacy) => void
    onClose: () => void
}

export function PharmacyModal({ pharmacy, onSave, onClose }: PharmacyModalProps) {
    const [formData, setFormData] = useState<Pharmacy>({
        pharmacy_id: pharmacy?.pharmacy_id || 0,
        name: "",
        contact_info: "",
        location: "",
    })

    useEffect(() => {
        if (pharmacy) {
            setFormData(pharmacy)
        }
    }, [pharmacy])

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
                    <DialogTitle>{pharmacy ? "Edit Pharmacy" : "Add New Pharmacy"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right">
                                Name
                            </label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="contact_info" className="text-right">
                                Phone
                            </label>
                            <Input id="contact_info" type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="location" className="text-right">
                                Location
                            </label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{pharmacy ? "Update" : "Add"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
