import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TransactionCreate } from "./api/transaction"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/LanguageContext"

interface TransactionModalProps {
    transaction?: TransactionCreate
    onSave: (transaction: TransactionCreate) => void
    onClose: () => void
}

export function TransactionModal({
    transaction,
    onSave,
    onClose,
}: TransactionModalProps) {
    const [formData, setFormData] = useState<TransactionCreate>({
        transaction_type: "IN",
        quantity: 0,
    })

    useEffect(() => {
        if (transaction) {
            setFormData({
                transaction_type: transaction.transaction_type,
                quantity: transaction.quantity,
            })
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

    const { t } = useLanguage()
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? t("transactions.editTitle") : t("transactions.createTitle")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="transaction_type" className="text-right">
                                {t("transactions.type")}
                            </label>
                            <Select
                                onValueChange={(value) => setFormData({ ...formData, transaction_type: value })}
                                value={formData.transaction_type}
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
                    </div>
                    <DialogFooter>
                        <Button type="submit">{t("save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
