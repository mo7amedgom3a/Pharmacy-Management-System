from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from models.inventory_transactions import Transaction
class Pharmacy(SQLModel, table=True):
    pharmacy_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    location: str
    contact_info: Optional[str] = None
    transactions: List[Transaction] = Relationship(back_populates="pharmacy")

    # One-to-Many: A pharmacy can have multiple inventories
    inventories: List["Inventory"] = Relationship(back_populates="pharmacy")
