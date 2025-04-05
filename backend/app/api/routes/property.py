from uuid import UUID 
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from backend.app.api.deps import SessionDep
from backend.app.models.property import Property
from backend.schemas.property import PropertyCreate, PropertyUpdate, PropertyResponse, Property1
from backend.app.services.property_service import PropertyService
from backend.app.api.deps import CurrentUser
from sqlalchemy.future import select 
import logging

router = APIRouter(prefix="/properties", tags=["properties"])

logging.basicConfig(level=logging.DEBUG)

@router.post("/", response_model=PropertyResponse)
async def create_property(session: SessionDep, property_data: PropertyCreate):
    print(f"Received request to register user: {property_data.title}")
    return await PropertyService.create_property(session=session, property_data=property_data)
    
@router.get("/", response_model=list[PropertyResponse])
async def get_properties(session: SessionDep):
    return await PropertyService.get_properties(session)

@router.get("/{property_id}", response_model=Property1)
async def get_property_by_id(property_id: UUID, session: SessionDep):
    return await PropertyService.get_property_by_id(session=session, property_id=property_id)

@router.put("/{property_id}", response_model=Property1)
async def update_property(session: SessionDep, property_id: UUID, updated_data: PropertyUpdate):
    property = await PropertyService.get_property_by_id(session, property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return await PropertyService.update_property(session, property_id, updated_data)

@router.delete("/{property_id}")
async def delete_property(session: SessionDep, property_id: UUID):
    property = await PropertyService.get_property_by_id(session, property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return await PropertyService.delete_property(session, property_id)
    







