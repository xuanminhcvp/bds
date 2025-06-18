import logging
import os
import shutil
import uuid
from datetime import timedelta
from typing import List, Optional
from uuid import UUID
from sqlalchemy import and_, func
from unidecode import unidecode

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import delete
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.project import Project
from backend.app.schemas.project import (
    AllProjectResponse,
    ExtendedProjectRequest,
    Message,
    ProjectCreate,
    ProjectResponse,
    User,
    ProjectFilter
)

router = APIRouter(prefix="/project", tags=["project"])


@router.post("/", response_model=ProjectResponse)
async def create_project(
    project: ProjectCreate, session: SessionDep, current_user: CurrentUser
):
    new_project = Project(**project.model_dump(), user_id=current_user.id)
    session.add(new_project)
    await session.commit()
    await session.refresh(new_project)

    return new_project


@router.get("/me", response_model=List[ProjectResponse])
async def get_project_by_user(session: SessionDep, current_user: CurrentUser):
    stmt = (
        select(Project)
        .where(Project.user_id == current_user.id)
        .options(
            selectinload(Project.user),
        )
    )
    result = await session.execute(stmt)
    all_project = result.scalars().all()
    if not all_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No projects found for this user",
        )
    return all_project


@router.get("/", response_model=AllProjectResponse)
async def get_all_project(session: SessionDep, filter: ProjectFilter = Depends()):
    try:
        conditions = []
        if filter.status:
            conditions.append(Project.status == filter.status)
        if filter.area_min is not None:
            conditions.append(Project.area >= filter.area_min)
        if filter.area_max is not None:
            conditions.append(Project.area <= filter.area_max)
        if filter.address:
            search_address = unidecode(filter.address).lower().replace(" ", "")
            conditions.append(
                func.replace(
                    func.lower(func.unaccent(Project.address)), " ", ""
                ).ilike(f"%{search_address}%")
            )
        if filter.created_at:
            conditions.append(Project.created_at >= filter.created_at)

        if conditions:
            stmt = select(Project)
            stmt = stmt.where(and_(*conditions)).options(
                selectinload(Project.user),
            )
        
        else:
            stmt = select(Project).options(
                selectinload(Project.user),
            )
        result = await session.execute(stmt)
        all_project = result.scalars().all()
        if not all_project:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error",
            )
        count_project = len(all_project)
        return {"count": count_project, "result": all_project}

    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while fetching projects",
        )



@router.delete("/{project_id}", response_model=Message)
async def delete_project(session: SessionDep, project_id: int):
    stmt = select(Project).where(Project.project_id == project_id)
    result = await session.execute(stmt)
    project = result.scalars().first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project not found"
        )

    delete_stmt = delete(Project).where(Project.project_id == project_id)
    await session.execute(delete_stmt)
    await session.commit()

    return Message(message="Project deleted successfully")


@router.post("/{project_id}/extend", response_model=ProjectResponse)
async def extend_project(
    session: SessionDep, project_id: int, data: ExtendedProjectRequest
):
    days = data.days
    if days <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Days must be greater than 0",
        )

    stmt = (
        select(Project)
        .where(Project.project_id == project_id)
        .options(
            selectinload(Project.user),
        )
    )
    result = await session.execute(stmt)
    project = result.scalars().first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project not found"
        )

    project.expires_at += timedelta(days=days)
    session.add(project)
    await session.commit()
    await session.refresh(project)

    return project


@router.post("/{project_id}/status", response_model=ProjectResponse)
async def update_project_status(
    session: SessionDep, project_id: int
):
    stmt = (
        select(Project)
        .where(Project.project_id == project_id)
        .options(
            selectinload(Project.user),
        )
    )
    result = await session.execute(stmt)
    project = result.scalars().first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project not found"
        )

    project.is_approved = True
    session.add(project)
    await session.commit()
    await session.refresh(project)

    return project

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project_by_id(
    session: SessionDep, project_id: int
):
    stmt = (
        select(Project)
        .where(Project.project_id == project_id)
        .options(
            selectinload(Project.user),
        )
    )
    result = await session.execute(stmt)
    project = result.scalars().first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project not found"
        )

    return project

