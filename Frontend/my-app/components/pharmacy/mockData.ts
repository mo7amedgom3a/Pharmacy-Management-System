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