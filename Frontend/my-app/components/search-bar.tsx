"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useLanguage()

  const handleSearch = () => {
    // Implement global search functionality here
    console.log("Searching for:", searchTerm)
  }

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder={t("search.placeholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Button onClick={handleSearch}>{t("search.button")}</Button>
    </div>
  )
}

