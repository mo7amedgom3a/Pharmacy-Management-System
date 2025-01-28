from pydantic import BaseModel
from typing import Optional

class DrugTypeBase(BaseModel):
    name: str
    description: Optional[str] = None
    

class DrugTypeCreate(DrugTypeBase):
    pass

class DrugTypeRead(DrugTypeBase):
    id: int

    class Config:
        orm_mode = True

class DrugTypeUpdate(DrugTypeBase):
    pass

class DrugTypeDelete(DrugTypeBase):
    pass