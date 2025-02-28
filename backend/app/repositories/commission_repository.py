from sqlalchemy.orm import Session
from app.models import Commitsion 
from decimal import Decimal
import SessionDep

class CommitsionRepository:
    @staticmethod
    def get_commitsion_by_id(session: SessionDep, commitsion_id: int) -> Commitsion:
        return session.select(Commitsion).filter(Commitsion.id == commitsion_id).first()
    
    @staticmethod
    def get_commitsions_by_agent(session: SessionDep, agent_id: int):
        return session.select(Commitsion).filter(Commitsion.agent_id == agent_id).all()
    
    # chua hieu lam 
    @staticmethod 
    def create_commitsion(session: SessionDep, transaction_id: int, commission_amout: Decimal, agent_id: int) -> Commitsion:
        commission_record = Commitsion(
            transaction_id=transaction_id,
            commission_amout=commission_amout,
            agent_id=agent_id
        )
        session.add(commission_record)
        session.commit()
        session.refresh(commission_record)
        return commission_record
    
    @staticmethod
    def update_commission(sesssion: SessionDep, commitsion_id: int, new_commission_amout: Decimal) -> Commitsion:
        commission = sesssion.select(Commitsion).filter.(Commission.id == commission_id).first()
        if commission:
            commission.commission_amout = new_commission_amout
            sesssion.commit()
            sesssion.refresh(commission)
            return commission
        return None
    
    @staticmethod
    def delete_commission(session: SessionDep, commission_id: int) -> bool:
        commission = session.select(Commitsion).filter(Commitsion.id == commission_id).first()
        if commission:
            session.delete(commission)
            session.commit()
            return True
        return False
    
