from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.pharmacy import PharmacyCreate, PharmacyUpdate
from crud.pharmacy import PharmacyCrud
from models.pharmacy import Pharmacy
from models.inventory import Inventory
from models.billing import Billing
from models.employee import Employee
from typing import List
from auth.dependencies import require_role, roles

router = APIRouter(prefix="/pharmacy", tags=["Pharmacy"])

# Dependency Injection for PharmacyCrud
async def get_pharmacy_crud(session: AsyncSession = Depends(get_session)):
    return PharmacyCrud(session)

@router.get("/", response_model=List[Pharmacy], status_code=200)
async def get_pharmacies(pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> List[Pharmacy]:
    return await pharmacy_crud.get_all_pharmacies()

@router.get("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def get_pharmacyById(pharmacy_id: int, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> Pharmacy:
    return await pharmacy_crud.get_pharmacy(pharmacy_id=pharmacy_id)

@router.post("/", response_model=Pharmacy, status_code=201, dependencies=[Depends(require_role(roles["admin"]))])
async def create(pharmacy: PharmacyCreate, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> Pharmacy:
    return await pharmacy_crud.create_pharmacy(pharmacyDto=pharmacy)

@router.put("/{pharmacy_id}", response_model=Pharmacy, status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def update(pharmacy_id: int, pharmacy: PharmacyUpdate, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> Pharmacy:
    return await pharmacy_crud.update_pharmacy(pharmacy_id=pharmacy_id, updates=pharmacy)

@router.delete("/{pharmacy_id}", response_model=Pharmacy, status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def delete(pharmacy_id: int, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> Pharmacy:
    return await pharmacy_crud.delete_pharmacy(pharmacy_id=pharmacy_id)

@router.get("/inventory/{pharmacy_id}", response_model=List[Inventory], status_code=200)
async def get_inventory(pharmacy_id: int, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> List[Inventory]:
    return await pharmacy_crud.get_all_inventory_from_pharmacy(pharmacy_id=pharmacy_id)

@router.get("/inventory/{pharmacy_id}/{drug_name}", response_model=Inventory, status_code=200)
async def get_inventory_drug_from_pharmacy(pharmacy_id: int, drug_name: str, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> Inventory:
    return await pharmacy_crud.get_inventory_for_drug_from_pharmacy(pharmacy_id=pharmacy_id, drug_name=drug_name)

@router.get("/billing/{pharmacy_id}", response_model=List[Billing], status_code=200)
async def get_billing(pharmacy_id: int, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> List[Billing]:
    return await pharmacy_crud.get_all_billing_from_pharmacy(pharmacy_id=pharmacy_id)

@router.get("/employee/{pharmacy_id}", response_model=List[Employee], status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def get_employee(pharmacy_id: int, pharmacy_crud: PharmacyCrud = Depends(get_pharmacy_crud)) -> List[Employee]:
    return await pharmacy_crud.get_all_employees_from_pharmacy(pharmacy_id=pharmacy_id)
