import uuid
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Column, String, Boolean, DateTime,Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from backend.app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4 ,unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    is_verified = Column(Boolean,default=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    update_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False, default=2) 

    role = relationship("Role", back_populates="users", passive_deletes=True)
    properties = relationship("Property", back_populates="owner", passive_deletes=True)
    wishlist = relationship("Wishlist", back_populates="user", passive_deletes=True)
    reviews = relationship("Review", back_populates="user", passive_deletes=True)


class Role(Base):
    __tablename__= "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    is_admin = Column(Boolean, default=False)

    users = relationship("User", back_populates="role", passive_deletes=True)

    


    
