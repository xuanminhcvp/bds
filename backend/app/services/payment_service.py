from backend.app.repositories.payment_repository import PaymentRepository
from sqlalchemy.ext.asyncio import AsyncSession
from backend.schemas.payment import PaymentResponse, PaymentCreate,PaymentUpdate
from backend.app.models import Payment, Transaction
from decimal import Decimal
from fastapi import HTTPException
from uuid import UUID 

Valid_payment_method = {"VNPAY", "MOMO", "PAYPAL"}
Valid_statuses = {"pending", "success", "failed"} 

class PaymentService:
    #done
    @staticmethod
    async def create_payment(session: AsyncSession, payment_data: PaymentCreate):
        return await PaymentRepository.create_payment(session, payment_data) 
    
    #done
    @staticmethod
    async def get_payment_by_transaction(session: AsyncSession, transaction_id: UUID):
        return await PaymentRepository.get_payment_by_transaction(session, transaction_id)
    
    #done
    @staticmethod 
    async def update_payment(session: AsyncSession, payment_id: UUID, payment_data: PaymentUpdate):
        return await PaymentRepository.update_payment(session, payment_id, payment_data)
    
    #done
    @staticmethod
    async def get_all_payments(session: AsyncSession):
        return await PaymentRepository.get_all_payments(session)
    
    #done
    @staticmethod
    async def delete_payment(session: AsyncSession, payment_id: UUID):
        return await PaymentRepository.delete_payment(session, payment_id)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
           
    
    