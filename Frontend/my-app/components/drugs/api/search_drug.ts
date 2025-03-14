import { HOST, PORT } from "@/config";

export interface searchDrug {
    salary: string;
    uses_text: string;
    title: string;
    image: string;
    barcode: string;
    drug_images: string[];
}
const API_BASE_URL = `http://${HOST}:${PORT}/search`;
export async function searchDrugByName(drugName: string): Promise<searchDrug> {
    console.log("hello")
   
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(drugName)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        
    return response.json();

}

