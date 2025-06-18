from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import func, select
from uuid import UUID
from sqlalchemy.orm import selectinload
import logging
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import joinedload

from backend.app import crud
from backend.app.api.deps import (
    CurrentUser,
    SessionDep,
    TokenDep,
    get_current_active_superuser,
)
from backend.app.api.deps import get_current_active_superuser
from backend.app.model import User, Wallet
from backend.app.crud import get_user_by_email
from backend.app.core.security import create_access_token, get_password_hash, verify_password
from backend.app.core.config import settings
from backend.app.schemas.user import (
    RegisterResponse,
    UserCreate,
    UserLogin,
    UserLoginResponse,
    UserPublic,
    UserPublicDashboard,
    UserPublicDashboard2,
    UserRegister,
    UserSchema,
    UsersPublic,
    UserUpdate,
    LoginResponse,
    UsersManagement,
    UsersManagementResponse,
    Is_Locked,
    UserAdminResponseToken,
    UserAdminResponse,
)
from backend.app.schemas.message import Message

router = APIRouter(prefix="/users", tags=["users"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/me/", response_model=UserPublic)
async def get_user_profile(session: SessionDep, current_user: CurrentUser):
    stmt = select(User).filter(User.id == current_user.id)
    result = await session.execute(stmt)
    user = result.scalars().first()
    if not user:
        raise HTTPException(
            status_code=404, 
            detail="User not found"
            )
    return {
        "id": str(user.id),
        "email": user.email,
        "name": user.name,
        "avatar": user.avatar,
        "phone": user.phone
    }


@router.post("/register", response_model=RegisterResponse)
async def register_user(session: SessionDep, user_in: UserRegister):
    existing_user = await get_user_by_email(session, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    hashed_password = get_password_hash(user_in.password)
    db_user = User(
        email= user_in.email,
        hashed_password= hashed_password,
        name= user_in.name,
        phone = user_in.phone
    )
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    max_wallet_id= await session.scalar(select(func.max(Wallet.wallet_id)))
    new_wallet_id = max_wallet_id + 1 if max_wallet_id else 1
    new_wallet = Wallet(
        wallet_id = new_wallet_id,
        user_id= db_user.id,
        balance= 0
    )
    session.add(new_wallet)
    await session.commit()
    await session.refresh(new_wallet) 
    return RegisterResponse(
        message="User registered successfully"
    )

@router.post("/login", response_model=LoginResponse)
async def user_login(session: SessionDep, user_in: UserLogin):
    user = await get_user_by_email(session, user_in.email)
    if not user: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Email or Password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    if not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Email or Password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token = create_access_token(user.id, timedelta(settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    user_public = UserPublic(
        id=user.id,
        email=user.email,
        name= user.name,
        phone= user.phone,
        avatar= user.avatar
    )
    return LoginResponse(token=token, token_type="bearer", user=user_public)   

@router.post("/login/admin", response_model=UserAdminResponseToken)
async def admin_login(session: SessionDep, user_in: UserLogin):
    user = await get_user_by_email(session, user_in.email)
    authorized = user and user.is_superuser and verify_password(user_in.password, user.hashed_password)
    if not authorized:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect Email or Password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    token = create_access_token(user.id, timedelta(settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    data = UserAdminResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        phone=user.phone,
        avatar=user.avatar,
        is_superuser=user.is_superuser,
        is_locked=user.is_locked,
        created_at=user.created_at,
    )
    return UserAdminResponseToken(token=token, user=data)

@router.put("/me", response_model=UserPublic)
async def update_user_me( session: SessionDep, user_update: UserUpdate, current_user: CurrentUser):
    stmt = select(User).filter(User.id == current_user.id)
    result = await session.execute(stmt)
    db_user = result.scalars().first()

    update_data = user_update.model_dump(exclude_unset=True)
    if 'password' in update_data:
        update_data['hashed_password'] = get_password_hash(update_data.pop('password'))

    for key, value in update_data.items():
        setattr(db_user, key, value)

    try: 
        await session.commit()
        await session.refresh(db_user)
        return db_user
    except Exception as e: 
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating user"
        )

# API for Admin 
@router.get("/", response_model=UsersManagementResponse)
async def get_all_users(session: SessionDep, current_user: CurrentUser):
    user_id = current_user.id
    user = select(User).where(User.id == user_id)
    result = await session.execute(user)
    current_user = result.scalars().first()
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    stmt = select(User).options(
        selectinload(User.wallet)
    )
    result = await session.execute(stmt)
    users = result.scalars().all()

    data = []
    for user in users:
        data.append(
            UsersManagement(
                id=user.id,
                email=user.email,
                name=user.name,
                phone=user.phone,
                avatar=user.avatar,
                is_superuser=user.is_superuser,
                is_locked=user.is_locked,
                created_at=user.created_at,
                updated_at=user.update_at,
                wallet=user.wallet.balance if user.wallet else None
            )
        )
    return UsersManagementResponse(data=data, count=len(data))

@router.patch("/{user_id}", response_model=UsersManagement)
async def update_lock_user(user_id: UUID, is_locked: Is_Locked, session: SessionDep, current_user: CurrentUser):
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    stmt = select(User).filter(User.id == user_id).options(joinedload(User.wallet))
    result = await session.execute(stmt)
    db_user = result.scalars().first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    db_user.is_locked = is_locked.is_locked
    try:
        await session.commit()
        await session.refresh(db_user)
        response = UsersManagement(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            phone=db_user.phone,
            avatar=db_user.avatar,
            is_superuser=db_user.is_superuser,
            is_locked=db_user.is_locked,
            created_at=db_user.created_at,
            updated_at=db_user.update_at,
            wallet=db_user.wallet.balance if db_user.wallet else None
        )
        return response
    except Exception as e:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error updating user"
        )
    
@router.delete("/{user_id}", response_model=Message)
async def delete_user(user_id: UUID, session: SessionDep, current_user: CurrentUser):
    # Kiểm tra quyền admin
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )

    stmt = select(User).filter(User.id == user_id)
    result = await session.execute(stmt)
    db_user = result.scalars().first()

    if not db_user:
        logger.warning(f"User with ID {user_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    try:
        await session.delete(db_user)
        await session.commit()
        return Message(message="User deleted successfully")
    except IntegrityError as e:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete user due to related records"
        )
    except Exception as e:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error deleting user"
        )