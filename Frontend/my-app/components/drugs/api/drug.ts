import { HOST, PORT } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";

export interface Drug {
    drug_id: number;
    name: string;
    type?: string;
    image_url?: string;
    barcode?: string;
    manufacturer?: string;
    description?: string;
    total_quantity: number;
    current_quantity: number;
    inventory_id: number;
    price_per_unit: number;
    min_quantity: number;
}

const API_BASE_URL = `http://${HOST}:${PORT}/drug`

export const getDrugs = async (): Promise<Drug[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch drugs");
    }
    return response.json();
};
export const getDrugsByPharmacyId = async (pharmacy_id: number): Promise<Drug[]> => {
    const response = await fetch(`${API_BASE_URL}/pharmacy/${pharmacy_id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch drugs by pharmacy ID");
    }
    return response.json();
};

export const getDrugById = async (drug_id: number): Promise<Drug> => {
    const response = await fetch(`${API_BASE_URL}/${drug_id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch drug");
    }
    return response.json();
};

export const createDrug = async (drug: Drug): Promise<Drug> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(drug),
    });
    if (!response.ok) {
        throw new Error("Failed to create drug");
    }
    return response.json();
};

export const updateDrug = async (drug_id: number, drug: Drug): Promise<Drug> => {
    const response = await fetch(`${API_BASE_URL}/${drug_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(drug),
    });
    if (!response.ok) {
        throw new Error("Failed to update drug");
    }
    return response.json();
};

export const deleteDrug = async (drug_id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE_URL}/${drug_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete drug");
    }
    return response.json();
};

export const getDrugsByInventoryId = async (inventory_id: number): Promise<Drug[]> => {
    const response = await fetch(`${API_BASE_URL}/inventory/${inventory_id}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch drugs by inventory ID");
    }
    return response.json();
};

export const searchDrug = async (query: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/search/${query}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to search drug");
    }
    return response.json();
};
