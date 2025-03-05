from sqlalchemy import Integer, Column, DateTime, ForeignKey, Text
from app.database import Base
from datetime import datetime, timezone

class ContactHistory(Base):
    __tablename__ = "contact_history"

    id = Column(Integer, primary_key=True)
    message = Column(Text)
    contact_date = Column(DateTime, default=datetime.now(timezone.utc))

    property_id = Column(Integer, ForeignKey("properties.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

