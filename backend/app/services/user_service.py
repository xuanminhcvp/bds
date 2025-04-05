import uuid 
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID 
from typing import List, Optional
from backend.app.repositories.user_repository import UserRepository
from backend.app.core.security import get_password_hash, verify_password, create_access_token
from fastapi import HTTPException
from datetime import timedelta
from backend.app.core.config import settings

from backend.app.models import User
from backend.schemas.user import UserCreate, UserUpdate, UserPublic, UserRegister, UserSchema, UserHashed, UserLogin
from backend.schemas.token import Message, Token

class UserService:
    
    #done
    @staticmethod
    async def get_user_by_id(session: AsyncSession, user_id: UUID):
        return await UserRepository.get_user_by_id(session, user_id)
    
    #done
    @staticmethod
    async def register_user(session: AsyncSession, user_in: UserRegister) -> UserPublic:
        existing_user = await UserRepository.get_user_by_email(session, user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists in the system"
            ) 
        hashed_password = get_password_hash(user_in.password)
        user_create = UserHashed(
            email=user_in.email,
            full_name=user_in.full_name,
            password=hashed_password
        )
        new_user = await UserRepository.register_user(session, user_create)
        return UserPublic(id=new_user.id, email=new_user.email, full_name=new_user.full_name)
      
    #done  
    @staticmethod
    async def login(session: AsyncSession, user_in: UserLogin) -> Token:
        user = await UserRepository.get_user_by_email(session, user_in.email)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
        if not verify_password(user_in.password, user.hashed_password):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(user.id, expires_delta=access_token_expires)
        return Token(
            access_token=access_token,
            token_type="bearer"
        )
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @staticmethod
    async def delete_user(session: AsyncSession, user_id: UUID):
        user = await UserRepository.get_user_by_id(session, user_id)
        print(f"User found: {user}")  # Debugging
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        await UserRepository.delete_user_properties(session, user_id)
        UserRepository.delete_user(session, user)
        
        try:
            await session.flush()  # Đẩy thay đổi lên DB trước khi commit
            await session.commit()
            print("✅ User deleted successfully!")  # Debugging
        except Exception as e:
            await session.rollback()
            print(f"❌ Lỗi khi commit: {e}")  # Debugging
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

        
        return Message(message="Deteled user successfully")
    
    
    
    
    
    
    
    
    
    
    
    
    
    @staticmethod
    def get_user_by_email(session: AsyncSession, email: str):
        return UserRepository.get_user_by_email(session, email)
    
    @staticmethod
    def create_user(session: AsyncSession, user_data: UserCreate) -> UserRegister:
        hashed_password = get_password_hash(user_data.password)
        new_user = User(
            email = user_data.email,
            full_name  = user_data.full_name,
            hashed_password = hashed_password
        )
        return UserRepository.create_user(session, new_user)
    
    @staticmethod
    def update_user(session: AsyncSession, user_id: uuid.UUID, user_data: UserUpdate):
        user = UserRepository.get_user_by_id(session, user_id)
        if not user: 
            return None
        for key, value in user_data.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
            
        return UserRepository.update_user(session, user)
    
    
    
    
    
    