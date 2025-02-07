from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from models.inventory_transactions import Transaction

class Inventory(SQLModel, table=True):
    inventory_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    name: str
    transactions: List[Transaction] = Relationship(back_populates="inventory")
    # One-to-Many: An inventory can have multiple drugs
    drugs: List["Drug"] = Relationship(back_populates="inventory")
    pharmacy: "Pharmacy" = Relationship(back_populates="inventories")
