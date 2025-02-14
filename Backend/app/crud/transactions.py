from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from schemas.inventory_transactions import TransactionBase
from models.inventory import Inventory
from models.inventory_transactions import Transaction
from fastapi import HTTPException, status
from typing import List
from models.drug import Drug
from models.inventory import Inventory
from models.pharmacy import Pharmacy
from models.employee import Employee
from crud.inventory import Inventory
from crud.drug import DrugCrud

class TransactionCrud:
    def __init__(self, session: AsyncSession):
        """Initialize InventoryTransactionCrud with a database session"""
        self.session = session

    async def create(self, transaction: TransactionBase) -> Transaction:
        """
        Create a new transaction and update the corresponding drug.
        """
        # Retrieve the inventory associated with the transaction
        inventory = await self.session.get(Inventory, transaction.inventory_id)
        if not inventory:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found.")

        # Retrieve the drug associated with the inventory
        drug = await self.session.execute(select(Drug).where(Drug.inventory_id == inventory.inventory_id and inventory.pharmacy_id == transaction.pharmacy_id))
        drug = drug.scalars().first()
        if not drug:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found.")

        if transaction.transaction_type == "IN":
            drug.current_quantity += transaction.quantity
        else:
            if drug.current_quantity < transaction.quantity:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough stock.")
            drug.current_quantity -= transaction.quantity

        # Create the transaction
        new_transaction = Transaction(**transaction.dict())
        self.session.add(new_transaction)

        # Commit the transaction
        await self.session.commit()
        await self.session.refresh(new_transaction)

        return new_transaction

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

    async def get_transaction_by_pharmacy(self, pharmacy_id: int) -> List[Transaction]:
    
        """Retrieve transactions by pharmacy ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.pharmacy_id == pharmacy_id))
        return result.scalars().all()

    async def get_transaction_by_inventory(self, inventory_id: int) -> List[Transaction]:
        """Retrieve transactions by inventory ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.inventory_id == inventory_id))
        return result.scalars().all()

    async def get_transaction__by_drug(self, drug_id: int) -> List[Transaction]:
        """Retrieve transactions by drug ID"""
        result = await self.session.execute(select(Transaction).where(Transaction.drug_id == drug_id))
        return result.scalars().all()
