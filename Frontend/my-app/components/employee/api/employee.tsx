import { PORT, HOST } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";
export interface Employee {
    employee_id: number;
    pharmacy_id: number;
    name: string;
    role: string;
    phone?: string;
    salary: number;
    address: string;
}
export interface EmployeeCreate extends Employee {
    username: string;
    password: string;
}

const EMPLOYEE_BASE_URL = `http://${HOST}:${PORT}/employee`;

export const fetchEmployeeUser = async (employee_id: number): Promise<Employee> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}/user/${employee_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch employee user");
    }
    return await response.json();
};
export const fetchAllEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }
    return await response.json();
};

export const fetchEmployeeById = async (employee_id: number): Promise<Employee> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}/${employee_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch employee");
    }
    return await response.json();
};
export const updateEmployee = async (employee_id: number, employee: Partial<Employee>): Promise<Employee> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}/${employee_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(employee)
    });
    if (!response.ok) {
        throw new Error("Failed to update employee");
    }
    return await response.json();
};
export const deleteEmployee = async (employee_id: number): Promise<boolean> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}/${employee_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
    return await response.json();
};

export const fetchEmployeesByPharmacyId = async (pharmacy_id: number): Promise<Employee[]> => {
    const response = await fetch(`${EMPLOYEE_BASE_URL}/pharmacy/${pharmacy_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch employees by pharmacy ID");
    }
    return await response.json();
};

export const registerEmployee = async (employee: EmployeeCreate): Promise<Employee> => {
    const response = await fetch(`http://${HOST}:${PORT}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(employee)
    });
    if (!response.ok) {
        throw new Error("Failed to register employee");
    }
    return await response.json();
};