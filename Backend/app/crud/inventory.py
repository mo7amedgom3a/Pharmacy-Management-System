from schemas.inventory import InventoryBase, InventoryCreate, InventoryRead

from sqlmodel import Session, select

def create_inventory(session: Session, inventory: InventoryCreate):
    session.add(inventory)
    session.commit()
    session.refresh(inventory)
    return inventory


def get_inventory(session: Session, inventory_id: int):
    return session.get(InventoryRead, inventory_id)

def get_all_inventory(session: Session):
    return session.exec(select(InventoryRead)).all()

def update_inventory(session: Session, inventory_id: int, updates: dict):
    inventory = session.get(InventoryCreate, inventory_id)
    for key, value in updates.items():
        setattr(inventory, key, value)
    session.commit()
    return inventory

def delete_inventory(session: Session, inventory_id: int):
    inventory = session.get(InventoryRead, inventory_id)
    session.delete(inventory)
    session.commit()
