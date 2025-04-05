from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.property_image_repository import PropertyImageRepository
from backend.schemas.propertyimage import PropertyImageCreate
from backend.app.models.propertyimages import PropertyImage

class PropertyImageService:
    
    @staticmethod
    async def create_property_image(session: AsyncSession, data: PropertyImageCreate) -> PropertyImage:
        return await PropertyImageRepository.create_property_image(session, data)