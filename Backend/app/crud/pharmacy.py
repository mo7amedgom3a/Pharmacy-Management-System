from schemas.pharmacy import PharmacyBase, PharmacyCreate, PharmacyRead

from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from models.pharmacy import Pharmacy
from dependencies import save


async def create_pharmacy(session: AsyncSession, pharmacyDto: PharmacyCreate) -> Pharmacy:
    # map the DTO to the ORM model
    pharmacy = Pharmacy.from_orm(pharmacyDto)
    # save the pharmacy to the database
    await save(session, pharmacy)
    return pharmacy


async def get_pharmacy(session: AsyncSession, pharmacy_id: int) -> Pharmacy:
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    return pharmacy

async def get_all_pharmacies(session: AsyncSession) -> list[Pharmacy]:
    result = await session.execute(select(Pharmacy))
    pharmacies = result.scalars().all()
    return pharmacies

async def update_pharmacy(session: AsyncSession, pharmacy_id: int, updates: Pharmacy):
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    for key, value in updates.items():
        setattr(pharmacy, key, value)
    await save(session, pharmacy)
    return pharmacy


async def delete_pharmacy(session: AsyncSession, pharmacy_id: int):
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    await session.delete(pharmacy)
    await session.commit()
    return pharmacy