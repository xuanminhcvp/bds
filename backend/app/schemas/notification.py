from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional, List
from uuid import UUID 
from datetime import datetime
from decimal import Decimal

class NotificationResponse(BaseModel):
    notification_id: int
    user_id: UUID
    message: str
    created_at: datetime
    is_read: bool

    class Config:
        from_attributes = True