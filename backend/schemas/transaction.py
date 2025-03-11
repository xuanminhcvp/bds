from pydantic import BaseModel, Field, condecimal
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal

class TransactionBase(BaseModel):
    user_id: int = Field(...)
    amount: float = Field(..., gt=0)
    transaction_type: str = Field(...)
    status: str = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Transaction(TransactionBase):
    pass 

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    amount: Optional[float]
    transaction_type: Optional[str]
    status: Optional[str]

class TransactionInDB(TransactionBase):
    id: int = Field(...)

# success
class TransactionResponse(BaseModel):
    id: UUID
    buyer_id: UUID
    seller_id: UUID
    property_id: UUID
    amount: Decimal
    created_at: datetime
    updated_at: datetime

class TransactionCreate(BaseModel):
    buyer_id: UUID
    seller_id: UUID
    property_id: UUID
    amount: condecimal(max_digits=15, decimal_places=2)
    
    class Config:
        from_attributes = True



