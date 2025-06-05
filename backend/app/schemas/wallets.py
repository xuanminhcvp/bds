from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID

class WalletResponse(BaseModel):
    balance: float

    class Config:
        from_attributes: True

class DepositRequest(BaseModel):
    amount: float


