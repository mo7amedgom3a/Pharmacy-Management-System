from schemas.drug import DrugBase, DrugCreate, DrugRead
from models.drug import Drug, DrugSubType, DrugType
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from fastapi import HTTPException, status


async def create_drug(session: AsyncSession, drug: DrugCreate) -> Drug:
    """create a new drug in the database"""
    try:
        drug = Drug(**drug.dict())
        await save(session, drug)
        return drug
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_drug(session: AsyncSession, drug_id: int) -> Drug:
    """get a drug by id"""
    drug = await session.get(Drug, drug_id)
    if not drug:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
    return drug


async def get_drug_by_name(session: AsyncSession, drug_name: str) -> Drug:
    """get a drug by name"""
    result = await session.exec(select(Drug).where(Drug.name == drug_name))
    drug = result.first()
    if not drug:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
    return drug


async def get_all_drugs(session: AsyncSession) -> list[Drug]:
    """get all drugs"""
    result = await session.exec(select(Drug))
    return result.all()


async def update_drug(session: AsyncSession, drug_id: int, updates: Drug) -> Drug:
    drug = await session.get(Drug, drug_id)
    if not drug:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
    try:
        for key, value in updates.dict().items():
            setattr(drug, key, value)
        await session.commit()
        return drug
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def delete_drug(session: AsyncSession, drug_id: int) -> bool:
    drug = await session.get(Drug, drug_id)
    if not drug:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Drug not found")
    try:
        await session.delete(drug)
        await session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

