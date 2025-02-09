from pydantic import BaseModel
from typing import Optional
from datetime import datetime
class TransactionBase(BaseModel):
    pharmacy_id: Optional[int] = None
    inventory_id: Optional[int] = None
    drug_id: Optional[int] = None
    transaction_type: str
    quantity: int  
    transaction_date: datetime = datetime.now()


class TransactionCreate(TransactionBase):
    pass

class TransactionRead(TransactionBase):
    transaction_id: int

    class Config:
        orm_mode = True
        