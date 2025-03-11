from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.repositories.transaction_repository import TransactionRepository
from backend.app.services.property_service import PropertyService
from backend.schemas.transaction import TransactionCreate

class TransactionService:
    @staticmethod
    async def list_transactions(db: AsyncSession):
        return await TransactionRepository.get_all_transactions(db)
    
    # success
    @staticmethod
    async def get_transaction_by_id(session: AsyncSession, transaction_id: int):
        return await TransactionRepository.get_transaction_by_id(session, transaction_id)
    
    @staticmethod
    async def create_transaction(session: AsyncSession, transaction_data: TransactionCreate):
        property = await PropertyService.get_property_by_id(session, transaction_data.property_id)

        if not property or property.status != "Avaiable":
            return {
        "success": False,  
        "message": "Property is not available",
        "property_details": {
            "id": str(property.id) if property else None,
            "title": property.title if property else None,
            "description": property.description if property else None,
            "price": float(property.price) if property else None,
            "location": property.location if property else None,
            "area": float(property.area) if property else None,
            "bedrooms": property.bedrooms if property else None,
            "bathrooms": property.bathrooms if property else None,
            "property_type": property.property_type if property else None,
            "status": property.status if property else None,
            "owner_id": str(property.owner_id) if property else None,
            "is_verified": property.is_verified if property else None,
            "created_at": property.created_at.isoformat() if property else None,
            "updated_at": property.update_at.isoformat() if property else None
        }}
            # return {"success": False, "message": "Property is not avaiable"}

        transaction = await TransactionRepository.create_transaction(session, transaction_data)
        return {"success": True, "transaction": transaction}
    
    @staticmethod
    async def update_transaction_status(db: AsyncSession, transaction_id: int, status: str):
        transaction = await TransactionRepository.update_transaction_status(db, transaction_id, status)
        if not transaction:
            return {"success": False, "message": "Transaction not found"}
        return {"success": True, "message": "Transaction Updated"}

    @staticmethod
    async def complete_transaction(db: AsyncSession, transaction_id: int):
        transaction = await TransactionRepository.get_transaction_by_id(db, transaction_id)
        if not transaction or transaction.status != "pending":
            return {"success": False, "message": "Invalid transaction"}
        transaction.status = "completed"
        await db.commit()

        await PropertyService.update_property_status(db, transaction.property_id, "sold")
        return {"success": True, "message": "transaction completed"}
        
                 

        