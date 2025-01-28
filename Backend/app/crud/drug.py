from schemas.drug import DrugBase, DrugCreate, DrugRead
from models.drug import Drug
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save


async def create_drug(session: AsyncSession, drug: Drug) -> Drug:
    """create a new drug in the database"""
    drug = Drug(**drug.dict())
    await save(session, drug)
    return drug


async def get_drug(session: AsyncSession, drug_id: int) -> Drug:
    """get a drug by id"""
    return await session.get(Drug, drug_id)

async def get_drug_by_name(session: AsyncSession, drug_name: str) -> Drug:
    """get a drug by name"""
    result = await session.exec(select(Drug).where(Drug.name == drug_name))
    return result.first()


async def get_all_drugs(session: AsyncSession) -> list[Drug]:
    """get all drugs"""
    result = await session.exec(select(Drug))
    return result.all()


async def update_drug(session: AsyncSession, drug_id: int, updates: Drug) -> Drug:
    drug = await session.get(Drug, drug_id)
    for key, value in updates.items():
        setattr(drug, key, value)
    await session.commit()
    return drug


async def delete_drug(session: AsyncSession, drug_id: int) -> bool:
    try:
        drug = await session.get(Drug, drug_id)
        await session.delete(drug)
        await session.commit()
        return True
    except:
        return False