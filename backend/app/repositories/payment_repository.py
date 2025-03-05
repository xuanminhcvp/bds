from sqlalchemy.orm import Session
from app.models import Payment
from decimal import Decimal

class PaymentRepository:
    @staticmethod
    def get_payment_by_id(session: Session, payment_id: int) -> Payment:
        return session.select(Payment).filter(Payment.id == payment_id).first()
    
    @staticmethod
    def get_payment_by_transaction(session: Session, transaction_id: int):
        return session.select(Payment).filter(Payment.transaction_id == transaction_id).all()
    
    @staticmethod
    def create_payment(session: Session, transaction_id: int, amount: Decimal, payment_method: str, payment_status: str) -> Payment:
        payment = Payment(
            transaction_id=transaction_id,
            amount=amount,
            payment_method=payment_method, 
            payment_status=payment_status
        )
        session.add(payment)
        session.commit()
        session.refresh(payment)
        return payment
    
    @staticmethod
    def update_payment_status(session: Session, payment_id: int, new_payment_status: str) -> Payment:
        payment = session.select(Payment).filter(Payment.id == payment_id).first()
        if payment:
            payment.payment_status = new_payment_status
            session.commit()
            session.refresh(payment)
            return payment
        return None
    
    