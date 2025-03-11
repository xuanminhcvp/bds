from fastapi import APIRouter, HTTPException
from typing import List
from backend.app.api.deps import SessionDep
from backend.app.models.property import Property
from backend.schemas.property import PropertyCreate, PropertyUpdate, PropertyResponse
from backend.app.services.property_service import PropertyService

router = APIRouter(prefix="/property", tag=["property"])

@router.post("/", response_model=PropertyResponse)
async def create_property(session: SessionDep, property_data: PropertyCreate):
    return await PropertyService.create_property(session, property_data)