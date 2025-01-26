from pydantic import BaseModel
from typing import Optional

class DrugBase(BaseModel):
    name: str
    type: Optional[str] = None
    manufacturer: Optional[str] = None
    description: Optional[str] = None
    supplier_id: Optional[int] = None

class DrugCreate(DrugBase):
    pass

class DrugRead(DrugBase):
    drug_id: int

    class Config:
        orm_mode = True