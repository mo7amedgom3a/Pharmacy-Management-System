from pydantic import BaseModel
from typing import Optional

class DrugSearchBase(BaseModel):
    drug_name: str
    drug_type: str
    drug_images: list
    barcodes: list
    description: str
    drug_manufacturer: str
    drug_price: float
    