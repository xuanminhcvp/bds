from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    property_id = Column(String, ForeignKey("properties.id"), nullable=False)

    user = relationship("User", back_populates="wishlists")
    property = relationship("Property", back_populates="wishlists")

    