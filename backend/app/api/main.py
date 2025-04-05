from fastapi import APIRouter

from backend.app.api.routes import login, private, users, posts, wishlist, payment, transaction, property  
from backend.app.core.config import settings

router = APIRouter()
api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(private.router)
api_router.include_router(users.router)
api_router.include_router(wishlist.router)
api_router.include_router(payment.router) 
api_router.include_router(transaction.router)
api_router.include_router(property.router)

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)

