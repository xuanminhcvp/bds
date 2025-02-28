from fastapi import APIRouter

from app.api.routes import login, private, users, posts, wishlist  
from app.core.config import settings

router = APIRouter()
api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(private.router)
api_router.include_router(users.router)
api_router.include_router(posts.router)
api_router.include_router(wishlist.router)

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)

