from fastapi import APIRouter

from backend.app.api.routes import login, private, users, posts, payment, transaction, property, duan, wallets  
from backend.app.core.config import settings
"""

api_router.include_router(login.router)
api_router.include_router(private.router)
api_router.include_router(wishlist.router)
api_router.include_router(payment.router) 
api_router.include_router(transaction.router)
api_router.include_router(duan.router)
api_router.include_router(posts.router)
"""
router = APIRouter()
api_router = APIRouter()
api_router.include_router(property.router)
api_router.include_router(users.router)
api_router.include_router(wallets.router)



