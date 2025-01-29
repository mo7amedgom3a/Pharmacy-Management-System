from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime


class Transaction(SQLModel, table=True):
    transaction_id: Optional[int] = Field(default=None, primary_key=True)
    pharmacy_id: Optional[int] = Field(default=None, foreign_key="pharmacy.pharmacy_id")
    inventory_id: Optional[int] = Field(default=None, foreign_key="inventory.inventory_id")
    drug_id: Optional[int] = Field(default=None, foreign_key="drug.drug_id")
    transaction_type: str
    quantity: int  
    transaction_date: datetime = Field(default_factory=datetime.utcnow)
    
    pharmacy: "Pharmacy" = Relationship(back_populates="transactions")
    inventory: "Inventory" = Relationship(back_populates="transactions")
    drug: "Drug" = Relationship(back_populates="transactions")
