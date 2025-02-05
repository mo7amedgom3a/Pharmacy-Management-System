from pydantic import BaseModel
from typing import Optional

class SupplierBase(BaseModel):
    name: str
    address: Optional[str] = None
    contact_info: Optional[str] = None

class SupplierCreate(SupplierBase):
    pass



class SupplierRead(SupplierBase):
    supplier_id: int

    class Config:
        orm_mode = True
