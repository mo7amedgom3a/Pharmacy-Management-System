import { HOST, PORT } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";
import { Drug } from "@/components/drugs/api/drug";
export interface Billing {
    billing_id: number;
    pharmacy_id?: number;
    customer_name: string;
    total_amount: number;
    paid_amount: number;
    drug_id?: number;
    quantity: number;
    price: number;
}
const BILLING_API_URL = `http://${HOST}:${PORT}/billing`;

export const getAllBilling = async (): Promise<Billing[]> => {
    const authToken = getAuthToken();
    const response = await fetch(BILLING_API_URL, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.json();
};
export const getDrugsByBilling = async (billing_id: number): Promise<Drug[]> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/${billing_id}/drugs`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.json();
};
export const getBillingById = async (billing_id: number): Promise<Billing> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/${billing_id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.json();
};

export const getBillingByName = async (name: string): Promise<Billing[]> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/name/${name}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.json();
};

export const getBillingByPharmacy = async (pharmacy_id: number): Promise<Billing[]> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/pharmacy/${pharmacy_id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.json();
};

export const createBilling = async (billing: Billing): Promise<Billing> => {
    const authToken = getAuthToken();
    const response = await fetch(BILLING_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(billing)
    });
    return response.json();
};

export const updateBilling = async (billing_id: number, billing: Billing): Promise<Billing> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/${billing_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(billing)
    });
    return response.json();
};

export const deleteBilling = async (billing_id: number): Promise<boolean> => {
    const authToken = getAuthToken();
    const response = await fetch(`${BILLING_API_URL}/${billing_id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.ok;
};