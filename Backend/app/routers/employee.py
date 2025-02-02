from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.employee import EmployeeCreate
from crud.employee import EmployeeCrud
from models.employee import Employee
from typing import List
from auth.dependencies import require_role, roles
router = APIRouter(prefix="/employee", tags=["Employee"], dependencies=[Depends(require_role(roles["admin"]))])

# Dependency Injection for EmployeeCrud
async def get_employee_crud(session: AsyncSession = Depends(get_session)):
    return EmployeeCrud(session)

@router.get("/", response_model=List[Employee], status_code=200)
async def get_all_employees(employee_crud: EmployeeCrud = Depends(get_employee_crud)) -> List[Employee]:
    return await employee_crud.get_all()

@router.get("/{employee_id}", response_model=Employee, status_code=200)
async def get_employee_by_id(employee_id: int, employee_crud: EmployeeCrud = Depends(get_employee_crud)) -> Employee:
    return await employee_crud.get_by_id(employee_id)

@router.post("/", response_model=Employee, status_code=201)
async def create_employee(employee: EmployeeCreate, employee_crud: EmployeeCrud = Depends(get_employee_crud)) -> Employee:
    return await employee_crud.create(employee)

@router.put("/{employee_id}", response_model=Employee, status_code=200)
async def update_employee(employee_id: int, employee: EmployeeCreate, employee_crud: EmployeeCrud = Depends(get_employee_crud)) -> Employee:
    return await employee_crud.update(employee_id, employee)

@router.delete("/{employee_id}", response_model=bool, status_code=200)
async def delete_employee(employee_id: int, employee_crud: EmployeeCrud = Depends(get_employee_crud)) -> bool:
    return await employee_crud.delete(employee_id)
