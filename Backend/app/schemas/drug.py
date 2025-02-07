from pydantic import BaseModel
from typing import Optional

class DrugBase(BaseModel):
    name: str
    type: Optional[str] = None
    manufacturer: Optional[str] = None
    inventory_id: Optional[int] = None
    image_url: Optional[str] = None
    barcode: Optional[str] = None
    description: Optional[str] = None
    supplier_id: Optional[int] = None
    total_quantity: int
    current_quantity: int
    price_per_unit: float
    min_quantity: int
    


class DrugCreate(DrugBase):
    pass

class DrugRead(DrugBase):
    drug_id: int

    class Config:
        orm_mode = True