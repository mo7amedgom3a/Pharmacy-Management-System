import { PORT, HOST } from "@/config"
import { getAuthToken } from "@/hooks/useAuth"
export interface Pharmacy {
    pharmacy_id: number
    name: string
    location: string
    contact_info: string
}

const API_BASE_URL = `http://${HOST}:${PORT}/pharmacy`


export const fetchPharmacies = async (): Promise<Pharmacy[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,

        },
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const fetchPharmacy = async (id: number): Promise<Pharmacy> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const createPharmacy = async (pharmacy: Omit<Pharmacy, 'pharmacy_id'>) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(pharmacy),
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const updatePharmacy = async (pharmacy: Pharmacy) => {
    const response = await fetch(`${API_BASE_URL}/${pharmacy.pharmacy_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(pharmacy),
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export const deletePharmacy = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}
