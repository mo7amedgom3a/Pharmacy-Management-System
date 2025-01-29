from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from schemas.inventory_transactions import TransactionBase
from models.inventory import Inventory
from models.inventory_transactions import Transaction

async def create_transaction(session: AsyncSession, transaction: TransactionBase) -> Transaction:
    """
    Create a new transaction and update the corresponding inventory.
    """
    # Fetch the inventory record
    inventory = await session.get(Inventory, transaction.inventory_id)
    # map the TransactionCreate object to the Transaction model
    transaction = Transaction.model_validate(transaction)
    if not inventory:
        raise ValueError("Inventory record not found.")
    try:
        if transaction.transaction_type == "IN":
            inventory.current_quantity += transaction.quantity
        elif transaction.transaction_type == "OUT":
            inventory.current_quantity -= transaction.quantity
        else:
            raise ValueError("Invalid transaction type.")
    except ValueError as e:
        raise e
    
    # Save the transaction and update the inventory
    session.add(transaction)
    session.add(inventory)
    await session.commit()
    await session.refresh(transaction)

    return transaction

async def get_all_transactions(session: AsyncSession) -> list[Transaction]:
    """
    Get all transactions
    """
    transactions = await session.execute(select(Transaction))
    return transactions.scalars().all()

async def get_transaction(transaction_id: int, session: AsyncSession) -> Transaction:
    """
    Get a transaction by id
    """
    transaction = await session.get(Transaction, transaction_id)
    return transaction

async def get_transaction_by_pharmacy(pharmacy_id: int, session: AsyncSession) -> list[Transaction]:
    """
    Get all transactions by pharmacy id
    """
    transactions = await session.execute(select(Transaction).where(Transaction.pharmacy_id == pharmacy_id))
    return transactions.scalars().all()

async def get_transaction_by_inventory(inventory_id: int, session: AsyncSession) -> list[Transaction]:
    """
    Get all transactions by inventory id
    """
    transactions = await session.execute(select(Transaction).where(Transaction.inventory_id == inventory_id))
    return transactions.scalars().all()

async def get_transaction_by_drug(drug_id: int, session: AsyncSession) -> list[Transaction]:
    """
    Get all transactions by drug id
    """
    transactions = await session.execute(select(Transaction).where(Transaction.drug_id == drug_id))
    return transactions.scalars().all()