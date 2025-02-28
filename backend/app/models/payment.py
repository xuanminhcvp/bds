from sqlalchemy import Column, Integer, ForeignKey, String, DECIMAL, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import Base 

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"))
    amount = Column(DECIMAL(10,2))
    payment_method = Column(String)
    payment_status = Column(String)
    payment_date = Column(DateTime, default=datetime.utcnow)

    transaction = relationship("Transaction", back_populates="payments")

