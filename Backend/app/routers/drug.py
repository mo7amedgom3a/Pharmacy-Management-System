from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from crud.drug import DrugCrud
from schemas.drug import DrugCreate
from models.drug import Drug
from typing import List
from auth.dependencies import require_role, roles
from get_google_drugs import fetch_google_drug_info
import os 
import json
from dotenv import load_dotenv
from auth.dependencies import require_role, roles
router = APIRouter(prefix="/drug", tags=["Drug"])

# Dependency Injection for DrugCrud
async def get_drug_crud(session: AsyncSession = Depends(get_session)):
    return DrugCrud(session)

@router.get("/", response_model=List[Drug], status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def get_drugs(drug_crud: DrugCrud = Depends(get_drug_crud)) -> List[Drug]:
    return await drug_crud.get_all()

@router.get("/{drug_id}", response_model=Drug, status_code=200)
async def get_drug_by_id(drug_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.get_by_id(drug_id)

# get_by_pharmacy_id
@router.get("/pharmacy/{pharmacy_id}", response_model=List[Drug], status_code=200)
async def get_drug_by_pharmacy_id(pharmacy_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> List[Drug]:
    return await drug_crud.get_by_pharmacy_id(pharmacy_id)

@router.post("/", response_model=Drug, status_code=201, dependencies=[Depends(require_role(roles["admin"]))])
async def create_drug(drug: DrugCreate, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.create(drug)

@router.put("/{drug_id}", response_model=Drug, status_code=200 )
async def update_drug(drug_id: int, drug: Drug, drug_crud: DrugCrud = Depends(get_drug_crud)) -> Drug:
    return await drug_crud.update(drug_id, drug)


@router.get("/inventory/{inventory_id}", response_model=List[Drug], status_code=200)
async def get_drug_by_inventory_id(inventory_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> List[Drug]:
    return await drug_crud.get_by_inventory_id(inventory_id)

@router.get("/search/{query}", status_code=200)
def search_drug(query: str):
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    CX = os.getenv("CX")
    image_urls, web_urls = fetch_google_drug_info(query, API_KEY, CX, num_images=10)
    results = []
    for image, web in zip(image_urls, web_urls):
        results.append({"website_url": web, "image": image})

    return results

@router.delete("/{drug_id}", response_model=bool, status_code=200, dependencies=[Depends(require_role(roles["admin"]))])
async def delete_drug(drug_id: int, drug_crud: DrugCrud = Depends(get_drug_crud)) -> bool:
    return await drug_crud.delete(drug_id)
