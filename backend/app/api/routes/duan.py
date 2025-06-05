"""from uuid import UUID 
from fastapi import APIRouter
from typing import List
from sqlalchemy.future import select
from backend.app.api.deps import SessionDep
from backend.app.model.project import Duan
from backend.schemas.duan import DuanSchema, DuanResponse
from backend.app.services.property_service import PropertyService
import logging

router = APIRouter(prefix="/duan", tags=["duan"])

logging.basicConfig(level=logging.DEBUG)

@router.get("/", response_model=DuanResponse)
async def read_duan(session: SessionDep, skip: int = 0, limit: int = 10):

    total_stmt = select(Duan)
    total_result = await session.execute(total_stmt)
    total = len(total_result.scalars().all())

    stmt = select(Duan).offset(skip).limit(limit)
    result = await session.execute(stmt)
    duan = result.scalars().all()
    return {"total": total, "results": duan}"""