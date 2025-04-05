from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.app.models import Payment
from backend.schemas.payment import PaymentSchema, PaymentCreate, PaymentUpdate
from decimal import Decimal
from uuid import UUID

class PaymentRepository:
    #done
    @staticmethod
    async def create_payment(session: AsyncSession, payment_data: PaymentCreate):
        new_payment = Payment(**payment_data.model_dump())
        session.add(new_payment)
        await session.commit()
        await session.refresh(new_payment)
        return new_payment    
    
    #done
    @staticmethod
    async def get_payment_by_transaction(session: AsyncSession, transaction_id: UUID):
        result = await session.execute(select(Payment).filter(Payment.transaction_id == transaction_id))
        payment = result.scalars().first()
        return payment     
    

    @staticmethod
    async def get_payment_by_id(session: AsyncSession, payment_id: UUID):
        result = await session.execute(select(Payment).filter(Payment.id == payment_id))
        return result.scalars().first()
    
    #done
    @staticmethod
    async def update_payment(session: AsyncSession, payment_id: UUID, payment_data: PaymentUpdate):
        payment = await PaymentRepository.get_payment_by_id(session, payment_id)
        payment.transaction_id = payment_data.transaction_id
        payment.user_id = payment_data.user_id
        payment.amount = payment_data.amount
        payment.payment_method = payment_data.payment_method
        payment.payment_status = payment_data.payment_status
        session.add(payment)
        await session.commit()
        await session.refresh(payment)
        return payment
    
    #done
    @staticmethod
    async def get_all_payments(session: AsyncSession):
        result = await session.execute(select(Payment))
        payments = result.scalars().all()
        return payments
    
    #done
    @staticmethod
    async def delete_payment(session: AsyncSession, payment_id: UUID):
        payment = await PaymentRepository.get_payment_by_id(session, payment_id)
        await session.delete(payment)
        await session.commit()
        return payment 
    
    
    
      
        
    
    
    
    
    
    
    
    
    
    
    
    
    