from pydantic import BaseModel
from typing import List
import uuid

class DuanSchema(BaseModel):
    title: str
    area: float
    address: str
    description: str
    images: List[str]
    company: str

    class Config:
        from_attributes = True