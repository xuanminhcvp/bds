from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import UUID 

class UserPublic(BaseModel):
    id: UUID
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None 

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str 

class LoginResponse(BaseModel):
    token: str
    token_type: str 
    user: UserPublic

class UserRegister(BaseModel):
    email: EmailStr 
    password: str 
    name: str
    phone: str 

class RegisterResponse(BaseModel):
    message: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None

class UsersManagement(BaseModel):
    id: UUID
    email: str
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    is_superuser: bool 
    is_locked: bool 
    created_at: datetime
    updated_at: datetime
    wallet: Optional[float] = None

    class Config:
        from_attributes = True

class UsersManagementResponse(BaseModel):
    data: list[UsersManagement]
    count: int 

    class Config:
        from_attributes = True

class Is_Locked(BaseModel):
    is_locked: bool

class CurrentUserSchema(BaseModel):
    id: UUID
    email: EmailStr
    is_superuser: bool 
    is_locked: bool 
    created_at: datetime

    class Config:
        from_attributes = True

class UserAdminResponse(BaseModel):
    id: UUID
    email: str
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    is_superuser: bool 
    is_locked: bool 
    created_at: datetime

    class Config:
        from_attributes = True

class UserAdminResponseToken(BaseModel):
    token: str
    user: UserAdminResponse












class UserBase(BaseModel):
    email: EmailStr = Field(..., max_length=255)
    full_name: Optional[str] = Field(None, max_length=255)

class UserSchema(UserBase):
    password: str

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=40)



class UsersPublic(BaseModel):
    data: list[UserPublic]
    count: int 
    



class UserHashed(BaseModel):
    email: EmailStr
    password: str 
    full_name: Optional[str]

class UserLogin(BaseModel):
    email: EmailStr
    password: str 



class UserLoginResponse(BaseModel):
    token: str
    token_type: str
    user: UserPublic

    class Config:
        from_attributes: True

# FOR DASHBOARD
class UserPublicDashboard(BaseModel):
    id: str
    name: Optional[str] = None
    email: EmailStr
    avatar: Optional[str] = None
    phone: Optional[str] = None

    class Config:
        from_attributes: True
        
class UserPublicDashboard2(BaseModel):
    id: UUID
    full_name: Optional[str] = None
    email: str

    class Config:
        from_attributes: True

