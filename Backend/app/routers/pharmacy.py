from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.pharmacy import PharmacyCreate
from crud.pharmacy import *
router = APIRouter(prefix="/pharmacy", tags=["Pharmacy"])
from typing import List, Optional

# Get all pharmacies
@router.get("/", response_model=List[Pharmacy], status_code=200)
async def get_pharmacies(session: AsyncSession = Depends(get_session)) -> List[Pharmacy]:
    return await get_all_pharmacies(session)

# Get pharmacy by id
@router.get("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def get_pharmacyById(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await get_pharmacy(pharmacy_id=pharmacy_id, session=session)


# Create a pharmacy
@router.post("/", response_model=Pharmacy, status_code=201)
async def create(pharmacy: PharmacyCreate, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await create_pharmacy(pharmacyDto=pharmacy, session=session)

# Update a pharmacy
@router.put("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def update(pharmacy_id: int, pharmacy: Pharmacy, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await update_pharmacy(pharmacy_id=pharmacy_id, pharmacy=pharmacy, session=session)

# Delete a pharmacy
@router.delete("/{pharmacy_id}", response_model=Pharmacy, status_code=200)
async def delete(pharmacy_id: int, session: AsyncSession = Depends(get_session)) -> Pharmacy:
    return await delete_pharmacy(pharmacy_id=pharmacy_id, session=session)
