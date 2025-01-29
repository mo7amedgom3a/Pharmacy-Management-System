from pydantic import BaseModel
from typing import Optional

class EmployeeBase(BaseModel):
    pharmacy_id: int
    name: str
    role: str
    phone: Optional[str] = None
    salary: float
    address: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeRead(EmployeeBase):
    employee_id: int

    class Config:
        orm_mode = True