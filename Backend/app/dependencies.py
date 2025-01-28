from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os
from typing import Annotated
from fastapi import Depends

# SQLite database URL (async mode)
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite+aiosqlite:///./Pharmacy.db")

# Create the async SQLModel engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Async session maker
async_session_maker = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session() -> AsyncSession:
    """Dependency to get a database session."""
    async with async_session_maker() as session:
        yield session

# Dependency annotation for session
SessionDep = Annotated[AsyncSession, Depends(get_session)]

async def create_db_and_tables():
    """Create all database tables defined in SQLModel models."""
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def close_session():
    """Close the database session."""
    await engine.dispose()
async def save(session: AsyncSession, model: SQLModel):
    """Save a model asynchronously in the database."""
    try:
        session.add(model)
        await session.commit()
        await session.refresh(model)
        return model
    except Exception as e:
        await session.rollback()
        raise Exception(f"Error occurred while saving data: {e}")