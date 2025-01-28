from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.supplier import SupplierCreate
from crud.supplier import *
from typing import List, Optional
router = APIRouter(prefix="/supplier", tags=["Supplier"])

# Get all suppliers
@router.get("/", response_model=List[Supplier], status_code=200)
async def get_suppliers(session: AsyncSession = Depends(get_session)) -> List[Supplier]:
    return await get_all_suppliers(session)


# Get supplier by id
@router.get("/{supplier_id}", response_model=Supplier, status_code=200)
async def get_supplierById(supplier_id: int, session: AsyncSession = Depends(get_session)) -> Supplier:
    return await get_supplier(supplier_id=supplier_id, session=session)


# Create a supplier
@router.post("/", response_model=Supplier, status_code=201)
async def create(supplier: SupplierCreate, session: AsyncSession = Depends(get_session)) -> Supplier:
    return await create_supplier(supplier=supplier, session=session)


# Update a supplier
@router.put("/{supplier_id}", response_model=Supplier, status_code=200)
async def update(supplier_id: int, supplier: SupplierCreate, session: AsyncSession = Depends(get_session)) -> Supplier:
    return await update_supplier(supplier_id=supplier_id,supplier=supplier, session=session)


# Delete a supplier
@router.delete("/{supplier_id}", response_model=bool, status_code=200)
async def delete(supplier_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_supplier(supplier_id=supplier_id, session=session)