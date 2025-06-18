from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.database import Base
from datetime import timedelta

class Message(BaseModel):
    message: str

class User(BaseModel):
    id: UUID
    email: EmailStr
    name: str
    phone: str
    avatar: Optional[str] = None

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    area: float
    address: str
    status: str
    company: str
    owner_id: UUID
    is_approved: Optional[bool] = False

class ProjectCreate(BaseModel):
    title: str
    description: str
    area: float
    address: str
    status: str
    images: List[str]
    company: str

class ProjectResponse(BaseModel):
    project_id: int
    user_id: UUID  
    title: str
    description: str
    area: float
    address: str
    status: str
    images: List[str]  
    company: str
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    is_approved: bool
    user: User

    model_config = {
        "from_attributes": True
    }

class AllProjectResponse(BaseModel):
    count: int
    result: List[ProjectResponse]

class ExtendedProjectRequest(BaseModel):
    days: int

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    area: Optional[Decimal] = None
    address: Optional[str] = None
    status: Optional[str] = None
    company: Optional[str] = None
    is_approved: Optional[bool] = None

class ProjectFilter(BaseModel):
    status: Optional[str] = None
    area_min: Optional[float] = None
    area_max: Optional[float] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None

