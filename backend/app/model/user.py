import uuid
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.database import Base

class User(Base):
    __tablename__ = "user"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4 ,unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    is_superuser = Column(Boolean, default=False)
    name = Column(String)
    hashed_password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    avatar = Column(String, nullable=True)  
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    update_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now()) 
    wallet = relationship("Wallet", back_populates="user", cascade=("all, delete"))
    property = relationship("Property", back_populates="user")
    transaction = relationship("Transaction", back_populates="user")
    project = relationship("Project", back_populates="user")
    notification = relationship("Notification", back_populates="user")

