from schemas.employee import EmployeeBase, EmployeeCreate, EmployeeRead
from models.employee import Employee
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save
from fastapi import HTTPException, status


async def create_employee(session: AsyncSession, employee: EmployeeCreate) -> Employee:
    try:
        employee_instance = Employee(**employee.dict())
        await save(session, employee_instance)
        return employee_instance
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def get_employee(session: AsyncSession, employee_id: int) -> Employee:
    employee = await session.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    return employee


async def get_all_employees(session: AsyncSession) -> list[Employee]:
    try:
        result = await session.exec(select(Employee))
        return result.all()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def update_employee(session: AsyncSession, employee_id: int, updates: dict) -> Employee:
    employee = await session.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    try:
        for key, value in updates.items():
            setattr(employee, key, value)
        await session.commit()
        return employee
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


async def delete_employee(session: AsyncSession, employee_id: int) -> bool:
    employee = await session.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    try:
        await session.delete(employee)
        await session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))