from pydantic import BaseModel
from typing import Optional

class BillingBase(BaseModel):
    pharmacy_id: int
    customer_name: str
    total_amount: float
    paid_amount: float
    drug_id: int
    quantity: int
    price: float

class BillingCreate(BillingBase):
    pass

class BillingRead(BillingBase):
    billing_id: int

    class Config:
        orm_mode = True