from sqlmodel import SQLModel, Field
from typing import Optional

class BillingDetails(SQLModel, table=True):
    billing_details_id: Optional[int] = Field(default=None, primary_key=True)
    billing_id: Optional[int] = Field(default=None, foreign_key="billing.billing_id")
    drug_id: Optional[int] = Field(default=None, foreign_key="drug.drug_id")
    quantity: int
    price: float
    
