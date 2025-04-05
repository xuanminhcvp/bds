from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.property_repository import PropertyRepository
from backend.schemas.property import PropertyCreate, PropertyUpdate, PropertiesResponse, PropertyResponse
from backend.app.models.property import Property

class PropertyService:
    @staticmethod
    async def create_property(session: AsyncSession, property_data: PropertyCreate):
        new_property = await PropertyRepository.create_property(session, property_data)
        return new_property
    
    @staticmethod
    async def get_properties(session: AsyncSession):
        properties = await PropertyRepository.get_properties(session)
        return properties
    
    @staticmethod
    async def get_property_by_id(session: AsyncSession, property_id: UUID):
        property = await PropertyRepository.get_property_by_id(session, property_id)
        return property
    
    @staticmethod
    async def update_property(session: AsyncSession, property_id: UUID, updated_data: PropertyUpdate):
        return await PropertyRepository.update_property(session, property_id, updated_data)

    @staticmethod
    async def delete_property(session: AsyncSession, property_id: UUID):
        await PropertyRepository.delete_property(session, property_id)
        
        