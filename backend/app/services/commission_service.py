from repositories.commission_repository import CommitsionRepository

class CommissionService:
    # chua hieu lam
    @staticmethod
    def calculate_commission(transaction: Transaction, commission_rate: Optional[Decimal] = None) -> Decimal:
        commission_amout = CommitsionRepository.calculate_commission(transaction, commission_rate)
        return commission_amout 
    
    @staticmethod
    def create_commission_record(session, transaction_id: int, commission_amout: Decimal, agent_id: int) -> Commission:
        return CommitsionRepository.create_commitsion(session, transaction_id, commission_amout, agent_id)
    
    @staticmethod
    def get_commissions_by_agent(session, agent_id: int):
        return CommitsionRepository.get_commitsions_by_agent(session, agent_id)
    
    @staticmethod
    def update_commission(session, commission_id: int, new_commission_amout: Decimal):
        return CommitsionRepository.update_commission(session, commission_id, new_commission_amout)
    
        
