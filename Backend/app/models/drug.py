from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Drug(SQLModel, table=True):
    drug_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    type: Optional[str] = None
    manufacturer: Optional[str] = None
    description: Optional[str] = None
    supplier_id: Optional[int] = Field(default=None, foreign_key="supplier.supplier_id")