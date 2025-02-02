from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.inventory import InventoryCreate, InventoryBase
from crud.inventory import InventoryCrud
from models.inventory import Inventory
from typing import List
from models.drug import Drug
from auth.dependencies import require_role, roles
router = APIRouter(prefix="/inventory", tags=["Inventory"])

# Dependency Injection for InventoryCrud
async def get_inventory_crud(session: AsyncSession = Depends(get_session)):
    return InventoryCrud(session)

@router.get("/", response_model=List[Inventory], status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def get_all_inventory(inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> List[Inventory]:
    return await inventory_crud.get_all()

@router.get("/{inventory_id}", response_model=Inventory, status_code=200, dependencies=[Depends(require_role(roles["admin"] or roles["pharmacist"]))])
async def get_inventory_by_id(inventory_id: int, inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> Inventory:
    return await inventory_crud.get_by_id(inventory_id)

@router.post("/", response_model=Inventory, status_code=201, dependencies=[Depends(require_role(roles["admin"]))])
async def create_inventory(inventory: InventoryCreate, inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> Inventory:
    return await inventory_crud.create(inventory)

@router.put("/{inventory_id}", response_model=Inventory, status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def update_inventory(inventory_id: int, inventory: InventoryBase, inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> Inventory:
    return await inventory_crud.update(inventory_id, inventory)

@router.delete("/{inventory_id}", response_model=bool, status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def delete_inventory(inventory_id: int, inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> bool:
    return await inventory_crud.delete(inventory_id)

@router.get("/{inventory_id}/drugs", response_model=List[Drug], status_code=200, dependencies=[Depends(require_role(roles["admin"] or roles["pharmacist"]))])
async def get_inventory_drugs(inventory_id: int, inventory_crud: InventoryCrud = Depends(get_inventory_crud)) -> List[Drug]:
    return await inventory_crud.get_drugs(inventory_id)
