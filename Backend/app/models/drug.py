from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from models.inventory_transactions import Transaction


class Drug(SQLModel, table=True):
    drug_id: Optional[int] = Field(default=None, primary_key=True)
    inventory_id: Optional[int] = Field(default=None, foreign_key="inventory.inventory_id")

    name: str = Field(index=True)
    type: Optional[str] = None
    image_url: Optional[str] = None
    barcode: Optional[str] = None
    manufacturer: Optional[str] = None
    description: Optional[str] = None
    total_quantity: int
    current_quantity: int
    price_per_unit: float
    min_quantity: int
    transactions: List[Transaction] = Relationship(back_populates="drug")
    inventory: "Inventory" = Relationship(back_populates="drugs")
