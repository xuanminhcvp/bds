import uuid 
from sqlalchemy import Integer, Column, DateTime, ForeignKey, Text, String, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID
from backend.app.database import Base
from datetime import datetime, timezone

class CrawledProperty(Base):
    __tablename__ = "crawled_properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String)
    price = Column(Float)
    location = Column(String)
    description = Column(Text)
    source_url = Column(String)
    is_crawled = Column(Boolean)
    crawled_at = Column(DateTime, default=datetime.now(timezone.utc))

    