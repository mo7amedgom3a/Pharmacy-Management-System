import { useState, useEffect } from "react"
import type { Employee } from "./mockData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"

interface EmployeeModalProps {
    employee: Employee | null
    onSave: (employee: Employee) => void
    onClose: () => void
    pharmacyId: number
}

export function EmployeeModal({ employee, onSave, onClose, pharmacyId }: EmployeeModalProps) {
    const { t } = useLanguage()

    const [formData, setFormData] = useState<Employee>({
        id: employee?.id || 0,
        pharmacyId,
        name: "",
        role: "",
        phone: "",
        salary: 0,
        address: "",
        username: "",
        password: "",
    })

    useEffect(() => {
        if (employee) {
            setFormData(employee)
        }
    }, [employee])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === "salary" ? Number(value) : value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{employee ? t("employees.title") : t("employees.title")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right">
                                {t("employees.name")}
                            </label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="role" className="text-right">
                                {t("employees.role")}
                            </label>
                            <Input id="role" name="role" value={formData.role} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="phone" className="text-right">
                                {t("employees.phone")}
                            </label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="salary" className="text-right">
                                {t("employees.salary")}
                            </label>
                            <Input
                                id="salary"
                                name="salary"
                                type="number"
                                value={formData.salary}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="address" className="text-right">
                                {t("employees.address")}
                            </label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-right">
                                {t("employees.username")}
                            </label>
                            <Input
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="password" className="text-right">
                                {t("employees.password")}
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{employee ? t("employees.update") : t("employees.save")}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
