from fastapi import APIRouter
from backend.schemas.propertyimage import PropertyImageCreate, PropertyImageResponse
from backend.app.services.property_image_service import PropertyImageService
from backend.app.api.deps import SessionDep

router = APIRouter(prefix="/property-images", tags=["Property-Images"])

@router.post("/", response_model=PropertyImageResponse)
async def create_property_image(session: SessionDep, data: PropertyImageResponse):
    return await PropertyImageService.create_property_image(session, data)

