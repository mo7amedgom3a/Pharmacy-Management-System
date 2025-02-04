export interface Pharmacy {
    id: number
    name: string
    phone: string
    location: string
  }
  
  export const pharmaciesData: Pharmacy[] = [
    { id: 1, name: "Central Pharmacy", phone: "123-456-7890", location: "123 Main St, Anytown, USA" },
    { id: 2, name: "Downtown Drugstore", phone: "234-567-8901", location: "456 Elm St, Othertown, USA" },
    { id: 3, name: "Westside Wellness", phone: "345-678-9012", location: "789 Oak St, Anothercity, USA" },
  ]
  
  export interface Supplier {
    id: number
    name: string
    phone: string
    location: string
  }
  
  export const suppliersData: Supplier[] = [
    { id: 1, name: "MediCorp Supplies", phone: "123-456-7890", location: "123 Pharma St, Medville, USA" },
    { id: 2, name: "HealthTech Distributors", phone: "234-567-8901", location: "456 Health Ave, Welltown, USA" },
    { id: 3, name: "BioMed Solutions", phone: "345-678-9012", location: "789 Bio Blvd, Lifecity, USA" },
  ]
  
  