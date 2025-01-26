from schemas.billing import BillingBase, BillingCreate, BillingRead

from sqlmodel import Session, select

def create_billing(session: Session, billing: BillingCreate):
    session.add(billing)
    session.commit()
    session.refresh(billing)
    return billing


def get_billing(session: Session, billing_id: int):
    return session.get(BillingRead, billing_id)

def get_all_billing(session: Session):

    return session.exec(select(BillingRead)).all()


def update_billing(session: Session, billing_id: int, updates: dict):
    billing = session.get(BillingCreate, billing_id)
    for key, value in updates.items():
        setattr(billing, key, value)
    session.commit()
    return billing

def delete_billing(session: Session, billing_id: int):
    billing = session.get(BillingRead, billing_id)
    session.delete(billing)
    session.commit()
