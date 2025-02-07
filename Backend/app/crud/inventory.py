from models.pharmacy import Pharmacy
from schemas.inventory import InventoryBase, InventoryCreate
from models.inventory import Inventory
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from models.drug import Drug
from fastapi import HTTPException, status
from typing import List

class InventoryCrud:
    def __init__(self, session: AsyncSession):
        """Initialize InventoryCrud with a database session"""
        self.session = session


    async def create(self, inventory_data: InventoryCreate) -> Inventory:
        """Create a new inventory entry"""
        try:
            inventory = Inventory(**inventory_data.dict())
            await save(self.session, inventory)
            return inventory
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



    async def get_by_id(self, inventory_id: int) -> Inventory:
        """Retrieve an inventory item by ID"""
        inventory = await self.session.get(Inventory, inventory_id)
        if not inventory:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
        return inventory



    async def get_all(self) -> List[Inventory]:
        """Retrieve all inventory items"""
        try:
            result = await self.session.execute(select(Inventory))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



    async def update(self, inventory_id: int, updates: InventoryBase) -> Inventory:
        """Update an inventory record"""
        inventory = await self.session.get(Inventory, inventory_id)
        if not inventory:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
        
        try:
            for key, value in updates.dict(exclude_unset=True).items():
                setattr(inventory, key, value)

            await self.session.commit()
            await self.session.refresh(inventory)
            return inventory
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))



    async def delete(self, inventory_id: int) -> bool:
        """Delete an inventory record"""
        inventory = await self.session.get(Inventory, inventory_id)
        if not inventory:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
        try:
            await self.session.delete(inventory)
            await self.session.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


   
    
    async def get_by_pharmacy(self, pharmacy_id: int) -> List[Inventory]:
        """Retrieve all inventory items for a pharmacy"""
        try:
            result = await self.session.execute(select(Inventory).where(Inventory.pharmacy_id == pharmacy_id))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        

