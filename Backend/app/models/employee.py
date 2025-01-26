from sqlmodel import SQLModel, Field
from typing import Optional

class Employee(SQLModel, table=True):
    employee_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    name: str
    role: str
    contact_info: Optional[str] = None