from sqlmodel import select

from backend.app.api.deps import SessionDep
from backend.app.model import User
from backend.app.schemas.user import UserPublic


async def get_user_by_email(session: SessionDep, email: str):
    statement = select(User).where(User.email == email)
    result = await session.execute(statement)
    session_user = result.scalars().first()
    return session_user
