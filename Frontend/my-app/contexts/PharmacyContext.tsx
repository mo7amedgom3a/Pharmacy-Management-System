import React, { createContext, useState, useContext, ReactNode } from "react"
import { Pharmacy } from "../components/pharmacy/api/pharmacy"

interface PharmacyContextProps {
  selectedPharmacy: Pharmacy | null
  setSelectedPharmacy: (pharmacy: Pharmacy | null) => void
}

const PharmacyContext = createContext<PharmacyContextProps | undefined>(undefined)

export const PharmacyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)

  return (
    <PharmacyContext.Provider value={{ selectedPharmacy, setSelectedPharmacy }}>
      {children}
    </PharmacyContext.Provider>
  )
}

export const usePharmacy = () => {
  const context = useContext(PharmacyContext)
  if (!context) {
    throw new Error("usePharmacy must be used within a PharmacyProvider")
  }
  return context
}