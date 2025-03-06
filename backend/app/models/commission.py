from sqlalchemy import Column, Integer, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Commission(Base):
    __tablename__ = "commissions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer,ForeignKey("transactions.id"))
    commission_amout = Column(DECIMAL(10,2))
    # agent_id = Column(Integer, ForeignKey("agents.id"))

    