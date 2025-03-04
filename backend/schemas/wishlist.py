from pydantic import BaseModel
from typing import List 

class WishlistBase(BaseModel):
    property_id: str 

class WishlistCreate(WishlistBase):
    pass 

class WishlistResponse(WishlistBase):
    id: str 
    user_id: str 

    class Config:
        from_attributes = True

class WishlistListResponse(BaseModel):
    wishlist: List[WishlistResponse]

