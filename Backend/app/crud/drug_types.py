from schemas.drug_types import DrugTypeCreate, DrugTypeUpdate
from models.drug import DrugType
from typing import List, Union
from dependencies import save
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status

async def get_drug_types(db_session: AsyncSession) -> List[DrugType]:
    """Get all drug types"""
    result = await db_session.execute(select(DrugType))
    return result.scalars().all()

async def get_drug_type_by_id(db_session: AsyncSession, drug_type_id: int) -> DrugType:
    """Get drug type by id"""
    result = await db_session.execute(select(DrugType).filter(DrugType.id == drug_type_id))
    drug_type = result.scalar()
    if not drug_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
    return drug_type

async def create_drug_type(db_session: AsyncSession, drug_type: DrugTypeCreate) -> DrugType:
    """Create drug type"""
    db_drug_type = DrugType(name=drug_type.name)
    await save(db_session, db_drug_type)
    return db_drug_type

async def update_drug_type(db_session: AsyncSession, drug_type_id: int, drug_type: DrugTypeUpdate) -> DrugType:
    result = await db_session.execute(select(DrugType).filter(DrugType.id == drug_type_id))
    db_drug_type = result.scalar()
    if not db_drug_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
    for key, value in drug_type.dict(exclude_unset=True).items():
        setattr(db_drug_type, key, value)
    await save(db_session, db_drug_type)
    return db_drug_type

async def delete_drug_type(db_session: AsyncSession, drug_type_id: int) -> bool:
    result = await db_session.execute(select(DrugType).filter(DrugType.id == drug_type_id))
    db_drug_type = result.scalar()
    if not db_drug_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
    await db_session.delete(db_drug_type)
    await db_session.commit()
    return True