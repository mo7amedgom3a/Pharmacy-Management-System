from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, select
from fastapi import Query
from dependencies import SessionDep, create_db_and_tables, close_session
from typing import Annotated
from schemas.pharmacy import PharmacyRead, PharmacyCreate
from models.pharmacy import Pharmacy
from typing import Optional
from crud.pharmacy import create_pharmacy, get_all_pharmacies
# Initialize FastAPI app
app = FastAPI()
class Hero(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: Optional[int] = None


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.on_event("shutdown")
def on_shutdown():
    close_session(SessionDep)

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/heroes/")
def create_hero(hero: Hero, session: SessionDep) -> Hero:
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero

@app.get("/heroes/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Hero]:
    heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
    return heroes

@app.post("/pharmacy/")
def add_pharmacy(pharmacy: PharmacyCreate, session: SessionDep) -> Pharmacy:
    return create_pharmacy(session, pharmacy)

@app.get("/pharmacy/")
def read_pharmacy(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Pharmacy]:
    return get_all_pharmacies(session)


# Sample root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Pharmacy Management System API"}
