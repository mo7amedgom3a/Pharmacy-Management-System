from schemas.billing import BillingBase, BillingCreate, BillingRead
from models.billing import Billing
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save


async def create_billing(session: AsyncSession, billing: BillingCreate) -> Billing:
    """Create a new billing record in the database"""
    billing_instance = Billing(**billing.dict())
    await save(session, billing_instance)
    return billing_instance


async def get_billing(session: AsyncSession, billing_id: int) -> Billing:
    """Get a billing record from the database"""
    return await session.get(Billing, billing_id)


async def get_all_billing(session: AsyncSession) -> list[Billing]:
    """Get all billing records from the database"""
    result = await session.exec(select(Billing))
    return result.all()


async def update_billing(session: AsyncSession, billing_id: int, updates: dict) -> Billing:
    """Update a billing record in the database"""
    billing = await session.get(Billing, billing_id)
    for key, value in updates.items():
        setattr(billing, key, value)
    await session.commit()
    return billing


async def delete_billing(session: AsyncSession, billing_id: int) -> bool:
    """Delete a billing record from the database"""
    try:
        billing = await session.get(Billing, billing_id)
        await session.delete(billing)
        await session.commit()
        return True
    except:
        return False
