from fastapi import APIRouter, Depends, HTTPException
from backend.app.services.payment_service import PaymentService
from backend.schemas.payment import PaymentResponse, PaymentCreate, PaymentSchema
from sqlalchemy.orm import Session
from backend.app.api.deps import SessionDep
from typing import Any

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/", response_model=PaymentResponse)
def create_payment(session: SessionDep, payment_data: PaymentCreate):
    try:
        return PaymentService.create_payment(
            session, payment_data.transaction_id, payment_data.amount, payment_data.payment_method, payment_data.payment_status
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
    
@router.patch("/{payment_id}", response_model= PaymentSchema)
def update_payment_status(session: SessionDep, payment_id: int, new_payment: str):
    return PaymentService.update_payment_status(session, payment_id, new_payment)

@router.post("/process/{payment_id}")
def process_payment(session: SessionDep, payment_id: int) -> Any:
    return None

@router.get("/payment_history/{user_id}")
def get_payment_history(session: SessionDep, user_id: int) -> Any:
    user_payment_history = PaymentService.get_payment_history(session, user_id)
    return user_payment_history




    