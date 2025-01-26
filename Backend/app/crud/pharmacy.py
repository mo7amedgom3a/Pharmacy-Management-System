from schemas.pharmacy import PharmacyBase, PharmacyCreate, PharmacyRead

from sqlmodel import Session, select
from models.pharmacy import Pharmacy
def create_pharmacy(session: Session, pharmacyDto: PharmacyCreate) -> Pharmacy:
    #map the DTO to the ORM model
    pharmacy = Pharmacy.from_orm(pharmacyDto)
    session.add(pharmacy)
    session.commit()
    session.refresh(pharmacy)
    return pharmacy


def get_pharmacy(session: Session, pharmacy_id: int) -> Pharmacy:
    return session.get(Pharmacy, pharmacy_id)

def get_all_pharmacies(session: Session) -> list[Pharmacy]:
    return session.exec(select(Pharmacy)).all()


def update_pharmacy(session: Session, pharmacy_id: int, updates: dict):
    pharmacy = session.get(Pharmacy, pharmacy_id)
    for key, value in updates.items():
        setattr(pharmacy, key, value)
    session.add(pharmacy)
    session.commit()
    session.refresh(pharmacy)
    return pharmacy

def delete_pharmacy(session: Session, pharmacy_id: int):
    pharmacy = session.get(Pharmacy, pharmacy_id)
    session.delete(pharmacy)
    session.commit()
    return pharmacy