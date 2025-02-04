export interface Drug {
  id: string
  name: string
  type: string
  price: number
  image: string
  total_quantity: number
  current_quantity: number
  min_quantity: number
  description: string
  manufacturer: string
  supplier: string
}

export const mockDrugs: Drug[] = [
  {
    id: "1",
    name: "Aspirin",
    type: "Pain Reliever",
    price: 5.99,
    image: "/placeholder.svg?height=100&width=100",
    total_quantity: 1000,
    current_quantity: 750,
    min_quantity: 100,
    description: "Common pain reliever and fever reducer.",
    manufacturer: "Bayer",
    supplier: "PharmaDist Inc.",
  },
  {
    id: "2",
    name: "Amoxicillin",
    type: "Antibiotic",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
    total_quantity: 500,
    current_quantity: 300,
    min_quantity: 50,
    description: "Antibiotic used to treat bacterial infections.",
    manufacturer: "Pfizer",
    supplier: "MedSupply Co.",
  },
  {
    id: "3",
    name: "Lisinopril",
    type: "ACE Inhibitor",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    total_quantity: 800,
    current_quantity: 600,
    min_quantity: 80,
    description: "Used to treat high blood pressure and heart failure.",
    manufacturer: "AstraZeneca",
    supplier: "HealthCare Logistics",
  },
]

