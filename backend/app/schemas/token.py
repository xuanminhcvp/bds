from pydantic import BaseModel, Field
from typing import Optional

class Token(BaseModel):
    access_token: str 
    token_type: str 

class TokenPayload(BaseModel):
    sub: Optional[int] = None 
    exp: Optional[int] = None 

class Message(BaseModel):
    message: str 

class NewPassword(BaseModel):
    token: str 
    new_password: str = Field(..., min_length=8, max_length=40)

class UpdatePassword(BaseModel):
    current_password: str = Field(..., min_length=8, max_length=40)
    new_password: str = Field(..., min_length=8, max_length=40)



