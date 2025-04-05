from fastapi import APIRouter, HTTPException
from typing import List, Optional, Any
from uuid import uuid4, UUID
from backend.app.api.deps import SessionDep
from backend.schemas.property import Property, PropertyResponse, PropertiesResponse, PropertyCreate, PropertyUpdate, ApprovePostResponse, PreviewPostResponse
from backend.schemas.post import DeletePostResponse










