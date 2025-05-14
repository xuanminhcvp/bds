from fastapi import HTTPException
from typing import Optional, List, Dict, Any
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
    async def get_properties(
        session: AsyncSession,
        price_range: Optional[str],
        area_range: Optional[str],
        limit: int,
        offset: int
        ) -> Dict[str, Any]:
        print("DEBUG: Inside get_properties service, session received")
        try:
            if price_range:
                parts = price_range.split("-")
                min_price = float(parts[0]) if parts[0] else None
                max_price = float(parts[1]) if len(parts) > 1 and parts[1] else None
            else:
                min_price = max_price = None
        except ValueError:
            raise ValueError("Invalid price_range format. Use 'min-max'.")

        try:
            if area_range:
                parts = area_range.split("-")
                min_area = float(parts[0]) if parts[0] else None
                max_area = float(parts[1]) if len(parts) > 1 and parts[1] else None
            else:
                min_area = max_area = None
        except ValueError:
            raise ValueError("Invalid area_range format. Use 'min-max'.")
        
        total = await PropertyRepository.count_properties(
            session, min_price, max_price, min_area, max_area
        )

        items = await PropertyRepository.get_properties(
            session, min_price, max_price, min_area, max_area, limit, offset
        )

        return {
            "total": total,
            "results": items
        }

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
        
        