from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.database import Base
from sqlalchemy.dialects.postgresql import UUID, ARRAY 
import uuid

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    user_id = Column(UUID, ForeignKey('user.id'))
    published_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    image_url = Column(ARRAY(String), nullable=True)
    tags = Column(ARRAY(String), nullable=True)

    user = relationship("User", back_populates="posts")

