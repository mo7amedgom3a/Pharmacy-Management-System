from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from crud.drug import *
from models.drug import DrugSubType, DrugType

router = APIRouter(prefix="/drug", tags=["Drug"])
from typing import List, Optional

# Get all drugs
@router.get("/", response_model=List[Drug], status_code=200)
async def get_drugs(session: AsyncSession = Depends(get_session)) -> List[Drug]:
    return await get_all_drugs(session)

# Get drug by id
@router.get("/{drug_id}", response_model=Drug, status_code=200)
async def get_drugById(drug_id: int, session: AsyncSession = Depends(get_session)) -> Drug:
    return await get_drug(drug_id=drug_id, session=session)


# Create a drug
@router.post("/", response_model=Drug, status_code=201)
async def create(drug: DrugCreate, session: AsyncSession = Depends(get_session)) -> Drug:
    return await create_drug(drug=drug, session=session)


# Update a drug
@router.put("/{drug_id}", response_model=Drug, status_code=200)
async def update(drug_id: int, drug: Drug, session: AsyncSession = Depends(get_session)) -> Drug:
    return await update_drug(drug_id=drug_id, updates=drug, session=session)


# Delete a drug
@router.delete("/{drug_id}", response_model=bool, status_code=200)
async def delete(drug_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_drug(drug_id=drug_id, session=session)

