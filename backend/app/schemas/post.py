from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from uuid import UUID
from datetime import datetime

class PropertyType(str, Enum):
    sale = "sale"
    rent = "rent"
    project = "project"

class PostStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    expired = "expired"

class PostCreate(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    area: float
    address: str
    property_type: PropertyType
    category: str
    status: PostStatus = PostStatus.pending
    owner_id: Optional[UUID] = None  
    images: Optional[List[str]] = []

class PostResponse(BaseModel):
    post_id: UUID
    title: str
    description: Optional[str]
    price: float
    area: float
    address: str
    property_type: PropertyType
    category: str
    status: PostStatus
    user_id: UUID
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    views: int
    images: List[str] = []
    
    class Config:
        from_attributes = True

class PostCreationResponse(BaseModel):
    message: str
    data: PostResponse
    image_urls: List[str]

    class Config:
        from_attributes = True
    