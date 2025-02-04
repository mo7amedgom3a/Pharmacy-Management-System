import { SearchBar } from "@/components/search-bar"
import { LowStockAlert } from "@/components/low-stock-alert"

export default function DashboardOverview() {
  return (
    <div className="flex-left space-y-4 h-screen bg-gray-10 p-4">
      
      <SearchBar />
      <LowStockAlert />
    </div>
  )
}

