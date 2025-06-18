from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from uuid import UUID
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = None
    image_url: Optional[List[str]] = None
    tags: Optional[List[str]] = None

class PostResponse(BaseModel):
    id: int
    title: str
    slug: str
    content: str
    category: Optional[str] = None
    user_id: UUID
    published_at: datetime
    updated_at: datetime
    image_url: Optional[List[str]] = None
    tags: Optional[List[str]] = None

    
    