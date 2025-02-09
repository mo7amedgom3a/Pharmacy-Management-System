import { PORT, HOST } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";
export interface TransactionCreate {
    transaction_type: string;
    quantity: number;
}
export interface Transaction {
    transaction_id: number;
    pharmacy_id: number;
    inventory_id: number;
    drug_id?: number;
    transaction_type: string;
    quantity: number;
    transaction_date: string;
}

const TRANSACTION_BASE_URL = `http://${HOST}:${PORT}/inventory/transactions`;

export const createTransaction = async (transaction: Transaction) => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(transaction)
    });
    return response.json();
};

export const getAllTransactions = async () => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    return response.json();
};

export const getTransactionById = async (transaction_id: number) => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/${transaction_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    return response.json();
};

export const getTransactionByPharmacy = async (pharmacy_id: number) => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/pharmacy/${pharmacy_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    return response.json();
};

export const getTransactionByInventory = async (inventory_id: number) => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/inventory/${inventory_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    return response.json();
};

export const getTransactionByDrug = async (drug_id: number) => {
    const response = await fetch(`${TRANSACTION_BASE_URL}/drug/${drug_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    return response.json();
};