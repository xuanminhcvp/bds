from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Wishlist(Base):
    __tablename__ = "wishlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)

    user = relationship("User", back_populates="wishlist")
    property = relationship("Property", back_populates="wishlist")

    