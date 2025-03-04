from pydantic import BaseModel

class DeletePostResponse(BaseModel):
    message: str 

    