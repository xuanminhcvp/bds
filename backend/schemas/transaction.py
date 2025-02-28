from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

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

    class Config:
        orm_mode = True

class TransactionResponse(TransactionInDB):
    pass 

