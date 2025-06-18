import logging
import os
import shutil
import uuid
from datetime import timedelta
from typing import List, Optional
from uuid import UUID


from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy import and_, delete
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from sqlalchemy.sql import func
from unidecode import unidecode

from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.property import Property, PropertyImage
from backend.app.schemas.property import (
    AllPropertyResponse,
    ExtendedPropertyRequest,
    Message,
    PropertyCreate,
    PropertyFilter,
    PropertyResponse,
    StatusUpdate,
    User,
)

router = APIRouter(prefix="/property", tags=["property"])

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

property_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../static/assets/property")
os.makedirs(property_dir, exist_ok=True)

@router.post("/upload-images")
async def upload_images(files: List[UploadFile] = File(...)):
    try:
        image_paths = []
        for file in files:
            unique_name = f"{uuid.uuid4().hex}_{file.filename}"
            file_path = os.path.join(property_dir, unique_name)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            relative_path = f"http://localhost:8000/assets/property/{unique_name}"
            image_paths.append(relative_path)
        return {"image_paths": image_paths}
    except Exception as e:
        raise HTTPException(
            status_codes=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"error uploading files: {str(e)}"
        )
    
@router.post("/upload-images/tiptap")
async def upload_images_ckeditor(file: UploadFile = File(...)):
    try:
        print(f"Received file: {file.filename}, content_type: {file.content_type}")

        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Chỉ hỗ trợ file hình ảnh (jpg, png, ...)"
            )

        unique_name = f"{uuid.uuid4().hex}_{file.filename}"
        file_path = os.path.join(property_dir, unique_name)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        relative_path = f"http://localhost:8000/assets/property/{unique_name}"
        return {"url": relative_path}
    except Exception as e:
        print(f"Error uploading file: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )
    
@router.post("/", response_model=Message)
async def create_property(session: SessionDep, property_data: PropertyCreate, current_user: CurrentUser):
    property_create = Property(
        user_id = current_user.id,
        title = property_data.title,
        description = property_data.description,
        price = property_data.price,  
        area = property_data.area,
        address = property_data.address,
        bedrooms = property_data.bedrooms,
        bathrooms = property_data.bathrooms,
        property_type = property_data.property_type,
        category = property_data.category,
    )
    session.add(property_create)
    await session.commit()
    await session.refresh(property_create)

    for image_url in property_data.images:
        property_image = PropertyImage(
            property_id = property_create.property_id,
            image_url = image_url
        )
        session.add(property_image)

    await session.commit()
    return Message(
        message= "Create property successfully"
    )

@router.get("/me", response_model=List[PropertyResponse])
async def get_property_by_user(session: SessionDep, current_user: CurrentUser):
    stmt = select(Property).where(Property.user_id == current_user.id).options(
        selectinload(Property.user),
        selectinload(Property.images),
        selectinload(Property.favorite)
    )
    result = await session.execute(stmt)
    all_property = result.scalars().all()
    if not all_property: 
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No properties found for this user"
        )
    return all_property
    
@router.get("/", response_model=AllPropertyResponse)
async def get_all_property(
    session: SessionDep,
    current_user: Optional[CurrentUser] = None,
    filter: PropertyFilter = Depends(),
):
    try:
        conditions = []

        if filter.property_type:
            conditions.append(Property.property_type == filter.property_type)
        if filter.category:
            conditions.append(Property.category == filter.category)
        if filter.price_min is not None:
            conditions.append(Property.price >= filter.price_min)
        if filter.price_max is not None:
            conditions.append(Property.price <= filter.price_max)
        if filter.area_min is not None:
            conditions.append(Property.area >= filter.area_min)
        if filter.area_max is not None:
            conditions.append(Property.area <= filter.area_max)
        if filter.bedrooms is not None:
            conditions.append(Property.bedrooms == filter.bedrooms)
        if filter.bathrooms is not None:
            conditions.append(Property.bathrooms == filter.bathrooms)
        if filter.address:
            search_address = unidecode(filter.address).lower().replace(" ", "")
            conditions.append(
                func.replace(
                    func.lower(func.unaccent(Property.address)), " ", ""
                ).ilike(f"%{search_address}%")
            )
        if filter.title:
            search_title = unidecode(filter.title).lower().replace(" ", "")
            conditions.append(
                func.replace(
                    func.lower(func.unaccent(Property.title)), " ", ""
                ).ilike(f"%{search_title}%")
            )
        if filter.created_at:
            conditions.append(Property.created_at == filter.created_at)
    
        stmt = select(Property).options(
            selectinload(Property.user),
            selectinload(Property.images),
            selectinload(Property.favorite)
        )

        if conditions:
            stmt = stmt.where(and_(*conditions))
            logger.info(f"Query conditions1: {conditions}")

        if current_user:
            stmt = stmt.join(Property.favorite).where(Property.favorite.has(user_id=current_user.id, is_favorite=True))
            logger.info(f"Query conditions2: {current_user.id}")
        results = await session.execute(stmt)
        properties = results.scalars().all()
        count = len(properties)

        return {"count": count, "result": properties}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Lỗi khi lấy dữ liệu"
        )
    
@router.delete("/{property_id}", response_model=Message)
async def delete_property(session: SessionDep, property_id: int):
    stmt = select(Property).where(Property.property_id == property_id)
    result = await session.execute(stmt)
    property = result.scalars().first()
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    delete_stmt = delete(Property).where(Property.property_id == property_id)
    await session.execute(delete_stmt)
    await session.commit()
    
    return Message(message="Property deleted successfully")

@router.post("/{property_id}/extend", response_model=PropertyResponse)
async def extend_property(session: SessionDep, property_id: int, data: ExtendedPropertyRequest):
    days = data.days
    if days <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Days must be greater than 0"
        )
    
    stmt = select(Property).where(Property.property_id == property_id).options(
        selectinload(Property.user),
        selectinload(Property.images),
        selectinload(Property.favorite)
    )
    result = await session.execute(stmt)
    property = result.scalars().first()
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    property.expires_at += timedelta(days=days)
    session.add(property)
    await session.commit()
    await session.refresh(property)
    
    return property

@router.post("/{property_id}/status", response_model=PropertyResponse)
async def update_property_status(session: SessionDep, property_id: int, status_update: StatusUpdate):
    stmt = select(Property).where(Property.property_id == property_id).options(
        selectinload(Property.user),
        selectinload(Property.images),
        selectinload(Property.favorite)
    )
    result = await session.execute(stmt)
    property = result.scalars().first()
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    property.status = status_update.status
    session.add(property)
    await session.commit()
    await session.refresh(property)
    
    return property

@router.get("/{property_id}", response_model=PropertyResponse)
async def get_property_by_id(session: SessionDep, property_id: int):
    stmt = select(Property).where(Property.property_id == property_id).options(
        selectinload(Property.user),
        selectinload(Property.images),
        selectinload(Property.favorite)
    )
    result = await session.execute(stmt)
    property = result.scalars().first()
    
    if not property:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    return property


    







