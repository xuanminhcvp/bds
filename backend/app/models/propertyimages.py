from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID 
import uuid 
from backend.app.database import Base

class PropertyImage(Base):
    __tablename__ = "property_images"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    property_id = Column(UUID(as_uuid=True), ForeignKey('properties.id'), nullable=False)
    image_url = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False, nullable=False)
    
    def __repr__(self):
        return f"<PropertyImage(id={self.id}, property_id={self.property_id}, is_primary={self.is_primary})>"