from sqlmodel import SQLModel, Field
from typing import Optional, List
from models.inventory_transactions import Transaction
from sqlmodel import Relationship
class Pharmacy(SQLModel, table=True):
    pharmacy_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    location: str
    contact_info: Optional[str] = None

    transactions: List[Transaction] = Relationship(back_populates="pharmacy")