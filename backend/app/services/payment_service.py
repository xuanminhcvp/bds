from app.repositories.payment_repository import PaymentRepository
from app.models.payment import Payment
from decimal import Decimal

class PaymentService:
    @staticmethod
    def create_payment(session, transaction_id: int, amount: Decimal, payment_method: str, payment_status: str) -> Payment:
        if amount <= 0:
            raise ValueError("Số tiền thanh toán phải lớn hơn 0")
        
        return PaymentRepository.create_payment(session, transaction_id, amount, payment_method, payment_status)
    
    @staticmethod
    def update_payment_status(session, payment_id: int, new_payment_status: str) -> Payment:
        return PaymentRepository.update_payment_status(session, payment_id, new_payment_status)