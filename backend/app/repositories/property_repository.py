from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql.functions import func  
# from backend.schemas.property import Property
from backend.app.models.property import Property
from backend.schemas.property import PropertyCreate, PropertyResponse, Property1, PropertyUpdate
from uuid import uuid4
from sqlalchemy.orm import joinedload
from typing import List, Optional

class PropertyRepository:
    @staticmethod
    async def create_property(session: AsyncSession, property_data: PropertyCreate):
        new_property = Property(
            title = property_data.title,
            description = property_data.description,
            price = property_data.price,
            location = property_data.location,
            area = property_data.area,
            bedrooms = property_data.bedrooms,
            bathrooms = property_data.bathrooms,
            property_type= property_data.property_type,
            status = property_data.status,
            owner_id = property_data.owner_id,
            is_verified = property_data.is_verified
        )
        session.add(new_property)
        await session.commit()
        await session.refresh(new_property)
        return new_property
    
    @staticmethod
    async def get_properties_by_user_id(session: AsyncSession, user_id: UUID):
        result = await session.execute(select(Property).where(Property.owner_id == user_id))
        return result
    
    @staticmethod
    async def count_properties(
        session: AsyncSession,
        min_price: Optional[float],
        max_price: Optional[float],
        min_area: Optional[float],
        max_area: Optional[float]
    ) -> int:
        stmt = select(func.count()).select_from(Property)
        if min_price is not None and max_price is not None:
            stmt = stmt.where(Property.price.between(min_price, max_price))
        elif min_price is not None:
            stmt = stmt.where(Property.price >= min_price)
        elif max_price is not None:
            stmt = stmt.where(Property.price <= max_price)
            
        if min_area is not None and max_area is not None:
            stmt = stmt.where(Property.area.between(min_area, max_area))
        elif min_area is not None:
            stmt = stmt.where(Property.area >= min_area)
        elif max_area is not None:
            stmt = stmt.where(Property.area <= max_area)
            
        result = await session.execute(stmt)
        return result.scalar_one()

    @staticmethod
    async def get_properties(
        session: AsyncSession,
        min_price: Optional[float],
        max_price: Optional[float],
        min_area: Optional[float],
        max_area: Optional[float],
        limit: int,
        offset: int
    ) -> List[Property]:
        stmt = select(Property).options(joinedload(Property.owner))
        if min_price is not None and max_price is not None:
            stmt = stmt.where(Property.price.between(min_price, max_price))
        elif min_price is not None:
            stmt = stmt.where(Property.price >= min_price)
        elif max_price is not None:
            stmt = stmt.where(Property.price <= max_price)

        if min_area is not None and max_area is not None:
            stmt = stmt.where(Property.area.between(min_area, max_area))
        elif min_area is not None:
            stmt = stmt.where(Property.area >= min_area)
        elif max_area is not None:
            stmt = stmt.where(Property.area <= max_area)

        stmt = stmt.offset(offset).limit(limit)
        result = await session.execute(stmt)
        return result.scalars().all()
        
    @staticmethod
    async def get_property_by_id(session: AsyncSession, property_id: UUID):
        result = await session.execute(select(Property).filter(Property.id == property_id))
        property = result.scalars().first()
        return property
    
    @staticmethod
    async def update_property(session: AsyncSession, property_id: UUID, updated_data: PropertyUpdate):
        update_dict = updated_data.model_dump(exclude_unset=True)
        db_property = await PropertyRepository.get_property_by_id(session, property_id)
        
        for key, value in update_dict.items():
            setattr(db_property, key, value)
        
        session.add(db_property)
        await session.commit()
        await session.refresh(db_property)     
        
        return db_property
    
    @staticmethod
    async def delete_property(session: AsyncSession, property_id: UUID):
        property = await PropertyRepository.get_property_by_id(session, property_id)
        await session.delete(property)
        await session.commit() 

