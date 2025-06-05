from sqlalchemy import Column, String, Numeric, Integer, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.dialects.postgresql import UUID
from backend.app.database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import timedelta

class Property(Base):
    __tablename__ = "property"
    property_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)  
    area = Column(Float, nullable=False)  
    address = Column(String, nullable=False)
    bedrooms = Column(Integer )
    bathrooms = Column(Integer )
    property_type = Column(String, nullable=False)
    category = Column(String, nullable=False)
    status = Column(String, nullable=False, default="pending")
    views = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now() + timedelta(days=3))
    images = relationship("PropertyImage", back_populates="property")
    user = relationship("User", back_populates="property")
    transaction = relationship("Transaction", back_populates="property")

class PropertyImage(Base):
    __tablename__ = "property_image"
    image_id = Column(Integer, primary_key=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey("property.property_id"), nullable=False)
    image_url = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    property = relationship("Property", back_populates="images")