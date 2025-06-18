from pydantic import BaseModel, Field, condecimal
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal

class TransactionCreate(BaseModel):
    property_id: Optional[int] = None
    transaction_type: str
    amount: float
    
class Message(BaseModel):
    message: str

class TransactionResponse(BaseModel):
    title: Optional[str] = None
    transaction_type: str
    amount: float
    description: str
    created_at: datetime

class TransactionCreateProject(BaseModel):
    project_id: Optional[int] = None
    transaction_type: str
    amount: float


