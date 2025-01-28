from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.drug_subtypes import DrugSubtypeCreate, DrugSubtypeUpdate
from crud.drug_subtypes import *

router = APIRouter(prefix="/drug_subtypes", tags=["Drug Subtypes"])
from typing import List, Optional

# Get all drug subtypes
@router.get("/", response_model=List[DrugSubType])
async def get_drugSubtypes(session: AsyncSession = Depends(get_session)) -> List[DrugSubType]:
    return await get_drug_subtypes(db_session=session)


# Get drug subtype by id
@router.get("/{drug_subtype_id}", response_model=DrugSubType)
async def get_drugSubtypeById(drug_subtype_id: int, session: AsyncSession = Depends(get_session)) -> DrugSubType:
    return await get_drug_subtype_by_id(db_session=session, drug_subtype_id=drug_subtype_id)


# Create a drug subtype
@router.post("/", response_model=DrugSubType)
async def create(drug_subtype: DrugSubtypeCreate, session: AsyncSession = Depends(get_session)) -> DrugSubType:
    return await create_drug_subtype(db_session=session, drug_subtype=drug_subtype)


# Update a drug subtype
@router.put("/{drug_subtype_id}", response_model=DrugSubType)
async def update(drug_subtype_id: int, drug_subtype: DrugSubtypeUpdate, session: AsyncSession = Depends(get_session)) -> DrugSubType:
    return await update_drug_subtype(db_session=session, drug_subtype_id=drug_subtype_id, drug_subtype=drug_subtype)


# Delete a drug subtype
@router.delete("/{drug_subtype_id}", response_model=bool)
async def delete(drug_subtype_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_drug_subtype(db_session=session, drug_subtype_id=drug_subtype_id)