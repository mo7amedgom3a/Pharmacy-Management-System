from schemas.employee import EmployeeBase, EmployeeCreate, EmployeeRead

from sqlmodel import Session, select

def create_employee(session: Session, employee: EmployeeCreate):
    session.add(employee)
    session.commit()
    session.refresh(employee)
    return employee

def get_employee(session: Session, employee_id: int):
    return session.get(EmployeeRead, employee_id)

def get_all_employees(session: Session):
    return session.exec(select(EmployeeRead)).all()

def update_employee(session: Session, employee_id: int, updates: dict):
    employee = session.get(EmployeeCreate, employee_id)
    for key, value in updates.items():
        setattr(employee, key, value)
    session.commit()
    return employee

def delete_employee(session: Session, employee_id: int):
    employee = session.get(EmployeeRead, employee_id)
    session.delete(employee)
    session.commit()