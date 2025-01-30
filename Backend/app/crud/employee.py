from schemas.employee import EmployeeCreate
from models.employee import Employee
from dependencies import save
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from typing import List

class EmployeeCrud:
    def __init__(self, session: AsyncSession):
        """Initialize EmployeeCrud with a database session"""
        self.session = session

    async def create(self, employee: EmployeeCreate) -> Employee:
        """Create a new employee record"""
        try:
            employee_instance = Employee(**employee.model_dump())
            await save(self.session, employee_instance)
            return employee_instance
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_by_id(self, employee_id: int) -> Employee:
        """Get an employee record by ID"""
        result = await self.session.execute(select(Employee).filter(Employee.employee_id == employee_id))
        employee = result.scalar()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
        return employee

    async def get_all(self) -> List[Employee]:
        """Get all employee records"""
        try:
            result = await self.session.execute(select(Employee))
            return result.scalars().all()
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def update(self, employee_id: int, updates: EmployeeCreate) -> Employee:
        """Update an employee record"""
        result = await self.session.execute(select(Employee).filter(Employee.employee_id == employee_id))
        employee = result.scalar()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
        try:
            for key, value in updates.dict(exclude_unset=True).items():
                setattr(employee, key, value)
            await save(self.session, employee)
            return employee
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def delete(self, employee_id: int) -> bool:
        """Delete an employee record"""
        result = await self.session.execute(select(Employee).filter(Employee.employee_id == employee_id))
        employee = result.scalar()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found")
        try:
            await self.session.delete(employee)
            await self.session.commit()
            return True
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
