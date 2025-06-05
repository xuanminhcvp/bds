from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func 
from backend.app.database import Base

class Transaction(Base):
    __tablename__ = "transaction"
    transaction_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    property_id = Column(Integer, ForeignKey("property.property_id", ondelete="CASCADE"), nullable=True)
    transaction_type = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="transaction")
    property = relationship("Property", back_populates="transaction")
