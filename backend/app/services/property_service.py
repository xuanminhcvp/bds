from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.property_repository import PropertyRepository
from backend.schemas.property import PropertyCreate, PropertyUpdate, PropertiesResponse, PropertyResponse
from backend.app.models.property import Property

class PropertyService:
    @staticmethod
    async def create_property(session: AsyncSession, property_data: PropertyCreate, user_id: UUID) -> PropertyResponse:
        result = await PropertyRepository.get_properties_by_id(session, user_id)
        existing_properties = result.scalars().all()
        
        for existing_property in existing_properties:
            if (fuzz.ratio(existing_property.title.lower(), property_data.title.lower()) >= 90 or
                fuzz.ratio(existing_property.location.lower(), property_data.location.lower()) >= 90):
                raise HTTPException(
                    status_code=400,
                    detail="You have already created a similar property with the same name or address."
                )
        new_property = await PropertyRepository.create_property(session, property_data, user_id)
        return new_property
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    @staticmethod 
    async def list_properties(db: AsyncSession):
        return await PropertyRepository.get_all_properties(db)
        
    @staticmethod
    async def get_property_by_id(session: AsyncSession, property_id: UUID):
        return await PropertyRepository.get_property_by_id(session, property_id)
    
    @staticmethod
    async def add_property(db: AsyncSession, property_data: PropertyCreate):
        return await PropertyRepository.create_property(db, property_data)
    
    @staticmethod
    async def update_property(db: AsyncSession, property_id: int, update_data: PropertyUpdate):
        return await PropertyRepository.update_property(db, property_id, update_data)
    
    @staticmethod
    async def delete_property(db: AsyncSession, property_id: int):
        return await PropertyRepository.delete_property(db, property_id)
    
    
        
