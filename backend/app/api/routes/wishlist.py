from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import SessionDep
from schemas.wishlist import WishlistResponse, WishlistCreate
from app.models import Wishlist
from typing import Any 

router = APIRouter(prefix="/wishlist", tags=["wishlist"])

@router.post("/wishlist/", response_model=WishlistResponse)
def add_to_wishlist(session: SessionDep, wishlist: WishlistCreate) -> Any:
    existing_entry = session.execute(Wishlist).filter(Wishlist.user_id == user_id, Wishlist.property_id == wishlist.property_id).first()

    if existing_entry:
        raise HTTPException(status_code=404, detail="Already in wishlist")
    
    new_wishlist = Wishlist(id=str(uuid.uuid4()), user_id=user_id, property_id=wishlist.property_id)
    session.add(new_wishlist)
    session.commit()
    session.refresh(new_wishlist)
    return new_wishlist

@router.get("/wishlist/{user_id}", response_model=WishlistResponse)
def get_wishlist(session: SessionDep, user_id: str):
    wishlist = session.execute(Wishlist).filter(Wishlist.user_id == user_id).all()
    return wishlist

@router.delete("/wishlist/{property_id}")
def remove_from_wishlist(session: SessionDep, property_id: str):
    wishlist_item = session.execute(Wishlist).filter(Wishlist.user_id == user_id, Wishlist.property_id == property_id).first()

    if not wishlist_item:
        raise HTTPException(status_code=404, detail="Not found in wistlist")
    
    session.delete(wishlist_item) 
    session.commit()
    return {"message":"Remove from wishlist"}



