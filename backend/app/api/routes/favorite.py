from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.favorite import Favorite
from backend.app.schemas.message import Message
from pydantic import BaseModel
import logging

router = APIRouter(prefix="/favorite", tags=["favorite"])
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Định nghĩa Pydantic model cho payload
class FavoriteAdd(BaseModel):
    property_id: int

class FavoriteRemove(BaseModel):
    property_id: int

@router.post("/add", response_model=Message)
async def add_favorite(
    session: SessionDep,
    user: CurrentUser,
    data: FavoriteAdd
):
    logger.info(f"Adding favorite for user: {user.id}, property_id: {data.property_id}")
    try:
        existing_favorite = await session.execute(
            select(Favorite).where(
                Favorite.user_id == user.id,
                Favorite.property_id == data.property_id
            )
        )
        existing_favorite = existing_favorite.scalar_one_or_none()

        if existing_favorite:
            return Message(message="This property is already in your favorites.")

        new_favorite = Favorite(user_id=user.id, property_id=data.property_id)
        session.add(new_favorite)
        await session.commit()
        await session.refresh(new_favorite)
        logger.info(f"Favorite added successfully for property_id: {data.property_id}")

        return Message(message="Property added to favorites successfully.")
    except Exception as e:
        logger.error(f"Error adding favorite: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/remove", response_model=Message)
async def remove_favorite(
    session: SessionDep,
    user: CurrentUser,
    data: FavoriteRemove
):
    logger.info(f"Removing favorite for user: {user.id}, property_id: {data.property_id}")
    try:
        stmt = select(Favorite).where(
            Favorite.user_id == user.id,
            Favorite.property_id == data.property_id
        )
        logger.debug(f"Executing query: {stmt}")
        result = await session.execute(stmt)
        existing_favorite = result.scalar_one_or_none()
        logger.debug(f"Existing favorite found: {existing_favorite}")

        if not existing_favorite:
            return Message(message="This property is not in your favorites.")

        await session.delete(existing_favorite)
        await session.commit()
        logger.info(f"Favorite removed successfully for property_id: {data.property_id}")

        return Message(message="Property removed from favorites successfully.")
    except Exception as e:
        logger.error(f"Error removing favorite: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")