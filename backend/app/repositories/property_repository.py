from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select 
from schemas.property import Property

class PropertyRepository:
    @staticmethod
    async def get_all_properties(db: AsyncSession):
        result = await db.execute(select(property)) 
        return result.scalars().all()

    @staticmethod
    async def get_property_by_id(db: AsyncSession, property_id: int):
        return await db.get(Property, property_id)

    @staticmethod
    async def create_property(db: AsyncSession, property_data):
        new_property = Property(**property_data.dict())
        db.add(new_property)
        await db.commit()
        await db.refresh(new_property)
        return new_property

    @staticmethod
    async def update_property(db: AsyncSession, property_id: int, update_data):
        property = await db.get(Property, property_id)
        if not property:
            return None
        for key, value in update_data.dict(exclude_unset=True).item():
            setattr(property, key, value)
        await db.commit()
        await db.refresh(property)
        return property 

    @staticmethod
    async def delete_property(db: AsyncSession, property_id: int):
        property = await db.get(Property, property_id)
        if not property:
            return None
        await db.delete(property)
        await db.commit()
        return True

    
