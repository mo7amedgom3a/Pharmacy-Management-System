from sqlmodel import SQLModel, Field
from typing import Optional

class Inventory(SQLModel, table=True):
    inventory_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    drug_id: Optional[int] = Field(default=None, foreign_key="drug.drug_id")
    quantity: int
    price_per_unit: float
    min_quantity: int