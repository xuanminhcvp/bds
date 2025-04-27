import uuid 
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.app.database import Base
from datetime import datetime

class Post(Base):
    __tablename__ = "posts"

