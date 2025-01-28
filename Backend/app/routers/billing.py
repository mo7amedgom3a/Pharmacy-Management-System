from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.billing import BillingCreate
from crud.billing import *
from typing import List, Optional

router = APIRouter(prefix="/billing", tags=["Billing"])

# Get all billing
@router.get("/", response_model=List[Billing], status_code=200)
async def get_all(session: AsyncSession = Depends(get_session)) -> List[Billing]:
    return await get_all_billing(session)


# Get billing by id
@router.get("/{billing_id}", response_model=Billing, status_code=200)
async def get_billingById(billing_id: int, session: AsyncSession = Depends(get_session)) -> Billing:
    return await get_billing(billing_id=billing_id, session=session)


# Create a billing
@router.post("/", response_model=Billing, status_code=201)
async def create(billing: BillingCreate, session: AsyncSession = Depends(get_session)) -> Billing:
    return await create_billing(billing=billing, session=session)


# Update a billing
@router.put("/{billing_id}", response_model=Billing, status_code=200)
async def update(billing_id: int, billing: Billing, session: AsyncSession = Depends(get_session)) -> Billing:
    return await update_billing(billing_id=billing_id, updates=billing, session=session)


# Delete a billing
@router.delete("/{billing_id}", response_model=bool, status_code=200)
async def delete(billing_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_billing(billing_id=billing_id, session=session)