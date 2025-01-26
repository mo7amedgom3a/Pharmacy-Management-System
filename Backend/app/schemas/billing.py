from pydantic import BaseModel
from typing import Optional

class BillingBase(BaseModel):
    pharmacy_id: int
    customer_name: str
    date: str
    total_amount: float

class BillingCreate(BillingBase):
    pass

class BillingRead(BillingBase):
    billing_id: int

    class Config:
        orm_mode = True