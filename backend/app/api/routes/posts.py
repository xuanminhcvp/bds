from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List, Optional
from backend.app.api.deps import SessionDep, CurrentUser
from backend.app.schemas.post import PostCreate, PostResponse
from backend.app.model.post import Post
import logging
import os
from uuid import UUID
from datetime import datetime
import uuid
from sqlalchemy.future import select
from unidecode import unidecode
import re

router = APIRouter(prefix="/post", tags=["post"])
logging.basicConfig(level=logging.DEBUG)

@router.post("/", response_model=PostResponse)
async def create_post(
    post: PostCreate,
    session: SessionDep,
    current_user: CurrentUser,
):
    user_id = current_user.id
    slug = unidecode(post.title.lower().replace(" ", "-").replace("?", "")).replace("?", "") + "-" + str(uuid.uuid4())[:6]    
    new_post = Post(
        title=post.title,
        slug=slug,
        content=post.content,
        category=post.category,
        user_id=user_id,
        image_url=post.image_url,
        tags=post.tags
    )
    session.add(new_post)
    await session.commit()
    await session.refresh(new_post)
    return new_post

@router.get("/{slug}", response_model=PostResponse)
async def get_post(
    slug: str,
    session: SessionDep,
):
    stmt = select(Post).where(Post.slug == slug)
    result = await session.execute(stmt)
    post = result.scalars().first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.get("/", response_model=List[PostResponse])
async def get_posts(
    session: SessionDep,
):
    stmt = select(Post).order_by(Post.published_at.desc())
    result = await session.execute(stmt)
    posts = result.scalars().all()
    return posts
