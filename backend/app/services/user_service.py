import uuid 
from sqlalchemy.orm import Session
from uuid import UUID 
from typing import List, Optional
from backend.app.repositories.user_repository import UserRepository
from backend.app.core.security import get_password_hash
from fastapi import HTTPException

from backend.app.models import User
from backend.schemas.user import UserCreate, UserUpdate, UserPublic, UserRegister, UserSchema

class UserService:
    @staticmethod
    def get_user_by_id(session: Session, user_id: uuid.UUID):
        return UserRepository.get_user_by_id(session, user_id)
    
    @staticmethod
    def get_user_by_email(session: Session, email: str):
        return UserRepository.get_user_by_email(session, email)
    
    @staticmethod
    def create_user(session: Session, user_data: UserCreate) -> UserRegister:
        hashed_password = get_password_hash(user_data.password)
        new_user = User(
            email = user_data.email,
            full_name  = user_data.full_name,
            hashed_password = hashed_password
        )
        return UserRepository.create_user(session, new_user)
    
    @staticmethod
    def update_user(session: Session, user_id: uuid.UUID, user_data: UserUpdate):
        user = UserRepository.get_user_by_id(session, user_id)
        if not user: 
            return None
        for key, value in user_data.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
            
        return UserRepository.update_user(session, user)
    
    @staticmethod
    def delete_user(session: Session, user_id: uuid.UUID, current_user: UserSchema):
        user = UserRepository.get_user_by_id(session, user_id)
        if not user:
            raise HTTPException(
                status_code=404,
                detail="user not found"
            )
        if user == current_user:
            raise HTTPException(
                status_code=403,
                detail="super users are not allowed to delete themselves"
            )
        UserRepository.delete_user_properties(session, user_id)
        UserRepository.delete_user(session, user)
        session.commit()
        
        return Message(message="Deteled user successfully")
    
    
    
    