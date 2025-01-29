from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query
from dependencies import SessionDep, create_db_and_tables, close_session
from typing import Annotated

from routers import (
    pharmacy,
    drug,
    drug_types,
    drug_subtypes,
    supplier,
    inventory,
    billing,
    employee,
    inventory_transactions
)


# Initialize FastAPI app
app = FastAPI()

# Create the database and tables
@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

@app.on_event("shutdown")
async def on_shutdown():
    await close_session()

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pharmacy.router)
app.include_router(drug.router)
app.include_router(drug_types.router)
app.include_router(drug_subtypes.router)
app.include_router(supplier.router)
app.include_router(inventory.router)
app.include_router(billing.router)
app.include_router(employee.router)
app.include_router(inventory_transactions.router)
# Sample root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Pharmacy Management System API"}
