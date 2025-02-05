import { PORT, HOST } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";
export interface Supplier {
    supplier_id: number;
    name: string;
    address: string;
    contact_info: string;
}

const API_BASE_URL = `http://${HOST}:${PORT}/supplier`;



export const getSuppliers = async (): Promise<Supplier[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch suppliers');
    }
    return await response.json();
};

export const getSupplierById = async (supplier_id: number): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}/${supplier_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch supplier');
    }
    return await response.json();
};

export const createSupplier = async (supplier: Supplier): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplier)
    });
    if (!response.ok) {
        throw new Error('Failed to create supplier');
    }
    return await response.json();
};

export const updateSupplier = async (supplier_id: number, supplier: Supplier): Promise<Supplier> => {
    const response = await fetch(`${API_BASE_URL}/${supplier_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(supplier)
    });
    if (!response.ok) {
        throw new Error('Failed to update supplier');
    }
    return await response.json();
};

export const deleteSupplier = async (supplier_id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/${supplier_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete supplier');
    }
    return await response.json();
};