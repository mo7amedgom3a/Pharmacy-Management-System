from sqlmodel import SQLModel, Field
from typing import Optional
from models.inventory_transactions import Transaction
from sqlmodel import Relationship

class Inventory(SQLModel, table=True):
    inventory_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    drug_id: Optional[int] = Field(default=None, foreign_key="drug.drug_id")
    total_quantity: int
    current_quantity: int
    price_per_unit: float
    min_quantity: int

    transactions: Transaction = Relationship(back_populates="inventory")