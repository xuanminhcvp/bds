from fastapi import APIRouter, Depends, HTTPException
from app.services.payment_service import PaymentService
from sqlalchemy.orm import Session
import SessionDep

router = APIRouter(prefix="payment", tag = ["payment"])

@router.post("/", response_model=Payment)
def create_payment(session: SessionDep, payment_data: PaymentCreate):
    try:
        return PaymentService.create_payment(
            session, payment_data.transaction_id, payment_data.amount, payment_data.payment_method, payment_data.payment_status
        )
    except ValueError as e:
        raise HTTPException (status_code=404, detail=str(e))
    
@router.patch("/{payment_id}", response_model= Payment)
    def update_payment_status(session: SessionDep, payment_id: int, new_payment: str):
    return PaymentService.update_payment_status(session, payment_id, new_payment)


    