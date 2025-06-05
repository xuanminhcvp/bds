"""from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File
from fastapi.responses import JSONResponse
from typing import List, Optional
from backend.app.api.deps import SessionDep, CurrentUser
from backend.schemas.post import PostCreate, PostResponse, PostCreationResponse
from backend.app.services.post_service import PostService
from backend.app.model.property import PropertyType, PostImage
import logging
import os
from uuid import UUID
from datetime import datetime

router = APIRouter(prefix="/posts", tags=["posts"])
logging.basicConfig(level=logging.DEBUG)

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

async def validate_post_input(post_data: PostCreate, user: CurrentUser):
    if not post_data.title or len(post_data.title.strip()) < 5:
        raise HTTPException(status_code=400, detail="Tiêu đề phải có ít nhất 5 ký tự.")
    if post_data.price is not None and post_data.price <= 0:
        raise HTTPException(status_code=400, detail="Giá phải lớn hơn 0.")
    if post_data.area is not None and post_data.area <= 0:
        raise HTTPException(status_code=400, detail="Diện tích phải lớn hơn 0.")
    if post_data.address and len(post_data.address.strip()) < 10:
        raise HTTPException(status_code=400, detail="Địa chỉ phải có ít nhất 10 ký tự.")
    if not post_data.owner_id:
        post_data.owner_id = user.id

async def process_post_creation(session: SessionDep, post_data: PostCreate, user_id: UUID, images: List[UploadFile] = []):
    from uuid import uuid4
    post_data = post_data.model_copy(update={"owner_id": user_id})
    new_post = await PostService.create_post(session, post_data)

    # Xử lý upload hình ảnh
    image_urls = []
    for image in images:
        file_extension = os.path.splitext(image.filename)[1]
        unique_filename = f"{uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())
        image_url = f"/uploads/{unique_filename}"
        image_urls.append(image_url)

        # Lưu vào bảng post_images
        new_image = PostImage(
            image_id=uuid4(),
            post_id=new_post.post_id,
            image_url=image_url,
            created_at=datetime.now()
        )
        session.add(new_image)

    await session.commit()
    return new_post, image_urls

async def handle_post_response(session: SessionDep, post_data: PostCreate, user: CurrentUser, images: List[UploadFile] = []):

    try:
        await validate_post_input(post_data, user)
        new_post, image_urls = await process_post_creation(session, post_data, user.id, images)

        print("DEBUG - new_post data:", new_post.__dict__)  
        print("DEBUG - image_urls data:", image_urls)
        post_response = PostResponse.model_validate(new_post)
        post_response.images = image_urls
        
        # Tạo PostCreationResponse
        response = PostCreationResponse(
            message="Tin đăng đã được gửi để duyệt.",
            data=post_response,
            image_urls=image_urls
        )
        return response
    

    except HTTPException as e:
        raise e
    except Exception as e:
        logging.error(f"Error creating post: {str(e)}")
        raise HTTPException(status_code=500, detail="Đã xảy ra lỗi khi tạo tin đăng.")

@router.post("/", response_model=PostCreationResponse)
async def create_post(
    session: SessionDep,
    user: CurrentUser,
    title: str = Form(...),
    description: Optional[str] = Form(None),
    price: float = Form(...),
    area: float = Form(...),
    address: str = Form(...),
    property_type: PropertyType = Form(...),
    category: str = Form(...),
    images: List[UploadFile] = File([]),
):


    post_data = PostCreate(
        title=title,
        description=description,
        price=price,
        area=area,
        address=address,
        property_type=property_type,
        category=category,
    )
    return await handle_post_response(session, post_data, user, images)"""