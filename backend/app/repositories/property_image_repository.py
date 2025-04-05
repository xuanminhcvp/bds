from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.propertyimages import PropertyImage
from backend.schemas.propertyimage import PropertyImageCreate

class PropertyImageRepository: 
    @staticmethod
    async def create_property_image(session: AsyncSession, data: PropertyImageCreate) -> PropertyImage:
        new_image = PropertyImage(**data.model_dump())
        session.add(new_image)
        await session.commit()
        await session.refresh(new_image)
        return new_image
    
    