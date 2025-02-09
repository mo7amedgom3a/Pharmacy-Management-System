from schemas.billing import BillingCreate
from models.billing import Billing
from dependencies import save
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from typing import List
from models.pharmacy import Pharmacy
from models.drug import Drug

class BillingCrud:
    def __init__(self, session: AsyncSession):
        """Initialize BillingCrud with a database session"""
        self.session = session

    async def create(self, billing: BillingCreate) -> Billing:
        """Create a new billing record"""
        try:
            billing_instance = Billing(**billing.model_dump())
            await save(self.session, billing_instance)
            return billing_instance
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_by_id(self, billing_id: int) -> Billing:
        """Get a billing record by ID"""
        result = await self.session.execute(select(Billing).filter(Billing.billing_id == billing_id))
        billing = result.scalar()
        if not billing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
        return billing

    async def get_by_name(self, name: str) -> List[Billing]:
        """Get billing records by name"""
        try:
            result = await self.session.execute(select(Billing).filter(Billing.customer_name.like(f"%{name}%")))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


    async def get_all(self) -> List[Billing]:
        """Get all billing records"""
        try:
            result = await self.session.execute(select(Billing))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


    # get all billing for a pharmacy
    async def get_all_by_pharmacy(self, pharmacy_id: int) -> List[Billing]:
        """Get all billing records for a pharmacy"""
        try:
            result = await self.session.execute(select(Billing).filter(Billing.pharmacy_id == pharmacy_id))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        

    # get drugs for a billing
    async def get_drugs(self, billing_id: int) -> List[Drug]:
        drugs = await self.session.execute(select(Drug).join(Billing).filter(Billing.billing_id == billing_id))
        return drugs.scalars().all()
    

    async def update(self, billing_id: int, updates: BillingCreate) -> Billing:
        """Update a billing record"""
        result = await self.session.execute(select(Billing).filter(Billing.billing_id == billing_id))
        billing = result.scalar()
        if not billing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
        try:
            for key, value in updates.dict(exclude_unset=True).items():
                setattr(billing, key, value)
            await save(self.session, billing)
            return billing
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def delete(self, billing_id: int) -> bool:
        """Delete a billing record"""
        result = await self.session.execute(select(Billing).filter(Billing.billing_id == billing_id))
        billing = result.scalar()
        if not billing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Billing record not found")
        try:
            await self.session.delete(billing)
            await self.session.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
