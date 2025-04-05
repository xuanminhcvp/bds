from pydantic import BaseModel, Field, condecimal
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal

class TransactionBase(BaseModel):
    buyer_id: UUID
    seller_id: UUID
    property_id: UUID
    amount: Decimal  
    
#done    
class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    amount: Optional[float]
    transaction_type: Optional[str]
    status: Optional[str]

class TransactionInDB(TransactionBase):
    id: int = Field(...)

#done
class TransactionResponse(BaseModel):
    id: UUID
    buyer_id: UUID
    seller_id: UUID
    property_id: UUID
    amount: Decimal
    created_at: datetime

    
    class Config:
        from_attributes = True



