from sqlmodel import Field, SQLModel
from typing import Optional
from models.employee import Employee
from sqlmodel import Relationship
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    # create foreign key to employee table and delete cascade
    employee_id: int = Field(foreign_key="employee.employee_id", ondelete="CASCADE", unique=True)
    username: str = Field(unique=True)
    hashed_password: str
    role: str
    employee: Optional[Employee] = Relationship(back_populates="user")