import uuid
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Integer, Column, DateTime, ForeignKey, Text
from backend.app.database import Base
from datetime import datetime, timezone

class ContactHistory(Base):
    __tablename__ = "contact_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message = Column(Text)
    contact_date = Column(DateTime, default=datetime.now(timezone.utc))
    property_id = Column(UUID(as_uuid=True), ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    

