from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from models.inventory_transactions import Transaction

class DrugType(SQLModel, table=True):
    drug_type_id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    sub_types: List["DrugSubType"] = Relationship(back_populates="drug_type")

class DrugSubType(SQLModel, table=True):
    drug_sub_type_id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    drug_type_id: Optional[int] = Field(default=None, foreign_key="drugtype.drug_type_id")
    drug_type: DrugType = Relationship(back_populates="sub_types")
    drugs: List["Drug"] = Relationship(back_populates="sub_type")

class Drug(SQLModel, table=True):
    drug_id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    type: Optional[str] = None 
    image_url: Optional[str] = None
    barcode: Optional[str] = None
    manufacturer: Optional[str] = None
    description: Optional[str] = None
    supplier_id: Optional[int] = Field(default=None, foreign_key="supplier.supplier_id")
    drug_sub_type_id: Optional[int] = Field(default=None, foreign_key="drugsubtype.drug_sub_type_id")
    sub_type: DrugSubType = Relationship(back_populates="drugs")
    transactions: List[Transaction] = Relationship(back_populates="drug")