export interface Pharmacy {
    id: number
    name: string
  }
  
  export interface InventoryItem {
    id: number
    pharmacyId: number
    drugName: string
    totalQuantity: number
    currentQuantity: number
    price: number
    minimumQuantity: number
  }
  
  export const pharmacies: Pharmacy[] = [
    { id: 1, name: "Central Pharmacy" },
    { id: 2, name: "Downtown Drugstore" },
    { id: 3, name: "Westside Wellness" },
  ]
  
  export const inventoryData: InventoryItem[] = [
    {
      id: 1,
      pharmacyId: 1,
      drugName: "Aspirin",
      totalQuantity: 1000,
      currentQuantity: 850,
      price: 5.99,
      minimumQuantity: 100,
    },
    {
      id: 2,
      pharmacyId: 1,
      drugName: "Ibuprofen",
      totalQuantity: 800,
      currentQuantity: 600,
      price: 7.99,
      minimumQuantity: 80,
    },
    {
      id: 3,
      pharmacyId: 2,
      drugName: "Amoxicillin",
      totalQuantity: 500,
      currentQuantity: 450,
      price: 12.99,
      minimumQuantity: 50,
    },
    {
      id: 4,
      pharmacyId: 2,
      drugName: "Lisinopril",
      totalQuantity: 300,
      currentQuantity: 275,
      price: 15.99,
      minimumQuantity: 30,
    },
    {
      id: 5,
      pharmacyId: 3,
      drugName: "Metformin",
      totalQuantity: 600,
      currentQuantity: 550,
      price: 8.99,
      minimumQuantity: 60,
    },
    {
      id: 6,
      pharmacyId: 3,
      drugName: "Simvastatin",
      totalQuantity: 400,
      currentQuantity: 380,
      price: 11.99,
      minimumQuantity: 40,
    },
  ]
  
  