from fastapi import APIRouter, Depends, HTTPException
from backend.app.services.payment_service import PaymentService
from backend.schemas.payment import PaymentResponse, PaymentCreate, PaymentSchema, PaymentUpdate
from sqlalchemy.orm import Session
from backend.app.api.deps import SessionDep
from typing import Any
from uuid import UUID

router = APIRouter(prefix="/payments", tags=["payments"])

#done
@router.post("/", response_model=PaymentResponse)
async def create_payment(session: SessionDep, payment_data: PaymentCreate) -> PaymentResponse:
    return await PaymentService.create_payment(session, payment_data)

#done
@router.get("/{transaction_id}", response_model=PaymentResponse)
async def get_payment(session: SessionDep, transaction_id: UUID):
    return await PaymentService.get_payment_by_transaction(session, transaction_id)

#done 
@router.patch("/{payment_id}", response_model=PaymentUpdate)
async def update_payment(session: SessionDep, payment_id: UUID, payment_data: PaymentUpdate):
    return await PaymentService.update_payment(session, payment_id, payment_data)

#done
@router.get("/", response_model=list[PaymentResponse])
async def get_all_payments(session: SessionDep):
    return await PaymentService.get_all_payments(session)

#done
@router.delete("/{payment_id}", response_model=PaymentResponse)
async def delete_payment(session: SessionDep, payment_id: UUID):
    return await PaymentService.delete_payment(session, payment_id)










@router.get("/{payment_id}", response_model = PaymentResponse)
async def get_payment_by_id(session: SessionDep, payment_id: int):
    payment = await PaymentService.get_payment_by_id(session, payment_id)
    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )
    return payment






    