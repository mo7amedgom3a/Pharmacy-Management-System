from schemas.pharmacy import PharmacyCreate, PharmacyUpdate
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from models.pharmacy import Pharmacy
from dependencies import save
from fastapi import HTTPException, status
from models.inventory import Inventory
from models.billing import Billing
from models.drug import Drug
from models.employee import Employee
from typing import List


class PharmacyCrud:
    def __init__(self, session: AsyncSession):
        """Initialize PharmacyCrud with a database session"""
        self.session = session

    async def create_pharmacy(self, pharmacyDto: PharmacyCreate) -> Pharmacy:
        try:
            pharmacy = Pharmacy.from_orm(pharmacyDto)
            await save(self.session, pharmacy)
            return pharmacy
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_pharmacy(self, pharmacy_id: int) -> Pharmacy:
        pharmacy = await self.session.get(Pharmacy, pharmacy_id)
        if not pharmacy:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
        return pharmacy

    async def get_all_pharmacies(self) -> List[Pharmacy]:
        try:
            result = await self.session.execute(select(Pharmacy))
            pharmacies = result.scalars().all()
            return pharmacies
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def update_pharmacy(self, pharmacy_id: int, updates: PharmacyUpdate) -> Pharmacy:
        pharmacy = await self.session.get(Pharmacy, pharmacy_id)
        if not pharmacy:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
        try:
            for key, value in updates.dict(exclude_unset=True).items():
                setattr(pharmacy, key, value)
            await self.session.commit()
            return pharmacy
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def delete_pharmacy(self, pharmacy_id: int) -> Pharmacy:
        pharmacy = await self.session.get(Pharmacy, pharmacy_id)
        if not pharmacy:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
        try:
            await self.session.delete(pharmacy)
            await self.session.commit()
            return pharmacy
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_all_inventory_from_pharmacy(self, pharmacy_id: int) -> List[Inventory]:
        try:
            result = await self.session.execute(select(Inventory).where(Inventory.pharmacy_id == pharmacy_id))
            inventory = result.scalars().all()
            return inventory
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_inventory_for_drug_from_pharmacy(self, pharmacy_id: int, drug_name: str) -> Inventory:
        try:
            result = await self.session.execute(
                select(Inventory)
                .join(Drug)
                .where(Inventory.pharmacy_id == pharmacy_id, Drug.name == drug_name)
            )
            inventory = result.scalars().first()
            return inventory
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_all_billing_from_pharmacy(self, pharmacy_id: int) -> List[Billing]:
        try:
            result = await self.session.execute(select(Billing).where(Billing.pharmacy_id == pharmacy_id))
            billing = result.scalars().all()
            return billing
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_all_employees_from_pharmacy(self, pharmacy_id: int) -> List[Employee]:
        try:
            result = await self.session.execute(select(Employee).where(Employee.pharmacy_id == pharmacy_id))
            employees = result.scalars().all()
            return employees
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
