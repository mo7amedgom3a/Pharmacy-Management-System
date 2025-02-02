from pydantic import BaseModel
from typing import Optional
from schemas.employee import EmployeeCreate

class UserBase(EmployeeCreate):
    
    username: str
    role: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserPayload(BaseModel):
    username: str
    user_id: int
    employee_id: int
    role: str