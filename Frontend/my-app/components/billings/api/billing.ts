import { HOST, PORT } from "@/config";
import { getAuthToken } from "@/hooks/useAuth";

export interface Billing {
    billing_id: number;
    pharmacy_id: number;
    
}