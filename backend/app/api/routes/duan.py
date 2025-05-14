from uuid import UUID 
from fastapi import APIRouter
from typing import List
from sqlalchemy.future import select
from backend.app.api.deps import SessionDep
from backend.app.models.duan import Duan
from backend.schemas.duan import DuanSchema
from backend.app.services.property_service import PropertyService
import logging

router = APIRouter(prefix="/duan", tags=["duan"])

logging.basicConfig(level=logging.DEBUG)

@router.get("/", response_model=List[DuanSchema])
async def read_duan(session: SessionDep, skip: int = 0, limit: int = 10):
    stmt = select(Duan).offset(skip).limit(limit)
    result = await session.execute(stmt)
    duan = result.scalars().all()
    return duan