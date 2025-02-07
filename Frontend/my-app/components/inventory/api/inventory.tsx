import { PORT, HOST } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";
import { Drug } from "@/components/drugs/api/drug";

export interface Inventory {
    inventory_id: number;
    name: string;
    pharmacy_id: number;   
}
export interface CreateInventoryinterface {
    name: string;
    pharmacy_id: number;
}

const API_BASE_URL = `http://${HOST}:${PORT}/inventory`;

export const fetchAllInventory = async (): Promise<Inventory[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch inventory');
    }
    return response.json();
};

export const fetchInventoryById = async (inventory_id: number): Promise<Inventory> => {
    const response = await fetch(`${API_BASE_URL}/${inventory_id}`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch inventory');
    }
    return response.json();
};

export const createInventory = async (inventory: CreateInventoryinterface): Promise<Inventory> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(inventory)
    });
    if (!response.ok) {
        throw new Error('Failed to create inventory');
    }
    return response.json();
};

export const updateInventory = async (inventory_id: number, inventory: Partial<Inventory>): Promise<Inventory> => {
    const response = await fetch(`${API_BASE_URL}/${inventory_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(inventory)
    });
    if (!response.ok) {
        throw new Error('Failed to update inventory');
    }
    return response.json();
};

export const deleteInventory = async (inventory_id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/${inventory_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to delete inventory');
    }
    return response.json();
};

export const fetchInventoryByPharmacy = async (pharmacy_id: number): Promise<Inventory[]> => {
    const response = await fetch(`${API_BASE_URL}/pharmacy/${pharmacy_id}`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch inventory by pharmacy');
    }
    return response.json();
};