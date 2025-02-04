"use client"

import { useState } from "react"
import { pharmacies, employeesData, type Pharmacy, type Employee } from "./mockData"
import { PharmacySelector } from "./PharmacySelector"
import { EmployeeTable } from "./EmployeeTable"
import { EmployeeModal } from "./EmployeeModal"
import { Button } from "@/components/ui/button"

export default function PharmacyEmployeeManagement() {
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(pharmacies[0] || null)
    const [employees, setEmployees] = useState<Employee[]>(employeesData)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

    const filteredEmployees = selectedPharmacy
        ? employees.filter((employee) => employee.pharmacyId === selectedPharmacy.id)
        : []

    const handleAddEmployee = (newEmployee: Employee) => {
        setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }])
        setIsModalOpen(false)
    }

    const handleEditEmployee = (updatedEmployee: Employee) => {
        setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)))
        setIsModalOpen(false)
        setEditingEmployee(null)
    }

    const handleDeleteEmployee = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id))
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <PharmacySelector
                    pharmacies={pharmacies}
                    selectedPharmacy={selectedPharmacy}
                    onSelectPharmacy={setSelectedPharmacy}
                />
            </div>
            {selectedPharmacy && (
                <>
                    <Button onClick={() => setIsModalOpen(true)} className="mb-4">
                        Add New Employee
                    </Button>
                    <EmployeeTable
                        employees={filteredEmployees}
                        onEdit={(employee) => {
                            setEditingEmployee(employee)
                            setIsModalOpen(true)
                        }}
                        onDelete={handleDeleteEmployee}
                    />
                </>
            )}
            {isModalOpen && selectedPharmacy && (
                <EmployeeModal
                    employee={editingEmployee}
                    onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingEmployee(null)
                    }}
                    pharmacyId={selectedPharmacy.id}
                />
            )}
        </div>
    )
}
