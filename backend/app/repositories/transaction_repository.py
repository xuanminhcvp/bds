from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from schemas.transaction import Transaction

class TransactionRepository:
    @staticmethod
    async def get_all_transactions(db: AsyncSession):
        result = await db.execute(select(Transaction))
        return result.scalar().all()
    
    @staticmethod
    async def get_transaction_by_id(db: AsyncSession, transaction_id: int):
        return await db.get(Transaction, transaction_id)
    
    @staticmethod
    async def create_transaction(db: AsyncSession, transaction_data: TransactionCreate)
        new_transaction = Transaction(**transaction_data.dict())
        db.add(new_transaction)
        await db.commit()
        await db.refresh(new_transaction)
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


