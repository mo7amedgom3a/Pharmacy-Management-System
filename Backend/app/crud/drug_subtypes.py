from schemas.drug_subtypes import DrugSubtypeCreate, DrugSubtypeUpdate
from models.drug import DrugSubType
from dependencies import save
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from typing import List

class DrugSubtypeCrud:
    def __init__(self, session: AsyncSession):
        """Initialize DrugSubtypeCrud with a database session"""
        self.session = session

    async def get_all(self) -> List[DrugSubType]:
        """Get all drug subtypes"""
        result = await self.session.execute(select(DrugSubType))
        return result.scalars().all()

    async def get_by_id(self, drug_subtype_id: int) -> DrugSubType:
        """Get drug subtype by ID"""
        result = await self.session.execute(select(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id))
        drug_subtype = result.scalar()
        if not drug_subtype:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
        return drug_subtype

    async def create(self, drug_subtype: DrugSubtypeCreate) -> DrugSubType:
        """Create a new drug subtype"""
        db_drug_subtype = DrugSubType(
            name=drug_subtype.name, 
            description=drug_subtype.description, 
            drug_type_id=drug_subtype.drug_type_id
        )
        await save(self.session, db_drug_subtype)
        return db_drug_subtype

    async def update(self, drug_subtype_id: int, drug_subtype: DrugSubtypeUpdate) -> DrugSubType:
        """Update a drug subtype"""
        result = await self.session.execute(select(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id))
        db_drug_subtype = result.scalar()
        if not db_drug_subtype:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
        for key, value in drug_subtype.dict(exclude_unset=True).items():
            setattr(db_drug_subtype, key, value)
        await save(self.session, db_drug_subtype)
        return db_drug_subtype

    async def delete(self, drug_subtype_id: int) -> bool:
        """Delete a drug subtype"""
        result = await self.session.execute(select(DrugSubType).filter(DrugSubType.drug_sub_type_id == drug_subtype_id))
        db_drug_subtype = result.scalar()
        if not db_drug_subtype:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug subtype not found")
        await self.session.delete(db_drug_subtype)
        await self.session.commit()
        return True
