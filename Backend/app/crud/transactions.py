from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from schemas.inventory_transactions import TransactionBase
from models.inventory import Inventory
from models.inventory_transactions import Transaction
from fastapi import HTTPException, status
from typing import List
from models.employee import Employee

class TransactionCrud:
    def __init__(self, session: AsyncSession):
        """Initialize InventoryTransactionCrud with a database session"""
        self.session = session

    async def create(self, transaction: TransactionBase) -> Transaction:
        """
        Create a new transaction and update the corresponding inventory.
        """
        # Fetch the inventory record
        inventory = await self.session.get(Inventory, transaction.inventory_id)
        if not inventory:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory record not found.")

        # Create transaction instance
        transaction_instance = Transaction(**transaction.model_dump())

        try:
            if transaction.transaction_type == "IN":
                inventory.current_quantity += transaction.quantity
            elif transaction.transaction_type == "OUT":
                if inventory.current_quantity < transaction.quantity:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Insufficient inventory for transaction."
                    )
                inventory.current_quantity -= transaction.quantity
            else:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid transaction type.")
        except HTTPException as e:
            raise e

        # Save transaction and update inventory
        self.session.add(transaction_instance)
        self.session.add(inventory)
        await self.session.commit()
        await self.session.refresh(transaction_instance)

        return transaction_instance

    async def get_all(self) -> List[Transaction]:
        """Retrieve all transactions"""
        result = await self.session.execute(select(Transaction))
        return result.scalars().all()

    async def get_by_id(self, transaction_id: int) -> Transaction:
        """Retrieve a transaction by ID"""
        transaction = await self.session.get(Transaction, transaction_id)
        if not transaction:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found.")
        return transaction

    async def get_by_pharmacy(self, pharmacy_id: int) -> List[Transaction]:
        """Retrieve transactions by pharmacy ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.pharmacy_id == pharmacy_id))
        return result.scalars().all()

    async def get_by_inventory(self, inventory_id: int) -> List[Transaction]:
        """Retrieve transactions by inventory ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.inventory_id == inventory_id))
        return result.scalars().all()

    async def get_by_drug(self, drug_id: int) -> List[Transaction]:
        """Retrieve transactions by drug ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.drug_id == drug_id))
        return result.scalars().all()
