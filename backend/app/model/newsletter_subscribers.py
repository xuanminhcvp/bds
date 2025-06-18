from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.database import Base

class NewsletterSubscriber(Base):
    __tablename__ = 'newsletter_subscribers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)