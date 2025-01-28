from schemas.inventory import InventoryBase, InventoryCreate, InventoryRead
from models.inventory import Inventory
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save


async def create_inventory(session: AsyncSession, inventory: InventoryCreate) -> Inventory:
    inventory = Inventory.from_orm(inventory)
    await save(session, inventory)
    return inventory


async def get_inventory(session: AsyncSession, inventory_id: int) -> Inventory:
    return await session.get(Inventory, inventory_id)

async def get_all_inventory(session: AsyncSession) -> list[Inventory]:
    result = await session.exec(select(Inventory))
    return result.all()

async def update_inventory(session: AsyncSession, inventory_id: int, updates: dict) -> Inventory:
    inventory = await session.get(Inventory, inventory_id)
    for key, value in updates.items():
        setattr(inventory, key, value)
    await session.commit()
    return inventory

async def delete_inventory(session: AsyncSession, inventory_id: int) -> bool:
    try:
        inventory = await session.get(Inventory, inventory_id)
        await session.delete(inventory)
        await session.commit()
        return True
    except:
        return False
