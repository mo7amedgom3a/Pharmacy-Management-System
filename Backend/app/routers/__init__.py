from .pharmacy import router as pharmacy_router
from .drug import router as drug_router
from .inventory import router as inventory_router
from .billing import router as billing_router
from .employee import router as employee_router
from .supplier import router as supplier_router
# from .drug_types import router as drug_types_router
# from .drug_subtypes import router as drug_subtypes_router
from .inventory_transactions import router as inventory_transactions_router
from .auth import router as auth_router
__all__ = [
    "pharmacy_router",
    "drug_router",
    "inventory_router",
    "billing_router",
    "employee_router",
    "supplier_router",
    # "drug_types_router",
    # "drug_subtypes_router",
    "inventory_transactions_router",
    "auth_router"
]