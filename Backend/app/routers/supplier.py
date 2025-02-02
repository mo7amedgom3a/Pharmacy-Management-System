from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.supplier import SupplierCreate
from models.supplier import Supplier
from crud.supplier import SupplierCrud
from typing import List
from auth.dependencies import require_role, roles
router = APIRouter(prefix="/supplier", tags=["Supplier"], dependencies=[Depends(require_role(roles["admin"]))])

# Dependency Injection for SupplierCrud
async def get_supplier_crud(session: AsyncSession = Depends(get_session)):
    return SupplierCrud(session)

# Get all suppliers
@router.get("/", response_model=List[Supplier], status_code=200)
async def get_suppliers(supplier_crud: SupplierCrud = Depends(get_supplier_crud)) -> List[Supplier]:
    return await supplier_crud.get_all_suppliers()

# Get supplier by id
@router.get("/{supplier_id}", response_model=Supplier, status_code=200)
async def get_supplierById(supplier_id: int, supplier_crud: SupplierCrud = Depends(get_supplier_crud)) -> Supplier:
    return await supplier_crud.get_supplier(supplier_id=supplier_id)

# Create a supplier
@router.post("/", response_model=Supplier, status_code=201)
async def create(supplier: SupplierCreate, supplier_crud: SupplierCrud = Depends(get_supplier_crud)) -> Supplier:
    return await supplier_crud.create_supplier(supplier=supplier)

# Update a supplier
@router.put("/{supplier_id}", response_model=Supplier, status_code=200)
async def update(supplier_id: int, supplier: SupplierCreate, supplier_crud: SupplierCrud = Depends(get_supplier_crud)) -> Supplier:
    return await supplier_crud.update_supplier(supplier_id=supplier_id, supplier=supplier)

# Delete a supplier
@router.delete("/{supplier_id}", response_model=bool, status_code=200)
async def delete(supplier_id: int, supplier_crud: SupplierCrud = Depends(get_supplier_crud)) -> bool:
    return await supplier_crud.delete_supplier(supplier_id=supplier_id)