"use client"

import { useState, useEffect } from "react"
import { Pharmacy, fetchPharmacies } from "../pharmacy/api/pharmacy"
import { Inventory, fetchInventoryByPharmacy } from "../inventory/api/inventory"
import { Drug, getDrugsByInventoryId } from "../drugs/api/drug"
import { Transaction, getTransactionByDrug, getTransactionByInventory, getTransactionByPharmacy, createTransaction } from "./api/transaction"
import { PharmacySelector } from "../inventory/PharmacySelector"
import { TransactionsTable } from "./TransactionsTable"
import { InventorySelector } from "./inventorySelector"
import { TransactionModal } from "./TransactionModal"
import { DrugSelector } from "./DrugSelector"
import { TransactionCreate } from "./api/transaction"
import { Button } from "@/components/ui/button"

import { useLanguage } from "@/contexts/LanguageContext"

export default function PharmacyTransaction() {
  const { t } = useLanguage()
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)
  const [drugs, setDrugs] = useState<Drug[]>([])
  const [selectedDrug, setSelectedDrug] = useState<Drug>()
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // get all pharmacies
  useEffect(() => {
    fetchPharmacies().then(setPharmacies)
  }, [])
  // get all inventory by pharmacy
  useEffect(() => {
    if (selectedPharmacy) {
      fetchInventoryByPharmacy(selectedPharmacy.pharmacy_id).then(setInventory)
    }
  }, [selectedPharmacy])

  // get all drugs by inventory
  useEffect(() => {
    if (selectedInventory) {
      getDrugsByInventoryId(selectedInventory.inventory_id).then(setDrugs)
    }
  }, [selectedInventory])

  // get all transactions by pharmacy
  useEffect(() => {
    if (selectedPharmacy) {
      getTransactionByPharmacy(selectedPharmacy.pharmacy_id).then(setTransactions)
    }
  }, [selectedPharmacy])

  const filteredInventory = inventory.filter((item) => item.inventory_id === selectedInventory?.inventory_id)
  const transactionsByDrug = transactions.filter((transaction) => transaction.drug_id === selectedDrug?.drug_id)

  const handleAddTransaction = (transaction: TransactionCreate) => {
    // map transaction create to transaction
    if (!selectedDrug || !selectedInventory || !selectedPharmacy) {
      console.error("Selected drug, inventory, or pharmacy is missing");
      return;
    }

    const newTransaction: Transaction = {
      transaction_id: Date.now(), // or any other unique id generation logic
      ...transaction,
      drug_id: selectedDrug.drug_id,
      inventory_id: selectedInventory.inventory_id,
      pharmacy_id: selectedPharmacy.pharmacy_id,
    }
   
    createTransaction(newTransaction).then((newTransaction) => {
      setTransactions([...transactions, newTransaction])
    })
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
            <InventorySelector inventory={inventory} selectedDrug={selectedInventory} onSelectDrug={setSelectedInventory} />
          </div>
        )}
      </div>
      {selectedPharmacy && selectedInventory && (
        <div className="mb-4">
          <label className="block mb-2">{t("Select Drug")}</label>
          <DrugSelector drugs={drugs} selectedDrug={selectedDrug} onSelectDrug={setSelectedDrug} />
          <Button onClick={() => setIsModalOpen(true)}>{t("Add Transaction")}</Button>
        </div>
      )}
      {selectedDrug && (
        <div className="mb-4">
          <TransactionsTable transactions={transactionsByDrug} drug={selectedDrug}/>
        </div>
      )}
      {isModalOpen && selectedPharmacy && selectedDrug && (
        <TransactionModal
          onSave={handleAddTransaction}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
        />
      )}
    </div>
  )
}
