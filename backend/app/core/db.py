from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker
from backend.app import crud
from backend.app.core.config import settings
from backend.schemas.user import UserSchema, UserCreate
from backend.app.models import User 

engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI))

AsyncSessionLocal = sessionmaker(
    bind= engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def init_db(session: AsyncSession) -> None:
    result = await session.execute(select(User).where(User.email == settings.FIRST_SUPERUSER))
    user = result.scalar_one_or_none()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = await crud.create_user(session=session, user_create=user_in)

