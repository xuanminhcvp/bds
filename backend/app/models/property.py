import uuid 
from sqlalchemy import Column, String, Integer, DECIMAL, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(DECIMAL(10,2), nullable=False)
    location = Column(String, nullable=False)
    area = Column(DECIMAL(10,2), nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    property_type = Column(String, nullable=False)
    status = Column(String, nullable=False)
    owner_id = Column(String, ForeignKey("user.id"), nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    update_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    owner = relationship("User", back_populates="propertied")
    reviews = relationship("Review", back_populates="property")



