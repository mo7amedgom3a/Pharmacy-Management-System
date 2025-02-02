from sqlmodel import SQLModel, Field
from typing import Optional
from sqlmodel import Relationship

class Employee(SQLModel, table=True):
    employee_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    name: str = Field(index=True)
    phone: str
    salary: float
    address: str

    user: Optional["User"] = Relationship(back_populates="employee", sa_relationship_kwargs={"cascade": "all, delete"})