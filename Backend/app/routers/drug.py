from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from crud.drug import DrugCrud
from schemas.drug import DrugCreate
from models.drug import Drug
from typing import List

router = APIRouter(prefix="/drug", tags=["Drug"])

# Dependency Injection for DrugCrud
async def get_drug_crud(session: AsyncSession = Depends(get_session)):
    return DrugCrud(session)

@router.get("/", response_model=List[Drug], status_code=200)
async def get_drugs(drug_crud: DrugCrud = Depends(get_drug_crud)) -> List[Drug]:
    return await drug_crud.get_all()

@router.get("/{drug_id}", response_model=Drug, status_code=200)
async def get_drug_by_id(drug_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.get_by_id(drug_id)

@router.post("/", response_model=Drug, status_code=201)
async def create_drug(drug: DrugCreate, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.create(drug)

@router.put("/{drug_id}", response_model=Drug, status_code=200)
async def update_drug(drug_id: int, drug: Drug, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.update(drug_id, drug)

@router.delete("/{drug_id}", response_model=bool, status_code=200)
async def delete_drug(drug_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> bool:
    return await drug_crud.delete(drug_id)
