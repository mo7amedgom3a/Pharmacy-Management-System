from schemas.supplier import SupplierBase, SupplierCreate, SupplierRead
from models.supplier import Supplier
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save

class SupplierCrud:
    def __init__(self, session: AsyncSession):
        """Initialize SupplierCrud with a database session"""
        self.session = session

    async def create_supplier(self, supplier: SupplierCreate) -> Supplier:
        supplier = Supplier.from_orm(supplier)
        await save(self.session, supplier)
        return supplier

    async def get_supplier(self, supplier_id: int) -> Supplier:
        return await self.session.get(Supplier, supplier_id)

    async def get_all_suppliers(self) -> list[Supplier]:
        result = await self.session.exec(select(Supplier))
        return result.all()

    async def update_supplier(self, supplier_id: int, supplier: SupplierCreate) -> Supplier:
        # Get the supplier
        existing_supplier = await self.session.get(Supplier, supplier_id)
        # Update the supplier
        for key, value in supplier.dict().items():
            setattr(existing_supplier, key, value)
        await self.session.commit()
        return existing_supplier

    async def delete_supplier(self, supplier_id: int) -> bool:
        try:
            supplier = await self.session.get(Supplier, supplier_id)
            await self.session.delete(supplier)
            await self.session.commit()
            return True
        except:
            return False