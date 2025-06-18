from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional, List
from uuid import UUID 
from datetime import datetime
from decimal import Decimal

class Message(BaseModel):
    message: str

class User(BaseModel):
    id: UUID
    email: EmailStr
    name: str 
    phone: str
    avatar: Optional[str] = None 

class PropertyImageResponse(BaseModel):
    image_url: str

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    location: str
    area: float
    bedrooms: int
    bathrooms: int
    property_type: str
    status: str
    owner_id: UUID
    is_verified: Optional[bool] = False 

class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    area: float
    address: str
    bedrooms: int
    bathrooms: int
    property_type: str
    category: str
    images: List[str]

class PropertyResponse(BaseModel):
    property_id: int
    title: str
    description: str
    price: float
    area: float
    address: str
    bedrooms: int
    bathrooms: int
    property_type: str
    category: str
    status: str
    views: int
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    images: List[PropertyImageResponse]
    user: User
    is_favorited: Optional[bool] = False  

    model_config = {"from_attributes": True} 

class AllPropertyResponse(BaseModel):
    count: int
    result: List[PropertyResponse]

class ExtendedPropertyRequest(BaseModel):
    days: int 

class StatusUpdate(BaseModel):
    status: str

class PropertyFilter (BaseModel):
    property_type: Optional[str] = None
    category: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    area_min: Optional[float] = None
    area_max: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    address: Optional[str] = None
    title: Optional[str] = None
    created_at: Optional[datetime] = None
    





 




class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    location: Optional[str] = None
    area: Optional[Decimal] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    property_type: Optional[str] = None
    status: Optional[str] = None
    owner_id: Optional[UUID] = None
    is_verified: Optional[bool] = None






