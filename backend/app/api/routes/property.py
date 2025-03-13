from sqlalchemy.dialects.postgresql import UUID 
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from backend.app.api.deps import SessionDep
from backend.app.models.property import Property
from backend.schemas.property import PropertyCreate, PropertyUpdate, PropertyResponse
from backend.app.services.property_service import PropertyService
from backend.app.api.deps import get_current_user

router = APIRouter(prefix="/property", tags=["property"])

@router.post("/", response_model=PropertyResponse)
async def create_property(session: SessionDep, property_data: PropertyCreate, user_id: UUID = Depends(get_current_user)):
    try:
        return await PropertyService.create_property(session=session, property_data=property_data, user_id=user_id)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=f"Error while creating property: {str(e.detail)}")
    
    