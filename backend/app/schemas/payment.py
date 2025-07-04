from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from typing import Optional
from uuid import UUID 

class PaymentBase(BaseModel):
    transaction_id: UUID
    user_id: UUID 
    amount: float
    payment_method: str
    payment_status: str

class PaymentCreate(PaymentBase):
    pass 

class PaymentResponse(PaymentCreate):
    id: UUID











class PaymentUpdate(PaymentBase):
    pass

class PaymentSchema(PaymentBase):
    transaction_id: int 
    

    

    class Config:
        from_attributes: True

    