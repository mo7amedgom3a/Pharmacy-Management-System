from schemas.billing import BillingBase, BillingCreate, BillingRead
from models.billing import Billing
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from fastapi import HTTPException, status


async def create_billing(session: AsyncSession, billing: BillingCreate) -> Billing:
    """Create a new billing record in the database"""
    try:
        billing_instance = Billing(**billing.model_dump())
        await save(session, billing_instance)
        return billing_instance
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_billing(session: AsyncSession, billing_id: int) -> Billing:
    """Get a billing record from the database"""
    billing = await session.exec(select(Billing).where(Billing.id == billing_id)).first()
    if not billing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
    return billing


async def get_all_billing(session: AsyncSession) -> list[Billing]:
    """Get all billing records from the database"""
    try:
        result = await session.exec(select(Billing))
        return result.all()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def update_billing(session: AsyncSession, billing_id: int, updates: dict) -> Billing:
    """Update a billing record in the database"""
    billing = await session.get(Billing, billing_id)
    if not billing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
    try:
        for key, value in updates.items():
            setattr(billing, key, value)
        await session.commit()
        return billing
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def delete_billing(session: AsyncSession, billing_id: int) -> bool:
    """Delete a billing record from the database"""
    billing = await session.get(Billing, billing_id)
    if not billing:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
    try:
        await session.delete(billing)
        await session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
