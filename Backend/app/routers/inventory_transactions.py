from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.inventory_transactions import TransactionBase
from crud.inventory_transactions import InventoryTransactionCrud
from models.inventory_transactions import Transaction
from typing import List

router = APIRouter(prefix="/inventory/transactions", tags=["Inventory Transactions"])

# Dependency Injection for InventoryTransactionCrud
async def get_transaction_crud(session: AsyncSession = Depends(get_session)):
    return InventoryTransactionCrud(session)

@router.post("/", response_model=Transaction, status_code=201)
async def create_transaction(transaction: TransactionBase, transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> Transaction:
    return await transaction_crud.create(transaction)

@router.get("/", response_model=List[Transaction], status_code=200)
async def get_all_transactions(transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> List[Transaction]:
    return await transaction_crud.get_all()

@router.get("/{transaction_id}", response_model=Transaction, status_code=200)
async def get_transaction_by_id(transaction_id: int, transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> Transaction:
    return await transaction_crud.get_by_id(transaction_id)

@router.get("/pharmacy/{pharmacy_id}", response_model=List[Transaction], status_code=200)
async def get_transaction_by_pharmacy(pharmacy_id: int, transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> List[Transaction]:
    return await transaction_crud.get_by_pharmacy(pharmacy_id)

@router.get("/inventory/{inventory_id}", response_model=List[Transaction], status_code=200)
async def get_transaction_by_inventory(inventory_id: int, transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> List[Transaction]:
    return await transaction_crud.get_by_inventory(inventory_id)

@router.get("/drug/{drug_id}", response_model=List[Transaction], status_code=200)
async def get_transaction_by_drug(drug_id: int, transaction_crud: InventoryTransactionCrud = Depends(get_transaction_crud)) -> List[Transaction]:
    return await transaction_crud.get_by_drug(drug_id)
