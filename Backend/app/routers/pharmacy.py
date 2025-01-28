from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.pharmacy import PharmacyCreate, PharmacyUpdate
from crud.pharmacy import *
from models.inventory import Inventory
from models.billing import Billing
from models.employee import Employee
from typing import List


router = APIRouter(prefix="/pharmacy", tags=["Pharmacy"])

@router.get("/", response_model=List[Pharmacy], status_code=200)
async def get_pharmacies(session: AsyncSession = Depends(get_session)) -> List[Pharmacy]:
    return await get_all_pharmacies(session)


@router.get("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def get_pharmacyById(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await get_pharmacy(pharmacy_id=pharmacy_id, session=session)


@router.post("/", response_model=Pharmacy, status_code=201)
async def create(pharmacy: PharmacyCreate, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await create_pharmacy(pharmacyDto=pharmacy, session=session)


@router.put("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def update(pharmacy_id: int, pharmacy: PharmacyUpdate, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await update_pharmacy(pharmacy_id=pharmacy_id, updates=pharmacy, session=session)


@router.delete("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def delete(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await delete_pharmacy(pharmacy_id=pharmacy_id, session=session)


@router.get("/pharmacy/inventory/{pharmacy_id}", response_model=List[Inventory], status_code=200)
async def get_inventory(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> List[Inventory]:
    return await get_all_inventory_from_pharmacy(pharmacy_id=pharmacy_id, session=session)


@router.get("/pharmacy/inventory/{pharmacy_id}/{drug_name}", response_model=Inventory, status_code=200)
async def get_inventory_drug_from_pharmacy(pharmacy_id: int, drug_name: str, session: AsyncSession = Depends(get_session)) -> Inventory:
    return await get_inventory_for_drug_from_pharmacy(pharmacy_id=pharmacy_id, drug_name=drug_name, session=session)


@router.get("/pharmacy/billing/{pharmacy_id}", response_model=List[Billing], status_code=200)
async def get_billing(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> List[Billing]:
    return await get_all_billing_from_pharmacy(pharmacy_id=pharmacy_id, session=session)


@router.get("/pharmacy/employee/{pharmacy_id}", response_model=List[Employee], status_code=200)
async def get_employee(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> List[Employee]:
    return await get_all_employees_from_pharmacy(pharmacy_id=pharmacy_id, session=session)

