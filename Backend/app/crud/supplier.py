from schemas.supplier import SupplierBase, SupplierCreate, SupplierRead
from models.supplier import Supplier
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save


async def create_supplier(session: AsyncSession, supplier: SupplierCreate) -> Supplier:
    supplier = Supplier.from_orm(supplier)
    await save(session, supplier)
    return supplier

async def get_supplier(session: AsyncSession, supplier_id: int) -> Supplier:
    return await session.get(Supplier, supplier_id)


async def get_all_suppliers(session: AsyncSession) -> list[Supplier]:
    result = await session.exec(select(Supplier))
    return result.all()

async def update_supplier(session: AsyncSession, supplier_id: int, supplier: Supplier) -> Supplier:
    supplier = await session.get(Supplier, supplier_id)
    for key, value in supplier.items():
        setattr(supplier, key, value)
    await session.commit()
    return supplier

async def delete_supplier(session: AsyncSession, supplier_id: int) -> bool:
    try:
        supplier = await session.get(Supplier, supplier_id)
        await session.delete(supplier)
        await session.commit()
        return True
    except:
        return False