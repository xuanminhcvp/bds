from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.schemas.transaction import TransactionCreate
from backend.app.models.transaction import Transaction
from uuid import UUID, uuid4

class TransactionRepository:
    #done
    @staticmethod
    async def create_transaction(session: AsyncSession, transaction_data: TransactionCreate):
        new_transaction = Transaction(
            buyer_id=transaction_data.buyer_id,
            seller_id=transaction_data.seller_id,
            property_id=transaction_data.property_id,
            amount=transaction_data.amount
        )
        session.add(new_transaction)
        await session.commit()
        await session.refresh(new_transaction)
        return new_transaction
    

