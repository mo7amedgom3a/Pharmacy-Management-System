from schemas.employee import EmployeeBase, EmployeeCreate, EmployeeRead
from models.employee import Employee
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from dependencies import save


async def create_employee(session: AsyncSession, employee: EmployeeCreate) -> Employee:
    employee_instance = Employee(**employee.dict())
    await save(session, employee_instance)
    return employee_instance


async def get_employee(session: AsyncSession, employee_id: int) -> Employee:
    return await session.get(Employee, employee_id)


async def get_all_employees(session: AsyncSession) -> list[Employee]:
    result = await session.exec(select(Employee))
    return result.all()


async def update_employee(session: AsyncSession, employee_id: int, updates: dict) -> Employee:
    employee = await session.get(Employee, employee_id)
    for key, value in updates.items():
        setattr(employee, key, value)
    await session.commit()
    return employee


async def delete_employee(session: AsyncSession, employee_id: int) -> bool:
    try:
        employee = await session.get(Employee, employee_id)
        await session.delete(employee)
        await session.commit()
        return True
    except:
        return False