from schemas.inventory import InventoryBase, InventoryCreate, InventoryRead
from models.inventory import Inventory
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from models.drug import Drug
from fastapi import HTTPException, status


async def create_inventory(session: AsyncSession, inventory: InventoryCreate) -> Inventory:
    try:
        inventory = Inventory(**inventory.dict())
        inventory.current_quantity = inventory.total_quantity
        await save(session, inventory)
        return inventory
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_inventory(session: AsyncSession, inventory_id: int) -> Inventory:
    inventory = await session.get(Inventory, inventory_id)
    if not inventory:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
    return inventory

async def get_all_inventory(session: AsyncSession) -> list[Inventory]:
    try:
        result = await session.exec(select(Inventory))
        return result.all()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def update_inventory(session: AsyncSession, inventory_id: int, updates: InventoryBase) -> Inventory:
    inventory = await session.get(Inventory, inventory_id)
    if not inventory:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
    try:
        for key, value in updates.dict(exclude_unset=True).items():
            setattr(inventory, key, value)
        inventory.current_quantity = inventory.quantity - inventory.current_quantity
        await session.commit()
        return inventory
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def delete_inventory(session: AsyncSession, inventory_id: int) -> bool:
    inventory = await session.get(Inventory, inventory_id)
    if not inventory:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
    try:
        await session.delete(inventory)
        await session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_inventory_drugs(session: AsyncSession, inventory_id: int) -> list[Drug]:
    inventory = await session.get(Inventory, inventory_id)
    if not inventory:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inventory not found")
    try:
        result = await session.exec(select(Drug).where(Drug.drug_id == inventory.drug_id))
        return result.all()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
