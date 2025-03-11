from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.schemas.transaction import TransactionCreate
from backend.app.models.transaction import Transaction
from uuid import UUID

class TransactionRepository:
    @staticmethod
    async def get_all_transactions(db: AsyncSession):
        result = await db.execute(select(Transaction))
        return result.scalar().all()
    
    # success
    @staticmethod
    async def get_transaction_by_id(session: AsyncSession, transaction_id: UUID):
        result = session.execute(select(Transaction).where(Transaction.id == transaction_id))
        transaction = result.scalars().first()  
        if transaction is None:
            return None  
        return transaction
    
    
    @staticmethod
    async def create_transaction(session: AsyncSession, transaction_data: TransactionCreate):
        new_transaction = Transaction(**transaction_data.model_dump())
        session.add(new_transaction)
        await session.commit()
        await session.refresh(new_transaction)
        return new_transaction
    
    @staticmethod
    async def update_transaction_status(db: AsyncSession, transaction_id: int, status: str):
        transaction = await db.get(Transaction, transaction_id)
        if not transaction:
            return None 
        transaction_status = status 
        await db.commit()
        await db.refresh(transaction)
        return transaction


