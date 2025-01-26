from sqlmodel import SQLModel, Field
from typing import Optional, List

class Pharmacy(SQLModel, table=True):
    pharmacy_id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    location: str
    contact_info: Optional[str] = None