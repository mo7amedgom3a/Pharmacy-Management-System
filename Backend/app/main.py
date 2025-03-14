from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from fastapi.openapi.models import APIKey, APIKeyIn
from fastapi.openapi.models import SecurityScheme
from fastapi.openapi.utils import get_openapi
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
    inventory_transactions,
    auth_router,
    search_router
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
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define OAuth2 security scheme for Swagger UI
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Include routers
app.include_router(auth_router)
app.include_router(pharmacy.router)
app.include_router(supplier.router)
app.include_router(inventory.router)
app.include_router(inventory_transactions.router)
# app.include_router(drug_types.router)
# app.include_router(drug_subtypes.router)
app.include_router(drug.router)
app.include_router(billing.router)
app.include_router(employee.router)
app.include_router(search_router)

# Sample root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Pharmacy Management System API"}

# Custom OpenAPI schema
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Pharmacy Management System API",
        version="1.0.0",
        description="API for managing a pharmacy system",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
