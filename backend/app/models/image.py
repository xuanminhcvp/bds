from sqlalchemy import Column, String, Boolean, Integer
from backend.app.database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True)
    image_url = Column(String)
    is_primary = Column(Boolean, default=False)

 