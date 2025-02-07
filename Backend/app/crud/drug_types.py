# from schemas.drug_types import DrugTypeCreate, DrugTypeUpdate
# from models.drug import DrugType, DrugSubType
# from dependencies import save
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy.future import select
# from fastapi import HTTPException, status
# from typing import List

# class DrugTypeCrud:
#     def __init__(self, session: AsyncSession):
#         """Initialize DrugTypeCrud with a database session"""
#         self.session = session

#     async def get_all(self) -> List[DrugType]:
#         """Get all drug types"""
#         result = await self.session.execute(select(DrugType))
#         return result.scalars().all()

#     async def get_by_id(self, drug_type_id: int) -> DrugType:
#         """Get drug type by ID"""
#         result = await self.session.execute(select(DrugType).filter(DrugType.drug_type_id == drug_type_id))
#         drug_type = result.scalar()
#         if not drug_type:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
#         return drug_type

#     async def create(self, drug_type: DrugTypeCreate) -> DrugType:
#         """Create a new drug type"""
#         db_drug_type = DrugType(name=drug_type.name)
#         await save(self.session, db_drug_type)
#         return db_drug_type

#     async def update(self, drug_type_id: int, drug_type: DrugTypeUpdate) -> DrugType:
#         """Update a drug type"""
#         result = await self.session.execute(select(DrugType).filter(DrugType.drug_type_id == drug_type_id))
#         db_drug_type = result.scalar()
#         if not db_drug_type:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
#         for key, value in drug_type.dict(exclude_unset=True).items():
#             setattr(db_drug_type, key, value)
#         await save(self.session, db_drug_type)
#         return db_drug_type

#     async def delete(self, drug_type_id: int) -> bool:
#         """Delete a drug type"""
#         result = await self.session.execute(select(DrugType).filter(DrugType.drug_type_id == drug_type_id))
#         db_drug_type = result.scalar()
#         if not db_drug_type:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug type not found")
#         await self.session.delete(db_drug_type)
#         await self.session.commit()
#         return True

#     async def get_subtypes(self, drug_type_id: int) -> List[DrugSubType]:
#         """Get all subtypes under a specific drug type"""
#         result = await self.session.execute(select(DrugSubType).filter(DrugSubType.drug_type_id == drug_type_id))
#         return result.scalars().all()
