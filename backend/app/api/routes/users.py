import uuid
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_active_superuser, SessionDep
from app import crud
from schemas.user import UserPublic, UsersPublic, UserCreate, UserSchema, UserRegister, UserUpdate
from schemas.token import Message, UpdatePassword
from app.models.user import User
from app.api.deps import CurrentUser
from app.core.security import verify_password, get_password_hash
from sqlmodel import func, select


router = APIRouter(prefix="/users", tags=["users"])

@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic,
)
def read_users(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(User)
    count = session.exec(count_statement).one()

    statement = select(User).offset(skip).limit(limit)
    users = session.exec(statement).all()

    return UserPublic(data=users, count=count)

@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=UserPublic
)
def creat_user(*, session: SessionDep, user_in: UserCreate) -> Any:
    user = crud.get_user_by_email(session= session, email= user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    user = crud.create_user(session=session, user_create= user_in)
    return user 

@router.patch(
    "/me/password",
    response_model=Message
)
def update_password_me(
    *, session: SessionDep, body: UpdatePassword, current_user: CurrentUser
) -> Any:
    if not verify_password(body.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail="Incorrect Password"
        )
    if body.current_password == body.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password cannot be the same as the current one"
        )
    hashed_password = get_password_hash(body.new_password)
    current_user.hashed_password = hashed_password
    session.add(current_user)
    session.commit()
    return Message(message="Password updated successfully")

@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser) -> Any:
    return current_user

@router.delete("/me", response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser) -> Any:
    if current_user.is_superuser:
        raise HTTPException(
            status_code=403,
            detail="Super users are not allowed to delete themselves"
        )
    statement = delete(Property).where(col(Property.owner_id) == current_user.id)
    session.exec(statement)
    session.delete(current_user)
    session.commit()
    return Message(message="user deleted successfully")


@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="the user with this email already exist in the system"
        )
    user_create = UserCreate.model_validate(user_in)
    user = crud.create_user(session=session, user_create=user_create)
    return user 

@router.get("/{user_id}", response_model=UserPublic)
def get_user_by_id(user_id: uuid.UUID, session: SessionDep, current_user: CurrentUser) -> Any:
    user = session.get(User, user_id) 
    if user == current_user:
        return user 
    if not current_user.is_superuser:
        return HTTPException(
            status_code=403,
            detail="The user doesn't have enough privileges",
        )
    return user 

@router.patch("{user_id}", dependencies=[Depends(get_current_active_superuser)], response_model=UserPublic)
def update_user(
    *,
    session: SessionDep,
    user_id: uuid.UUID,
    user_in: UserUpdate,
) -> Any:
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException (
            status_code=404,
            detail="The user with this id dosen't exist in the system",
        )
    if user_in.email:
        existing_user = crud.get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user != user_id:
            raise HTTPException(
                status_code=409, detail="user with this email already exist"
            )
        
    db_user = crud.update_user(session=session, db_user=db_user, user_in=user_in)
    return db_user


@router.delete("{user_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_user(session: SessionDep, user_id: uuid.UUID, curren_user: CurrentUser) -> Message:
    user = session.get(User, user_id)
    if not user: 
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    if user == curren_user:
        raise HTTPException(
            status_code=403,
            detail="Super users are not allowed to delete themselves"
        )
    statement = delete(Property).where(col(Property.owner_id) == user_id)
    session.exec(statement)
    session.delete(user)
    session.commit()
    return Message(message="Deleted user sucessfully")


