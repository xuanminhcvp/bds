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

from backend.app.core import security
from backend.app.core.config import settings
from backend.app.core.db import AsyncSessionLocal
from backend.app.models import User 
from backend.schemas.user import UserSchema
from backend.schemas.token import Token, TokenPayload
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

SessionDep = Annotated[AsyncSession, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]

async def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        print(f"DEBUG - Raw Token Payload: {token_data}")
        
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
        
        
    try:
        print(f"DEBUG - token_data.sub: {token_data.sub}")
        
        if isinstance(token_data.sub, int):
            user_id = token_data.sub  
        else:
            user_id = uuid.UUID(token_data.sub)
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    
    
    user = await session.execute(select(User).where(User.id == user_id))  
    user = user.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]

async def get_current_active_superuser(current_user: CurrentUser) -> UserSchema:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user