from schemas.drug_subtypes import DrugSubtypeCreate, DrugSubtypeUpdate
from models.drug import DrugSubType, DrugType
from dependencies import AsyncSession, save
from fastapi import HTTPException, status
from sqlmodel import select


async def get_drug_subtypes(db_session: AsyncSession) -> list[DrugSubType]:
    """Get all drug subtypes"""
    try:
        result = await db_session.exec(select(DrugSubType))
        drug_sub_types = result.all()
        return drug_sub_types
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

async def get_drug_subtype_by_id(db_session: AsyncSession, drug_subtype_id: int) -> DrugSubType:
    """Get drug subtype by id"""
    drug_subtypes = await db_session.execute(select(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id))
    db_drug_subtype = drug_subtypes.scalar()
    if not db_drug_subtype:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
    return db_drug_subtype


async def create_drug_subtype(db_session: AsyncSession, drug_subtype: DrugSubtypeCreate) -> DrugSubType:
    """Create drug subtype"""
    db_drug_subtype = DrugSubType(
        name=drug_subtype.name, description=drug_subtype.description, 
        drug_type_id=drug_subtype.drug_type_id
    )
    await save(db_session, db_drug_subtype)
    return db_drug_subtype


async def update_drug_subtype(
        db_session: AsyncSession, 
        drug_subtype_id: int, 
        drug_subtype: DrugSubtypeUpdate
        ) -> DrugSubType:
    
    """Update drug subtype"""
    query = db_session.query(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id)
    result = await db_session.execute(query)
    db_drug_subtype = result.scalar()
    if not db_drug_subtype:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
    for key, value in drug_subtype.dict(exclude_unset=True).items():
        setattr(db_drug_subtype, key, value)
    await save(db_session, db_drug_subtype)
    return db_drug_subtype


async def delete_drug_subtype(db_session: AsyncSession, drug_subtype_id: int) -> bool:
    """Delete drug subtype"""
    query = db_session.query(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id)
    result = await db_session.execute(query)
    db_drug_subtype = result.scalar()
    if not db_drug_subtype:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
    await db_session.delete(db_drug_subtype)
    await db_session.commit()
    return True