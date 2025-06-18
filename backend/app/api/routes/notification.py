from fastapi import APIRouter, status
from sqlalchemy import select
from fastapi.exceptions import HTTPException

from backend.app.schemas.message import Message
from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.notification import Notification
from backend.app.schemas.notification import NotificationResponse

router = APIRouter(prefix="/notification", tags=["notification"])

@router.post("/", response_model=NotificationResponse)
async def create_notification(session: SessionDep, current_user: CurrentUser, message: Message):
    user_id = current_user.id
    data = Notification(
        user_id=user_id,
        message=message.message
    )
    session.add(data)
    await session.commit()
    await session.refresh(data)

    response = NotificationResponse(
        notification_id=data.notification_id,
        user_id=data.user_id,
        message=data.message,
        created_at=data.created_at,
        is_read=data.is_read
    )
    return response

@router.get("/me", response_model=list[NotificationResponse])
async def get_notifications_by_user(session: SessionDep, current_user: CurrentUser):
    user_id = current_user.id
    stmt = select(Notification).where(Notification.user_id == user_id)
    result = await session.execute(stmt)
    notifications = result.scalars().all()

    response = [
        NotificationResponse(
            notification_id=notif.notification_id,
            user_id=notif.user_id,
            message=notif.message,
            created_at=notif.created_at,
            is_read=notif.is_read
        ) for notif in notifications
    ]
    return response

@router.put("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_as_read(session: SessionDep, notification_id: int):
    stmt = select(Notification).where(
        Notification.notification_id == notification_id,
    )
    result = await session.execute(stmt)
    notification = result.scalar_one_or_none()

    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    notification.is_read = True
    await session.commit()
    await session.refresh(notification)

    response = NotificationResponse(
        notification_id=notification.notification_id,
        user_id=notification.user_id,
        message=notification.message,
        created_at=notification.created_at,
        is_read=notification.is_read
    )
    return response
