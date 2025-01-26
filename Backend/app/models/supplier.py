from sqlmodel import SQLModel, Field
from typing import Optional

class Supplier(SQLModel, table=True):
    supplier_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    contact_info: Optional[str] = None
    address: Optional[str] = None