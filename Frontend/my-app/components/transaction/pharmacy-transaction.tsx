"use client"

import { useState, useEffect } from "react"
import {
  pharmacies,
  inventoryData,
  transactionsData,
  type Pharmacy,
  type InventoryItem,
  type Transaction,
} from "./mockData"
import { PharmacySelector } from "../inventory/PharmacySelector"
import { DrugSelector } from "./DrugSelector"
import { TransactionsTable } from "./TransactionsTable"
import { TransactionModal } from "./TransactionModal"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export default function PharmacyTransaction() {
  const { t } = useLanguage()
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(pharmacies[0] || null)
  const [selectedDrug, setSelectedDrug] = useState<InventoryItem | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData)
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    if (selectedPharmacy) {
      const firstInventoryItem = inventoryData.find(item => item.pharmacyId === selectedPharmacy.id) || null
      setSelectedDrug(firstInventoryItem)
    }
  }, [selectedPharmacy])

  const filteredInventory = selectedPharmacy ? inventory.filter((item) => item.pharmacyId === selectedPharmacy.id) : []

  const filteredTransactions =
    selectedPharmacy && selectedDrug
      ? transactions.filter(
          (transaction) =>
            transaction.pharmacyId === selectedPharmacy.id && transaction.inventoryItemId === selectedDrug.id,
        )
      : []

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((transaction) => (transaction.id === updatedTransaction.id ? updatedTransaction : transaction)),
    )
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block mb-2">{t("Select Pharmacy")}</label>
          <PharmacySelector
            pharmacies={pharmacies}
            selectedPharmacy={selectedPharmacy}
            onSelectPharmacy={setSelectedPharmacy}
          />
        </div>
        {selectedPharmacy && (
          <div>
            <label className="block mb-2">{t("Select Inventory")}</label>
            <DrugSelector inventory={filteredInventory} selectedDrug={selectedDrug} onSelectDrug={setSelectedDrug} />
          </div>
        )}
      </div>
      {selectedPharmacy && selectedDrug && (
        <>
          <Button onClick={() => setIsModalOpen(true)} className="my-4">
            {t("Add New Transaction")}
          </Button>
          <TransactionsTable
            transactions={filteredTransactions}
            inventory={inventory}
            onEdit={(transaction) => {
              setEditingTransaction(transaction)
              setIsModalOpen(true)
            }}
            onDelete={handleDeleteTransaction}
          />
        </>
      )}
      {isModalOpen && selectedPharmacy && selectedDrug && (
        <TransactionModal
          transaction={editingTransaction}
          onSave={editingTransaction ? handleEditTransaction : handleAddTransaction}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
          pharmacyId={selectedPharmacy.id}
          inventoryItemId={selectedDrug.id}
          inventory={filteredInventory}
        />
      )}
    </div>
  )
}
