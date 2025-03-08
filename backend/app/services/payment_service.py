from backend.app.repositories.payment_repository import PaymentRepository
from sqlalchemy.orm import Session
from backend.schemas.payment import PaymentResponse
from backend.app.models import Payment, Transaction
from decimal import Decimal
from fastapi import HTTPException

Valid_payment_method = {"VNPAY", "MOMO", "PAYPAL"}
Valid_statuses = {"pending", "success", "failed"} 

class PaymentService:
    @staticmethod
    def create_payment(session: Session, transaction_id: int, amount: Decimal, payment_method: str, payment_status: str) -> PaymentResponse:
        if amount <= 0:
            raise ValueError("Số tiền thanh toán phải lớn hơn 0")
        if payment_method not in Valid_payment_method:
            raise ValueError(f"Phuong thuc thanh toan khong hop le: {payment_method}")
        if payment_status not in Valid_statuses:
            raise ValueError(f"Trang thai thanh toan khong hop le: {payment_status}")
        transaction = session.query(Transaction).filter(Transaction.id == transaction_id).first()
        if not transaction:
            raise ValueError(f"Transaction với id {transaction_id} không tồn tại.")
        existing_payment = PaymentRepository.get_payment_by_transaction_id(session, transaction_id)
        if existing_payment:
            raise ValueError(f"Giao dich voi transaction_id {transaction_id} da ton tai.")
        try:
            return PaymentRepository.create_payment(session, transaction_id, amount, payment_method, payment_status)
        except Exception as e:
            session.rollback()
            print(f"Error: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")             
    
    @staticmethod
    def update_payment_status(session, payment_id: int, new_payment_status: str) -> Payment:
        return PaymentRepository.update_payment_status(session, payment_id, new_payment_status)
    
    @staticmethod   
    def process_payment(payment_id: int, session: Session):
        payment = PaymentRepository.get_payment_by_id(session, payment_id)
        if not payment:
            return None
        
        if payment.status == "PAID":
            return None
        
        #chua hieu cach goi api cong
        payment_gateway = PaymentGateway()
        payment_url = payment_gateway.create_payment_url(payment.amount, payment.id)
        
        return payment_url 
    
    @staticmethod
    def get_payment_history(session: Session, user_id: int):
        return PaymentRepository.get_payment_history(session, user_id) 
    