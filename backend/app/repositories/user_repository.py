from sqlalchemy.orm import Session
import uuid 
from typing import List, Optional
from backend.app.models import User
from backend.schemas.user import UserSchema
from backend.schemas.user import UserRegister, UserUpdate 

class UserRepository:
    @staticmethod
    def get_user_by_id(session: Session, user_id: uuid.UUID):
        return session.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(session: Session, email: str):
        return session.query(User).filter(User.email == email).first()
    
    @staticmethod
    def create_user(session: Session, user: UserRegister):
        session.add(user)
        session.commit()
        session.refresh(user)
        return user 
    
    @staticmethod 
    def update_user(session: Session, user: UserUpdate):
        session.commit()
        session.refresh(user)
        return user 
    
    @staticmethod
    def delete_user(session: Session, user: UserSchema):
        session.delete(user)
        session.refresh(user)
        return user 
    
    
        
