from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.inventory_transactions import TransactionBase
from crud.inventory_transactions import *
from models.inventory_transactions import Transaction

router = APIRouter(prefix="/inventory/transactions", tags=["Inventory Transactions"])
@router.post("/", response_model=Transaction, status_code=201)
async def create(transaction: TransactionBase, session: AsyncSession = Depends(get_session)) -> Transaction:
    return await create_transaction(transaction=transaction, session=session)

@router.get("/", response_model=list[Transaction], status_code=200)
async def get_alltransactions(session: AsyncSession = Depends(get_session)) -> list[Transaction]:
    return await get_all_transactions(session)

@router.get("/{transaction_id}", response_model=Transaction, status_code=200)
async def get_transactionById(transaction_id: int, session: AsyncSession = Depends(get_session)) -> Transaction:
    return await get_transaction(transaction_id=transaction_id, session=session)

@router.get("/pharmacy/{pharmacy_id}", response_model=list[Transaction], status_code=200)
async def get_transactionByPharmacy(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> list[Transaction]:
    return await get_transaction_by_pharmacy(pharmacy_id=pharmacy_id, session=session)

@router.get("/inventory/{inventory_id}", response_model=list[Transaction], status_code=200)
async def get_transactionByInventory(inventory_id: int, session: AsyncSession = Depends(get_session)) -> list[Transaction]:
    return await get_transaction_by_inventory(inventory_id=inventory_id, session=session)

# get transactions by drug id
@router.get("/drug/{drug_id}", response_model=list[Transaction], status_code=200)
async def get_transactionByDrug(drug_id: int, session: AsyncSession = Depends(get_session)) -> list[Transaction]:
    return await get_transaction_by_drug(drug_id=drug_id, session=session)
