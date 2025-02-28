from sqlalchemy.ext.asyncio import AsyncSession
from repositories.property_repository import PropertyRepository
from schemas.property import PropertyCreate, PropertyUpdate

class PropertyService:
    @staticmethod 
    async def list_properties(db: AsyncSession):
        return await PropertyRepository.get_all_properties(db)
    
    @staticmethod
    async def get_property_by_id(db: AsyncSession, property_id: int):
        return await PropertyRepository.get_property_by_id(db, property_id)
    
    @staticmethod
    async def add_property(db: AsyncSession, property_data: PropertyCreate):
        return await PropertyRepository.create_property(db, property_data)
    
    @staticmethod
    async def update_property(db: AsyncSession, property_id: int, update_data: PropertyUpdate):
        return await PropertyRepository.update_property(db, property_id, update_data)
    
    @staticmethod
    async def delete_property(db: AsyncSession, property_id: int):
        return await PropertyRepository.delete_property(db, property_id)
    
    
        
