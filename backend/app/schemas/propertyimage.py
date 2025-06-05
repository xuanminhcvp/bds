from pydantic import BaseModel 
from uuid import UUID
from typing import Optional

class PropertyImageCreate(BaseModel):
    property_id: UUID 
    image_url: str 
    is_primary: bool = False
    
class PropertyImageResponse(BaseModel):
    id: UUID 
    property_id: UUID 
    image_url: str 
    is_primary: bool 
    
    class Config:
        from_attributes = True  