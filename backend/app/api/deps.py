from collections.abc import AsyncGenerator
from typing import Annotated

import uuid 
from uuid import UUID 
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError, BaseModel
from backend.app.core import security
from backend.app.core.config import settings
from backend.app.core.db import AsyncSessionLocal
from backend.app.model import User 
from backend.app.schemas.user import UserSchema, UserPublic
from backend.app.schemas.token import Token, TokenPayload
from sqlalchemy import select
from typing import Optional

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)
TokenDep = Annotated[str, Depends(reusable_oauth2)]

# Database session
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
SessionDep = Annotated[AsyncSession, Depends(get_db)]

# Token payload model
class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
    iat: Optional[int] = None
    nbf: Optional[int] = None

    class Config:
        extra = "allow"  

# Get current user
async def get_current_user(session: SessionDep, token: TokenDep) -> UserPublic:
    credentials_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except InvalidTokenError as e:
        raise credentials_exception
        
    except ValidationError as e:
        raise credentials_exception
    try:
        user_id_uuid = UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    user = await session.execute(select(User).where(User.id == user_id_uuid))
    user = user.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_public = UserPublic(
        id=str(user.id),
        email=user.email,
        name=user.name
    )
    return user_public

CurrentUser = Annotated[UserPublic, Depends(get_current_user)]

async def get_current_active_superuser(current_user: CurrentUser) -> UserSchema:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user