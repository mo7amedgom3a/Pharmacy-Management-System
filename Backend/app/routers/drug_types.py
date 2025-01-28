from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.drug_types import DrugTypeCreate
from crud.drug_types import *

router = APIRouter(prefix="/drug_types", tags=["Drug Types"])
from typing import List, Optional

# Get all drug types
@router.get("/", response_model=List[DrugType])
async def get_drugTypes(session: AsyncSession = Depends(get_session)) -> List[DrugType]:
    return await get_drug_types(db_session=session)

# Get drug type by id
@router.get("/{drug_type_id}", response_model=DrugType)
async def get_drugTypeById(drug_type_id: int, session: AsyncSession = Depends(get_session)) -> DrugType:
    return await get_drug_type_by_id(db_session=session, drug_type_id=drug_type_id)


# Create a drug type
@router.post("/", response_model=DrugType)
async def create(drug_type: DrugTypeCreate, session: AsyncSession = Depends(get_session)) -> DrugType:
    return await create_drug_type(db_session=session, drug_type=drug_type)


# Update a drug type
@router.put("/{drug_type_id}", response_model=DrugType)
async def update(drug_type_id: int, drug_type: DrugTypeUpdate, session: AsyncSession = Depends(get_session)) -> DrugType:
    return await update_drug_type(db_session=session, drug_type_id=drug_type_id, drug_type=drug_type)


# Delete a drug type
@router.delete("/{drug_type_id}", response_model=bool)
async def delete(drug_type_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_drug_type(db_session=session, drug_type_id=drug_type_id)
