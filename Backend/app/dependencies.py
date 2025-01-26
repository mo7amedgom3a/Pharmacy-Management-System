from sqlmodel import SQLModel, create_engine, Session
import os
from typing import Annotated
from fastapi import Depends

# SQLite database URL (you can change this to any other database)
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./Pharmacy.db")

# Create the SQLModel engine
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    """Dependency to get a database session."""
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    """Create all database tables defined in SQLModel models."""
    SQLModel.metadata.create_all(engine)

def close_session(session: Session):
    """Dependency to close a database session."""
    session.close(session = SessionDep)

SessionDep = Annotated[Session, Depends(get_session)]