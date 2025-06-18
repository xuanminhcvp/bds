from fastapi import APIRouter
from sqlalchemy import select

from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.newsletter_subscribers import NewsletterSubscriber
from backend.app.schemas.message import Message
from pydantic import BaseModel, EmailStr

class NewsletterSubscribe(BaseModel):
    email: EmailStr

router = APIRouter(prefix="/newsletter", tags=["newsletter"])

@router.post("/subscribe", response_model=Message)
async def subscribe_to_newsletter(
    session: SessionDep, 
    data: NewsletterSubscribe,
):
    existing_subscriber = await session.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == data.email)
    )
    existing_subscriber = existing_subscriber.scalar_one_or_none()

    if existing_subscriber:
        return Message(
            message="You are already subscribed to the newsletter."
        )

    new_subscriber = NewsletterSubscriber(email=data.email)
    session.add(new_subscriber)
    await session.commit()
    await session.refresh(new_subscriber)

    return Message(
        message="Successfully subscribed to the newsletter.",
    )