from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.database import Base
from datetime import timedelta

class Project(Base):
    __tablename__ = "project"
    project_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    title = Column(String, index=True, nullable=False)
    description = Column(String)
    area = Column(Float)
    address = Column(String)
    status = Column(String, nullable=False) 
    images = Column(ARRAY(String))  
    company = Column(String)
    is_approved = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now() + timedelta(days=3))

    transaction = relationship("Transaction", back_populates="project", cascade="all, delete-orphan")
    user = relationship("User", back_populates="project")