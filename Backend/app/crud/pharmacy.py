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


async def create_pharmacy(session: AsyncSession, pharmacyDto: PharmacyCreate) -> Pharmacy:
    """
    Create a new pharmacy in the database.

    Args:
        session (AsyncSession): The database session.
        pharmacyDto (PharmacyCreate): The pharmacy data to create.
    
    Returns:
        Pharmacy: The created pharmacy object.
    """
    try:
        pharmacy = Pharmacy.from_orm(pharmacyDto)
        await save(session, pharmacy)
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_pharmacy(session: AsyncSession, pharmacy_id: int) -> Pharmacy:
    """
    Retrieve a pharmacy by its ID.

    Args:
        session (AsyncSession): The database session.
        pharmacy_id (int): The ID of the pharmacy to retrieve.

    Returns:
        Pharmacy: The pharmacy object if found.

    Raises:
        HTTPException: If the pharmacy is not found.
    """
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    return pharmacy


async def get_all_pharmacies(session: AsyncSession) -> list[Pharmacy]:
    """
    Retrieve all pharmacies from the database.

    Args:
        session (AsyncSession): The database session.

    Returns:
        list[Pharmacy]: A list of all pharmacies.
    """
    try:
        result = await session.execute(select(Pharmacy))
        pharmacies = result.scalars().all()
        return pharmacies
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def update_pharmacy(session: AsyncSession, pharmacy_id: int, updates: PharmacyUpdate) -> Pharmacy:
    """
    Update a pharmacy by its ID.

    Args: 
        session (AsyncSession): The database session.
        pharmacy_id (int): The

    Returns:
        Pharmacy: The updated pharmacy object.
    """
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    try:
        #map the updated fields to the pharmacy object
        for key, value in updates.dict(exclude_unset=True).items():
            setattr(pharmacy, key, value)
        await session.commit()
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def delete_pharmacy(session: AsyncSession, pharmacy_id: int):
    """
    Delete a pharmacy by its ID.

    Args:
        session (AsyncSession): The database session.
        pharmacy_id (int): The ID of the pharmacy to delete.

    Returns:
        Pharmacy: The deleted pharmacy object.

    Raises:
        HTTPException: If the pharmacy is not found or an error occurs during deletion.
    """
    pharmacy = await session.get(Pharmacy, pharmacy_id)
    if not pharmacy:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pharmacy not found")
    try:
        await session.delete(pharmacy)
        await session.commit()
        return pharmacy
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


# from spacfic pharmacy get all inventory
async def get_all_inventory_from_pharmacy(session: AsyncSession, pharmacy_id: int) -> List[Inventory]:
    """
    Retrieve all inventory items for a specific pharmacy.

    Args:
        session (AsyncSession): The database session.
        pharmacy_id (int): The ID of the pharmacy.

    Returns:
        List[Inventory]: A list of all inventory items for the pharmacy.
    """
    try:
        result = await session.execute(select(Inventory).where(Inventory.pharmacy_id == pharmacy_id))
        inventory = result.scalars().all()
        return inventory
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    

# from spacfic pharmacy get inventory for spacifc drug by name
async def get_inventory_for_drug_from_pharmacy(session: AsyncSession, pharmacy_id: int, drug_name: str) -> Inventory:
    """
    Retrieve inventory for a specific drug at a specific pharmacy.

    Args:
        session (AsyncSession): The database session.
        pharmacy_id (int): The

    Returns:
        Inventory: The inventory item for the drug at the pharmacy.
    """
    try:
        result = await session.execute(
            select(Inventory)
            .join(Drug)
            .where(Inventory.pharmacy_id == pharmacy_id, Drug.name == drug_name)
        )
        inventory = result.scalars().first()
        return inventory
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


#get all billing for specific pharmacy
async def get_all_billing_from_pharmacy(session: AsyncSession, pharmacy_id: int) -> List[Billing]:
    """
    Retrieve all billing records for a specific pharmacy.

    Args:
        session (AsyncSession): The database session.
        pharmacy_id (int): The ID of the pharmacy.

    Returns:
        List[Billing]: A list of all billing records for the pharmacy.
    """
    try:
        result = await session.execute(select(Billing).where(Billing.pharmacy_id == pharmacy_id))
        billing = result.scalars().all()
        return billing
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
# get employees from pharmacy 
async def get_all_employees_from_pharmacy(session: AsyncSession, pharmacy_id: int) -> List[Employee]:
    try:
        result = await session.execute(select(Employee).where(Employee.pharmacy_id == pharmacy_id))
        employees = result.scalars().all()
        return employees
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
