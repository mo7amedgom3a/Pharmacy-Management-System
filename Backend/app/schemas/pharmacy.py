from pydantic import BaseModel
from typing import Optional

class PharmacyBase(BaseModel):
    name: str
    location: str
    contact_info: Optional[str] = None

class PharmacyCreate(PharmacyBase):
    pass

class PharmacyRead(PharmacyBase):
    pharmacy_id: int

    class Config:
        orm_mode = True
