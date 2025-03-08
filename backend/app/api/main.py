from fastapi import APIRouter

from backend.app.api.routes import login, private, users, posts, wishlist, payment  
from backend.app.core.config import settings

router = APIRouter()
api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(private.router)
api_router.include_router(users.router)
api_router.include_router(posts.router)
api_router.include_router(wishlist.router)
api_router.include_router(payment.router) 

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)

