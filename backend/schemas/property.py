from pydantic import BaseModel
from typing import Optional
from uuid import UUID 
from datetime import datetime

class PropertyBase(BaseModel):
    title: str 
    description: Optional[str] = None
    price: float
    location: str 

class PropertyResponse(PropertyBase):
    id: UUID 
    created_at: datetime
    user_id: UUID 














class Property(PropertyBase):
    pass 

class PropertyCreate(PropertyBase):
    pass 

class PropertyUpdate(PropertyBase):
    pass 



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




