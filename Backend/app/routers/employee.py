from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.employee import EmployeeCreate
from crud.employee import *
from typing import List, Optional

router = APIRouter(prefix="/employee", tags=["Employee"])

# Get all employees
@router.get("/", response_model=List[Employee], status_code=200)
async def get_employees(session: AsyncSession = Depends(get_session)) -> List[Employee]:
    return await get_all_employees(session)


# Get employee by id
@router.get("/{employee_id}", response_model=Employee, status_code=200)
async def get_employeeById(employee_id: int, session: AsyncSession = Depends(get_session)) -> Employee:
    return await get_employee(employee_id=employee_id, session=session)


# Create a employee
@router.post("/", response_model=Employee, status_code=201)
async def create(employee: EmployeeCreate, session: AsyncSession = Depends(get_session)) -> Employee:
    return await create_employee(employee=employee, session=session)


# Update a employee
@router.put("/{employee_id}", response_model=Employee, status_code=200)
async def update(employee_id: int, employee: Employee, session: AsyncSession = Depends(get_session)) -> Employee:
    return await update_employee(employee_id=employee_id, updates=employee, session=session)


# Delete a employee
@router.delete("/{employee_id}", response_model=bool, status_code=200)
async def delete(employee_id: int, session: AsyncSession = Depends(get_session)) -> bool:
    return await delete_employee(employee_id=employee_id, session=session)