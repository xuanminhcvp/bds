import logging
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status, File, UploadFile
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
import os
import shutil

from backend.app.api.deps import CurrentUser, SessionDep
from backend.app.model.property import Property, PropertyImage
from backend.app.schemas.property import AllPropertyResponse, User, PropertyCreate, Message, PropertyResponse

router = APIRouter(prefix="/property", tags=["property"])

logging.basicConfig(level=logging.DEBUG)

property_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../static/assets/property")
os.makedirs(property_dir, exist_ok=True)

@router.post("/upload-images")
async def upload_images(files: List[UploadFile] = File(...)):
    try:
        image_paths = []
        for file in files:
            file_name = file.filename
            file_path = os.path.join(property_dir, file_name)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            relative_path = f"/assets/property/{file_name}"
            image_paths.append(relative_path)
        return {"image_paths": image_paths}
    except Exception as e:
        raise HTTPException(
            status_codes=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"error uploading files: {str(e)}"
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
async def get_all_property(session: SessionDep):
    stmt = select(Property).options(
        selectinload(Property.user), 
        selectinload(Property.images),
    )
    result = await session.execute(stmt) 
    all_property = result.scalars().all()
    if not all_property:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Internal server error"
        )
    count_property = len(all_property)
    return {"count": count_property, "result": all_property}
    

"""
@router.get("/{property_id}", response_model=Property1)
async def get_property_by_id(property_id: UUID, session: SessionDep):
    return await PropertyService.get_property_by_id(session=session, property_id=property_id)"""
"""
@router.put("/{property_id}", response_model=Property1)
async def update_property(session: SessionDep, property_id: UUID, updated_data: PropertyUpdate):
    property = await PropertyService.get_property_by_id(session, property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return await PropertyService.update_property(session, property_id, updated_data)

@router.delete("/{property_id}")
async def delete_property(session: SessionDep, property_id: UUID):
    property = await PropertyService.get_property_by_id(session, property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return await PropertyService.delete_property(session, property_id)"""
    







