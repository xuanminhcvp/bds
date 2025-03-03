from fastapi import APIRouter, HTTPException
from typing import List, Optional, Any
from uuid import uuid4
from app.api.deps import SessionDep
from schemas.property import Property, PropertyResponse, PropertiesResponse, PropertyCreate, PropertyUpdate, ApprovePostResponse, PreviewPostResponse

router = APIRouter(prefix="/properties", tags=["properties"])

@router.get("/", response_model=PropertiesResponse)
def get_properties(
    session: SessionDep, 
    location: Optional[str] = None, 
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    approved: Optional[bool] = None
    ) -> Any:
    filters = {
        Property.location.ilike(f"%location%") if location else None,
        Property.price >= min_price if min_price is not None else None,
        Property.price <= max_price if max_price is not None else None,
        Property.status == ("aproved" if approved else "pending") if approved is not None else None   
    }
    statement = select(Property).filter(*filter(None, filters))
    data = session.exec(statement)
    return data
    
@router.get("/{id}/", response_model=PropertyResponse)
def get_property_by_id(session: SessionDep, id: str) -> Any:
    statement = select(Property).filter(Property.id == id).first()
    property_item = session.exec(statement)
    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )
    return property_item

@router.post("/", response_model=PropertyResponse)
def create_property(session: SessionDep, property_data: PropertyCreate) -> Any:
    session.add(property_data)
    session.commit()
    session.refresh(property_data)
    return property_data

@router.put("{id}", response_model=PropertyResponse)
def update_property(id:str, session: SessionDep, property_update: PropertyUpdate) -> Any:
    statement = select(Property).filter(Property.id == id).first()
    property_item = session.exec(statement)
    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="property not found"
        )
    property_item.update(property_update.model_dump(exclude_unset=True))
    session.commit()
    session.refresh(property_item)

    return property_item

@router.delete("/{id}/", response_model="DeletePostResponse")
def delete_property(session: SessionDep, id: str) -> Any:
    statement = select(Property).filter(Property.id == id).first()
    property_item = session.exec(statement)
    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="property not found"
        )
    session.delete(property_item)
    session.commit()

    return {"message": "Property delete successfully"}

@router.patch("/{id}/approve", response_model=ApprovePostResponse)
def approve_property(session: SessionDep, id: str) -> Any:
    statement = select(Property).filter(Property.id == id).first()
    property_item = session.exec(statement)
    if not property_item:
        raise HTTPException (
            status_code=404,
            detail="Property not found"
        )
    if property_item.status == "approved":
        raise HTTPException(
            status_code=400,
            detail="Property is already approved"
        )
    property_item.status = "approved"
    session.commit()
    session.refresh(property_item)

    return {"message": "Property approved successfully", "post_id": id, "is_approved": True}

@router.get("/{id}/preview", response_model=PreviewPostResponse)
def preview_property(id: str, session: SessionDep) -> Any:
    statement = select(Property).filter(Property.id == id).first()
    property_item = session.exec(statement)

    if not property_item: 
        raise HTTPException(
            status_code=404,
            detail="Property not found"
            )
    return {"preview": property_item}








