import uuid 
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from backend.app.database import Base

class Duan(Base):
    __tablename__ = "duan"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, index=True)
    area = Column(Float)
    address = Column(String)
    description = Column(String)
    images = Column(ARRAY(String))  
    company = Column(String)

