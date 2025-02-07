"use client"

import { useState, useEffect } from "react"
import { PharmacySelector } from "./PharmacySelector"
import { Employee, fetchEmployeesByPharmacyId, registerEmployee, updateEmployee, deleteEmployee, EmployeeCreate } from "./api/employee"
import { EmployeeTable } from "./EmployeeTable"
import { EmployeeModal } from "./EmployeeModal"
import { Button } from "@/components/ui/button"
import { UserRegistrationModal } from "./EmployeeCreate"
import { useLanguage } from "@/contexts/LanguageContext"
import {Pharmacy, fetchPharmacies } from "../pharmacy/api/pharmacy"

export default function PharmacyEmployeeManagement() {
    const { t } = useLanguage()
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>()
    const [employees, setEmployees] = useState<Employee[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

    // fetch pharmacies
    useEffect(() => {
        fetchPharmacies().then(setPharmacies)
    }, [])
    
    // Filter employees by pharmacy
    useEffect(() => {
        if (selectedPharmacy) {
            fetchEmployeesByPharmacyId(selectedPharmacy.pharmacy_id).then(setEmployees)
        }
    }, [selectedPharmacy])

    const handleAddEmployee = (employee: EmployeeCreate) => {
        registerEmployee(employee).then((newEmployee) => {
            setEmployees([...(employees || []), newEmployee])
        })
        setIsModalOpen(false)
    }

    const handleEditEmployee = (employee: Employee) => {
        if (!editingEmployee) return
        updateEmployee(editingEmployee.employee_id, employee).then((updatedEmployee) => {
            setEmployees((employees || []).map((e) => (e.employee_id === updatedEmployee.employee_id ? updatedEmployee : e)))
        })
        setIsModalOpen(false)
    }

    const handleDeleteEmployee = (employee_id: number) => {
        deleteEmployee(employee_id).then(() => {
            setEmployees((employees || []).filter((e) => e.employee_id !== employee_id))
        })
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
            <PharmacySelector
                pharmacies={pharmacies || []}
                selectedPharmacy={selectedPharmacy}
                onSelectPharmacy={setSelectedPharmacy}
            />
            </div>
            {selectedPharmacy && (
            <>
                <Button onClick={() => {
                setEditingEmployee(null)
                setIsModalOpen(true)
                }} className="mb-4">
                {t("Add New Employee")}
                </Button>
                <EmployeeTable
                employees={employees}
                onEdit={(employee) => {
                    setEditingEmployee(employee)
                    setIsModalOpen(true)
                }}
                onDelete={handleDeleteEmployee}
                />
            </>
            )}
            {isModalOpen && selectedPharmacy && (
            editingEmployee ? (
                <EmployeeModal
                employee={editingEmployee}
                onSave={handleEditEmployee}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingEmployee(null)
                }}
                pharmacyId={selectedPharmacy.pharmacy_id}
                />
            ) : (
                <UserRegistrationModal
                employee={null}
                onSave={handleAddEmployee}
                onClose={() => {
                    setIsModalOpen(false)
                    setEditingEmployee(null)
                }}
                pharmacyId={selectedPharmacy.pharmacy_id}
                />
            )
            )}
        </div>
    )
}
