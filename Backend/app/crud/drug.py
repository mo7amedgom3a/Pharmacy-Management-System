from schemas.drug import DrugCreate
from models.drug import Drug
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from fastapi import HTTPException, status
from models.inventory import Inventory
class DrugCrud:
    def __init__(self, session: AsyncSession):
        """Initialize DrugCrud with a database session"""
        self.session = session

    async def create(self, drug: DrugCreate) -> Drug:
        """Create a new drug in the database"""
        try:
            drug_obj = Drug(**drug.dict())
            await save(self.session, drug_obj)
            return drug_obj
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    
    async def get_by_id(self, drug_id: int) -> Drug:
        """Get a drug by ID"""
        drug = await self.session.get(Drug, drug_id)
        if not drug:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
        return drug
    
    # get by inventory_id
    async def get_by_inventory_id(self, inventory_id: int) -> list[Drug]:
        """Get a drug by inventory ID"""
        result = await self.session.exec(select(Drug).where(Drug.inventory_id == inventory_id))
        return result.all()

    async def get_by_name(self, drug_name: str) -> Drug:
        """Get a drug by name"""
        result = await self.session.exec(select(Drug).where(Drug.name.like(f"%{drug_name}%")))
        drug = result.first()
        if not drug:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
        return drug

    async def get_all(self) -> list[Drug]:
        """Get all drugs"""
        result = await self.session.exec(select(Drug))
        return result.all()

    async def update(self, drug_id: int, updates: Drug) -> Drug:
        """Update a drug"""
        drug = await self.session.get(Drug, drug_id)
        if not drug:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
        try:
            for key, value in updates.dict().items():
                setattr(drug, key, value)
            await self.session.commit()
            return drug
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def delete(self, drug_id: int) -> bool:
        """Delete a drug"""
        drug = await self.session.get(Drug, drug_id)
        if not drug:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
        try:
            await self.session.delete(drug)
            await self.session.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
