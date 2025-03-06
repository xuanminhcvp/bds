from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func 
from sqlalchemy.orm import relationship
from backend.app.database import Base 

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    property_id = Column(Integer, ForeignKey("properties.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="reviews")
    property = relationship("Property", back_populates="reviews")
