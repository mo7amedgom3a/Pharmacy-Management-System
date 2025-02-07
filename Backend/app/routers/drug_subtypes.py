# from fastapi import APIRouter, Depends
# from sqlmodel.ext.asyncio.session import AsyncSession
# from dependencies import get_session
# from schemas.drug_subtypes import DrugSubtypeCreate, DrugSubtypeUpdate
# from crud.drug_subtypes import DrugSubtypeCrud
# from models.drug import DrugSubType
# from typing import List
# from auth.dependencies import require_role, roles
# router = APIRouter(prefix="/drug_subtypes", tags=["Drug Subtypes"], dependencies=[Depends(require_role(roles["admin"]))])

# # Dependency Injection for DrugSubtypeCrud
# async def get_drug_subtype_crud(session: AsyncSession = Depends(get_session)):
#     return DrugSubtypeCrud(session)

# @router.get("/", response_model=List[DrugSubType], status_code=200)
# async def get_drug_subtypes(drug_subtype_crud: DrugSubtypeCrud = Depends(get_drug_subtype_crud)) -> List[DrugSubType]:
#     return await drug_subtype_crud.get_all()

# @router.get("/{drug_subtype_id}", response_model=DrugSubType, status_code=200)
# async def get_drug_subtype_by_id(drug_subtype_id: int, drug_subtype_crud: DrugSubtypeCrud = Depends(get_drug_subtype_crud)) -> DrugSubType:
#     return await drug_subtype_crud.get_by_id(drug_subtype_id)

# @router.post("/", response_model=DrugSubType, status_code=201)
# async def create_drug_subtype(drug_subtype: DrugSubtypeCreate, drug_subtype_crud: DrugSubtypeCrud = Depends(get_drug_subtype_crud)) -> DrugSubType:
#     return await drug_subtype_crud.create(drug_subtype)

# @router.put("/{drug_subtype_id}", response_model=DrugSubType, status_code=200)
# async def update_drug_subtype(drug_subtype_id: int, drug_subtype: DrugSubtypeUpdate, drug_subtype_crud: DrugSubtypeCrud = Depends(get_drug_subtype_crud)) -> DrugSubType:
#     return await drug_subtype_crud.update(drug_subtype_id, drug_subtype)

# @router.delete("/{drug_subtype_id}", response_model=bool, status_code=200)
# async def delete_drug_subtype(drug_subtype_id: int, drug_subtype_crud: DrugSubtypeCrud = Depends(get_drug_subtype_crud)) -> bool:
#     return await drug_subtype_crud.delete(drug_subtype_id)
