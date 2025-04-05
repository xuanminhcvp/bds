import uuid 
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="wishlist", passive_deletes=True)
    property = relationship("Property", back_populates="wishlist", passive_deletes=True)

    