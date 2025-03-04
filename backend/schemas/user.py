from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserSchema(UserBase):
    password: str

class UserCreate(UserBase):
    password: str
 
class UserPublic(UserBase):
    id: uuid.UUID

class UsersPublic(BaseModel):
    data: list[UserPublic]
    count: int 

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserRegister(BaseModel):
    email: EmailStr = Field(..., max_length=255)
    password: str = Field(..., min_length=8, max_length=40)
    full_name: Optional[str] = Field(None, max_length=255)

class UserResponse(UserBase):
    id: int 
    created_at: datetime

    class Config:
        from_attributes: True