from pydantic import BaseModel
from typing import Optional

class DrugSubtypeBase(BaseModel):
    name: str
    description: Optional[str] = None
    drug_type_id: int

class DrugSubtypeCreate(DrugSubtypeBase):
    pass

class DrugSubtypeRead(DrugSubtypeBase):
    id: int

    class Config:
        orm_mode = True

class DrugSubtypeUpdate(DrugSubtypeBase):
    pass

class DrugSubtypeDelete(DrugSubtypeBase):
    pass