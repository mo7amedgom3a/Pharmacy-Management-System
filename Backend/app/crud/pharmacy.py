from schemas.pharmacy import PharmacyBase, PharmacyCreate, PharmacyRead

from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from models.pharmacy import Pharmacy
from dependencies import save
from fastapi import HTTPException, status


async def create_pharmacy(session: AsyncSession, pharmacyDto: PharmacyCreate) -> Pharmacy:
    try:
        pharmacy = Pharmacy.from_orm(pharmacyDto)
        await save(session, pharmacy)
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_pharmacy(session: AsyncSession, pharmacy_id: int) -> Pharmacy:
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    return pharmacy

async def get_all_pharmacies(session: AsyncSession) -> list[Pharmacy]:
    try:
        result = await session.execute(select(Pharmacy))
        pharmacies = result.scalars().all()
        return pharmacies
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def update_pharmacy(session: AsyncSession, pharmacy_id: int, updates: Pharmacy):
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    try:
        for key, value in updates.items():
            setattr(pharmacy, key, value)
        await save(session, pharmacy)
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def delete_pharmacy(session: AsyncSession, pharmacy_id: int):
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    try:
        await session.delete(pharmacy)
        await session.commit()
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))