from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.drug_types import DrugTypeCreate, DrugTypeUpdate
from crud.drug_types import DrugTypeCrud
from models.drug import DrugType, DrugSubType
from typing import List
from auth.dependencies import require_role, roles
router = APIRouter(prefix="/drug_types", tags=["Drug Types"], dependencies=[Depends(require_role(roles["admin"]))])

# Dependency Injection for DrugTypeCrud
async def get_drug_type_crud(session: AsyncSession = Depends(get_session)):
    return DrugTypeCrud(session)

@router.get("/", response_model=List[DrugType], status_code=200)
async def get_drug_types(drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> List[DrugType]:
    return await drug_type_crud.get_all()

@router.get("/{drug_type_id}", response_model=DrugType, status_code=200)
async def get_drug_type_by_id(drug_type_id: int, drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> DrugType:
    return await drug_type_crud.get_by_id(drug_type_id)

@router.post("/", response_model=DrugType, status_code=201)
async def create_drug_type(drug_type: DrugTypeCreate, drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> DrugType:
    return await drug_type_crud.create(drug_type)

@router.put("/{drug_type_id}", response_model=DrugType, status_code=200)
async def update_drug_type(drug_type_id: int, drug_type: DrugTypeUpdate, drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> DrugType:
    return await drug_type_crud.update(drug_type_id, drug_type)

@router.delete("/{drug_type_id}", response_model=bool, status_code=200)
async def delete_drug_type(drug_type_id: int, drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> bool:
    return await drug_type_crud.delete(drug_type_id)

@router.get("/{drug_type_id}/subtypes", response_model=List[DrugSubType], status_code=200)
async def get_drug_type_subtypes(drug_type_id: int, drug_type_crud: DrugTypeCrud = Depends(get_drug_type_crud)) -> List[DrugSubType]:
    return await drug_type_crud.get_subtypes(drug_type_id)
