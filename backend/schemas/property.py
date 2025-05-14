from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID 
from datetime import datetime
from decimal import Decimal

class UserInfo(BaseModel):
    id: UUID
    full_name: Optional[str]
    avatar: Optional[str]
    phone_number: str

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
    description: Optional[str] = None
    price: Decimal
    location: str
    area: Decimal
    bedrooms: int
    bathrooms: int
    property_type: str
    status: str
    owner_id: UUID
    is_verified: Optional[bool] = False

class PropertyResponse(BaseModel):
    id: UUID
    title: str
    description: str
    price: Decimal
    location: str
    area: Decimal
    bedrooms: int
    bathrooms: int
    property_type: str
    status: str
    owner_id: UUID
    created_at: datetime
    updated_at: datetime
    is_verified: bool
    images: List[str] = []
    owner: UserInfo

class PropertyListResponse(BaseModel):
    total: int
    results: List[PropertyResponse]

class Property(PropertyBase):
    pass 

class Property1(PropertyBase):
    id: UUID
    created_at: datetime
    updated_at: datetime


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


class PropertiesResponse(PropertyBase):
    properties: list[PropertyResponse]

class ApprovePostResponse(BaseModel):
    message: str 
    post_id: str
    is_approved: bool 

class PreviewPostResponse(BaseModel):
    preview: PropertyResponse

    class Config:
        from_attributes = True




