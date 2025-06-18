from sqlalchemy import Integer, Column, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from backend.app.database import Base

class Favorite(Base):
    __tablename__ = 'favorite'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID, ForeignKey('user.id'), nullable=False)
    property_id = Column(Integer, ForeignKey('property.property_id'), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    __table_args__ = (
        UniqueConstraint('user_id', 'property_id', name='uq_user_property'),
    )
    user = relationship('User', back_populates='favorite')
    property = relationship('Property', back_populates='favorite')