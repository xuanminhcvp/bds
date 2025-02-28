from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PropertyBase(BaseModel):
    title: str 
    description: Optional[str] = None
    price: float
    location: str 

class Property(PropertyBase):
    pass 

class PropertyCreate(PropertyBase):
    pass 

class PropertyUpdate(PropertyBase):
    pass 




class PropertyResponse(PropertyBase):
    id: int 
    created_at: datetime

    class Config:
        orm_mode = True




