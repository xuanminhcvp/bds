from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from backend.app.database import Base

class Wallet(Base):
    __tablename__ = "wallet"
    wallet_id = Column(Integer, primary_key=True, autoincrement=True, index=True)    
    user_id = Column(UUID, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    balance = Column(Float, default=0.0)
    user = relationship("User", back_populates="wallet")