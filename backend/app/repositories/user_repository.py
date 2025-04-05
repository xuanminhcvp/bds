from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID 
from typing import List, Optional
from backend.app.models import User, Property
from backend.schemas.user import UserSchema
from backend.schemas.user import UserRegister, UserUpdate, UserCreate 
from sqlalchemy import select, delete
from pydantic import EmailStr


class UserRepository:
    
    #done
    @staticmethod
    async def get_user_by_id(session: AsyncSession, user_id: UUID):
        stmt = select(User).where(User.id == user_id)  
        result = await session.execute(stmt) 
        return result.scalars().first()
    
    #done
    @staticmethod
    async def register_user(session: AsyncSession, user_create: UserRegister) -> User:
        new_user = User(
            email = user_create.email,
            full_name = user_create.full_name,
            hashed_password = user_create.password
        )
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        return new_user 
    
    #done
    @staticmethod
    async def get_user_by_email(session: AsyncSession, email: EmailStr) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = await session.execute(stmt)
        return result.scalars().first()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    