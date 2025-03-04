from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from typing import Optional

class PaymentBase(BaseModel):
    amount: Decimal
    payment_method: str
    payment_status: str 

class PaymentCreate(PaymentBase):
    transaction_id: int

class PaymentUpdate(PaymentBase):
    payment_status: Optional[str] = None

class Payment(PaymentBase):
    id: int
    transaction_id: int 
    payment_date: datetime

    class Config:
        from_attributes: True

    