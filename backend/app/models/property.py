import uuid 
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, Integer, DECIMAL, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from backend.app.database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(DECIMAL(10,2), nullable=False)
    location = Column(String, nullable=False)
    area = Column(DECIMAL(10,2), nullable=False)
    bedrooms = Column(Integer, nullable=False)
    bathrooms = Column(Integer, nullable=False)
    property_type = Column(String, nullable=False)
    status = Column(String, nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    owner = relationship("User", back_populates="properties", passive_deletes=True)
    wishlist = relationship("Wishlist", back_populates="property", passive_deletes=True)
    reviews = relationship("Review", back_populates="property", passive_deletes=True)

    def __str__(self):
        return f"Property(id={self.id}, title={self.title}, description={self.description}, bedrooms={self.bedrooms}, bathrooms={self.bathrooms})"

