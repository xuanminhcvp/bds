import uuid 
from uuid import UUID 
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from backend.app.api.deps import get_current_active_superuser, SessionDep
from backend.app import crud
from backend.schemas.user import UserPublic, UsersPublic, UserCreate, UserSchema, UserRegister, UserUpdate
from backend.schemas.token import Message, UpdatePassword
from backend.app.models import User
from backend.app.api.deps import CurrentUser
from backend.app.core.security import verify_password, get_password_hash
from backend.app.services.user_service import UserService
from sqlmodel import func, select


router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserPublic)
def read_user_me(current_user: CurrentUser):
    return current_user

@router.delete("/me", dependencies=[Depends(get_current_active_superuser)] ,response_model=Message)
def delete_user_me(session: SessionDep, current_user: CurrentUser):
    user_id = current_user.id 
    return UserService.delete_user(session, user_id)








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






@router.post("/signup", response_model=UserPublic)
def register_user(session: SessionDep, user_in: UserRegister) -> Any:
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="the user with this email already exist in the system"
        )
    # Tạo đối tượng UserCreate với mật khẩu đã mã hóa
    user_create = UserCreate(
        email=user_in.email,
        full_name=user_in.full_name,
        password=user_in.password
    )
    user = crud.create_user(session=session, user_create=user_create)
    return user 

@router.get("/{user_id}", response_model=UserPublic)
def get_user_by_id(user_id: UUID, session: SessionDep, current_user: CurrentUser) -> Any:
    user = UserService.get_user_by_id(session, user_id)
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
    user_id: UUID,
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


@router.delete("/{user_id}", dependencies=[Depends(get_current_active_superuser)])
def delete_user(session: SessionDep, user_id: UUID, current_user: CurrentUser):
    return UserService.delete_user(session, user_id, current_user)




