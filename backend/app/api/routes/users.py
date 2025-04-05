import uuid 
from uuid import UUID 
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from backend.app.api.deps import get_current_active_superuser, SessionDep
from backend.app import crud
from backend.schemas.user import UserPublic, UsersPublic, UserCreate, UserSchema, UserRegister, UserUpdate, UserLogin
from backend.schemas.token import Message, UpdatePassword, Token
from backend.app.models import User
from backend.app.api.deps import CurrentUser
from backend.app.core.security import verify_password, get_password_hash
from backend.app.services.user_service import UserService
from sqlmodel import func, select


router = APIRouter(prefix="/users", tags=["users"])

#done 
@router.get("/{user_id}", response_model=UserPublic)
async def get_user_by_id(session: SessionDep, user_id: UUID) -> Any:
    user = await UserService.get_user_by_id(session, user_id)
     #if user == current_user:
        #return user 
    # if not current_user.is_superuser:
        #return HTTPException(
            #status_code=403,
            #detail="The user doesn't have enough privileges",
        #)
    return user

#done
@router.post("/signup", response_model=UserPublic)
async def register_user(session: SessionDep, user_in: UserRegister):
    return await UserService.register_user(session, user_in)

#done
@router.post("/login", response_model=Token)
async def user_login(session: SessionDep, user_in: UserLogin):
    return await UserService.login(session, user_in) 

@router.get("/123/me", response_model=UserPublic)
async def get_current_user(current_user: CurrentUser):
    return current_user















