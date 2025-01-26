from schemas.drug import DrugBase, DrugCreate, DrugRead
from sqlmodel import Session, select

def create_drug(session: Session, drug: DrugCreate):
    session.add(drug)
    session.commit()
    session.refresh(drug)
    return drug

def get_drug(session: Session, drug_id: int):
    return session.get(DrugRead, drug_id)

def get_all_drugs(session: Session):
    return session.exec(select(DrugRead)).all()

def update_drug(session: Session, drug_id: int, updates: dict):
    drug = session.get(DrugCreate, drug_id)
    for key, value in updates.items():
        setattr(drug, key, value)
    session.commit()
    return drug

def delete_drug(session: Session, drug_id: int):
    drug = session.get(DrugRead, drug_id)
    session.delete(drug)
    session.commit()

