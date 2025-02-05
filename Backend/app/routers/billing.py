from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.billing import BillingCreate
from crud.billing import BillingCrud
from models.billing import Billing
from typing import List

router = APIRouter(prefix="/billing", tags=["Billing"])

# Dependency Injection for BillingCrud
async def get_billing_crud(session: AsyncSession = Depends(get_session)):
    return BillingCrud(session)

@router.get("/", response_model=List[Billing], status_code=200)
async def get_all_billing(billing_crud: BillingCrud = Depends(get_billing_crud)) -> List[Billing]:
    return await billing_crud.get_all()

@router.get("/{billing_id}", response_model=Billing, status_code=200)
async def get_billing_by_id(billing_id: int, billing_crud: BillingCrud = Depends(get_billing_crud)) -> Billing:
    return await billing_crud.get_by_id(billing_id)

# get billing by customer name
@router.get("/name/{name}", response_model=List[Billing], status_code=200)
async def get_billing_by_name(name: str, billing_crud: BillingCrud = Depends(get_billing_crud)) -> List[Billing]:
    return await billing_crud.get_by_name(name)

# get billing by pharmacy
@router.get("/pharmacy/{pharmacy_id}", response_model=List[Billing], status_code=200)
async def get_billing_by_pharmacy(pharmacy_id: int, billing_crud: BillingCrud = Depends(get_billing_crud)) -> List[Billing]:
    return await billing_crud.get_all_by_pharmacy(pharmacy_id)

@router.post("/", response_model=Billing, status_code=201)
async def create_billing(billing: BillingCreate, billing_crud: BillingCrud = Depends(get_billing_crud)) -> Billing:
    return await billing_crud.create(billing)

@router.put("/{billing_id}", response_model=Billing, status_code=200)
async def update_billing(billing_id: int, billing: BillingCreate, billing_crud: BillingCrud = Depends(get_billing_crud)) -> Billing:
    return await billing_crud.update(billing_id, billing)

@router.delete("/{billing_id}", response_model=bool, status_code=200)
async def delete_billing(billing_id: int, billing_crud: BillingCrud = Depends(get_billing_crud)) -> bool:
    return await billing_crud.delete(billing_id)
