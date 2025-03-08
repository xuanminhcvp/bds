import random
from time import sleep

class MockPaymentGateway:
    @staticmethod
    def create_payment_url(amount: float, order_id: int):
        sleep(1)
        return f"https://mock-payment-gateway.com/checkout?order_id={order_id}&amount={amount}"
    
    @staticmethod
    def check_payment_status(order_id: int):
        sleep(1)
        return random.choice(["PENDING", "PAID", "FAIDED"])
    
    @staticmethod
    def refurn_payment(payment_id: int):
        return random.choice([True,False])
    
    