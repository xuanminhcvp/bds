from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.transaction_repository import TransactionRepository
from backend.app.services.property_service import PropertyService
from backend.schemas.transaction import TransactionCreate
from backend.app.models.transaction import Transaction


class TransactionService:
    #done
    @staticmethod
    async def create_transaction(session: AsyncSession, transaction_data: TransactionCreate):
        return await TransactionRepository.create_transaction(session, transaction_data)
    
    

                 

        