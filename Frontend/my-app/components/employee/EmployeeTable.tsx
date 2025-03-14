import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Employee } from "./api/employee"
import DeleteDialog from "../DeleteDialog"
import { useState, useEffect } from "react"
import { isAdmin } from "@/hooks/useAuth"
interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: number) => void
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  const { t } = useLanguage()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee.employee_id)
      setIsDeleteDialogOpen(false)
      setSelectedEmployee(null)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
    setSelectedEmployee(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("employees.name")}</TableHead>
            <TableHead>{t("employees.phone")}</TableHead>
            <TableHead>{t("employees.salary")}</TableHead>
            <TableHead>{t("employees.address")}</TableHead>
            <TableHead>{t("Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.employee_id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>${employee.salary.toLocaleString()}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>
                <Button onClick={() => onEdit(employee)} variant="outline" className="mr-2">
                  {t("edit")}
                </Button>
                {isAdmin(authToken) && <Button onClick={() => handleDeleteClick(employee)} variant="outline">
                  {t("delete")}
                </Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDeleteDialogOpen && selectedEmployee && (
        <DeleteDialog

          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  )
}
