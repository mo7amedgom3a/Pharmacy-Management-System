from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.inventory import InventoryCreate
from crud.inventory import *
from typing import List, Optional
from models.drug import Drug
router = APIRouter(prefix="/inventory", tags=["Inventory"])

# Get all inventory
@router.get("/", response_model=List[Inventory], status_code=200)
async def get_allinventory(session: AsyncSession = Depends(get_session)) -> List[Inventory]:
    return await get_all_inventory(session)


# Get inventory by id
@router.get("/{inventory_id}", response_model=Inventory, status_code=200)
async def get_inventoryById(inventory_id: int, session: AsyncSession = Depends(get_session)) -> Inventory:
    return await get_inventory(inventory_id=inventory_id, session=session)


# Create a inventory
@router.post("/", response_model=Inventory, status_code=201)
async def create(inventory: InventoryCreate, session: AsyncSession = Depends(get_session)) -> Inventory:
    return await create_inventory(inventory=inventory, session=session)


# Update a inventory
@router.put("/{inventory_id}", response_model=Inventory, status_code=200)
async def update(inventory_id: int, inventory: Inventory, session: AsyncSession = Depends(get_session)) -> Inventory:
    return await update_inventory(inventory_id=inventory_id, updates=inventory, session=session)


# Delete a inventory
@router.delete("/{inventory_id}", response_model=bool, status_code=200)  
async def delete(inventory_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_inventory(inventory_id=inventory_id, session=session)

# Get all drugs in an inventory
@router.get("/{inventory_id}/drugs", response_model=List[Drug], status_code=200)
async def get_drugs(inventory_id: int, session: AsyncSession = Depends(get_session)) -> List[Drug]:
    return await get_inventory_drugs(inventory_id=inventory_id, session=session)