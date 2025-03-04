from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5,description="Rating from 1 to 5")
    comment: Optional[str] = None

class Review(ReviewBase):
    pass 

class ReviewCreate(ReviewBase):
    property_id: int 
    user_id: int 

class ReviewUpdate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int 
    property_id: int 
    user_id: int 
    created_at: datetime

    class Config:
        from_attributes = True

