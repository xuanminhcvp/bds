import uuid
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Column, String, Boolean, Integer
from backend.app.database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    image_url = Column(String)
    is_primary = Column(Boolean, default=False)

    