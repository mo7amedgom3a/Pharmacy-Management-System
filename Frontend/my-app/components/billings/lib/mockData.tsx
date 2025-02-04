export interface Pharmacy {
  id: string
  name: string
}

export interface Drug {
  id: string
  name: string
  type: string
  image: string
  description: string
  manufacturer: string
  price: number
  current_quantity: number
}

export interface BillingRow {
  id: string
  customerName: string
  totalAmount: number
  paidAmount: number
  drugs: Drug[]
}

export const pharmacies: Pharmacy[] = [
  { id: "1", name: "City Pharmacy" },
  { id: "2", name: "Health Plus" },
  { id: "3", name: "MediCare" },
]

export const billingData: Record<string, BillingRow[]> = {
  "1": [
    {
      id: "1",
      customerName: "John Doe",
      totalAmount: 150,
      paidAmount: 100,
      drugs: [
        {
          id: "1",
          name: "Aspirin",
          type: "Pain Reliever",
          image: "/placeholder.svg?height=100&width=100",
          description: "Common pain reliever and fever reducer.",
          manufacturer: "Bayer",
          price: 5,
          current_quantity: 100,
        },
        {
          id: "2",
          name: "Amoxicillin",
          type: "Antibiotic",
          image: "/placeholder.svg?height=100&width=100",
          description: "Antibiotic used to treat bacterial infections.",
          manufacturer: "Pfizer",
          price: 10,
          current_quantity: 50,
        },
      ],
    },
    {
      id: "2",
      customerName: "Jane Smith",
      totalAmount: 200,
      paidAmount: 200,
      drugs: [
        {
          id: "3",
          name: "Lisinopril",
          type: "ACE Inhibitor",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to treat high blood pressure and heart failure.",
          manufacturer: "AstraZeneca",
          price: 15,
          current_quantity: 75,
        },
        {
          id: "4",
          name: "Metformin",
          type: "Antidiabetic",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to treat type 2 diabetes.",
          manufacturer: "Merck",
          price: 8,
          current_quantity: 120,
        },
      ],
    },
  ],
  "2": [
    {
      id: "3",
      customerName: "Bob Johnson",
      totalAmount: 75,
      paidAmount: 50,
      drugs: [
        {
          id: "5",
          name: "Ibuprofen",
          type: "NSAID",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to reduce fever and treat pain or inflammation.",
          manufacturer: "Johnson & Johnson",
          price: 6,
          current_quantity: 200,
        },
        {
          id: "6",
          name: "Omeprazole",
          type: "Proton Pump Inhibitor",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to treat certain stomach and esophagus problems.",
          manufacturer: "AstraZeneca",
          price: 12,
          current_quantity: 80,
        },
      ],
    },
  ],
  "3": [
    {
      id: "4",
      customerName: "Alice Brown",
      totalAmount: 180,
      paidAmount: 180,
      drugs: [
        {
          id: "7",
          name: "Atorvastatin",
          type: "Statin",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to lower cholesterol and reduce the risk of heart disease.",
          manufacturer: "Pfizer",
          price: 20,
          current_quantity: 60,
        },
        {
          id: "8",
          name: "Levothyroxine",
          type: "Thyroid Hormone",
          image: "/placeholder.svg?height=100&width=100",
          description: "Used to treat hypothyroidism.",
          manufacturer: "Abbott Laboratories",
          price: 15,
          current_quantity: 90,
        },
      ],
    },
  ],
}

