import uuid
from sqlalchemy import Column, Integer, ForeignKey, DECIMAL
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Commission(Base):
    __tablename__ = "commissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transactions.id"), nullable=False)
    commission_amout = Column(DECIMAL(10,2), nullable=False)
    

    