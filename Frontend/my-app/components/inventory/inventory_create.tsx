import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createInventory, CreateInventoryinterface } from "./api/inventory";
import { Button } from "@/components/ui/button";

interface InventoryCreateDialogProps {
    pharmacyId: number;
    onClose: () => void;
    onSave: (inventory: CreateInventoryinterface) => void;
}

export function InventoryCreateDialog({ pharmacyId, onClose, onSave }: InventoryCreateDialogProps) {
    const [formData, setFormData] = useState<CreateInventoryinterface>({
        name: "",
        pharmacy_id: pharmacyId,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newInventory = await createInventory(formData);
        onSave(newInventory);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Inventory</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Inventory Name */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right">
                                Inventory Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    {/* Save Button */}
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
