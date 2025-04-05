from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID 

class UserBase(BaseModel):
    email: EmailStr = Field(..., max_length=255)
    full_name: Optional[str] = Field(None, max_length=255)

class UserSchema(UserBase):
    password: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=40)

#done
class UserPublic(UserBase):
    id: UUID 

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

class UserHashed(BaseModel):
    email: EmailStr
    password: str 
    full_name: Optional[str]

class UserLogin(BaseModel):
    email: EmailStr
    password: str 

class UserResponse(UserBase):
    id: UUID  
    created_at: datetime

    class Config:
        from_attributes: True