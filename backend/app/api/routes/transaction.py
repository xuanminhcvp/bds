from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.api.deps import SessionDep, CurrentUser
from backend.app.model.transaction import Transaction
from backend.app.model.property import Property

from backend.app.schemas.transaction import TransactionCreate, Message, TransactionResponse, TransactionCreateProject

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/", response_model=TransactionResponse)
async def create_transaction(session: SessionDep, transaction_data: TransactionCreate, current_user: CurrentUser):
    user_id = current_user.id  
    transaction_type = transaction_data.transaction_type
    amount = transaction_data.amount
    amount_formatted = f"{amount:,.0f}" 
    if transaction_data.property_id is not None:
        description = f"Payment for property {transaction_data.property_id} of amount {amount_formatted}"
    else:
        description = f"Deposit transaction of amount {amount_formatted}"
    data = Transaction(
        user_id=user_id,
        property_id=transaction_data.property_id,
        transaction_type=transaction_type,
        amount=amount,
        description=description
    )

    session.add(data)
    await session.commit()
    await session.refresh(data)
    response = TransactionResponse(
        title=data.property.title if data.property else None,
        transaction_type=data.transaction_type,
        amount=data.amount,
        description=data.description,
        created_at=data.created_at
    )
    return response

@router.post("/project", response_model=TransactionResponse)
async def create_project_transaction(session: SessionDep, transaction_data: TransactionCreateProject, current_user: CurrentUser):
    user_id = current_user.id  
    transaction_type = transaction_data.transaction_type
    amount = transaction_data.amount
    amount_formatted = f"{amount:,.0f}" 
    description = f"Payment for project {transaction_data.project_id} of amount {amount_formatted}"
    data = Transaction(
        user_id=user_id,
        project_id=transaction_data.project_id,
        transaction_type=transaction_type,
        amount=amount,
        description=description
    )

    session.add(data)
    await session.commit()
    await session.refresh(data)

    response = TransactionResponse(
        title= 'Dự án',
        transaction_type=data.transaction_type,
        amount=data.amount,
        description=data.description,
        created_at=data.created_at
    )
    return response

@router.get("/me", response_model=list[TransactionResponse])
async def get_transactions_by_user(session: SessionDep, current_user: CurrentUser):
    user_id = current_user.id 
    stmt = select(Transaction).where(Transaction.user_id == user_id).options(
        selectinload(Transaction.property))
    transactions = await session.execute(stmt)
    transaction_list = transactions.scalars().all()
    
    result = [
        TransactionResponse(
            title=trans.property.title if trans.property else None,
            transaction_type=trans.transaction_type,
            amount=trans.amount,
            description=trans.description,
            created_at=trans.created_at
        )
        for trans in transaction_list
    ]
    return result

@router.get("/property/{property_id}", response_model=list[TransactionResponse])
async def get_transactions_by_property(session: SessionDep, property_id: int):
    if not property_id:
        raise HTTPException(status_code=400, detail="Property ID is required")
    stmt = select(Transaction).where(Transaction.property_id == property_id).options(
        selectinload(Transaction.property))
    transactions = await session.execute(stmt)
    transaction_list = transactions.scalars().all()
    
    result = [
        TransactionResponse(
            title=trans.property.title if trans.property else None,
            transaction_type=trans.transaction_type,
            amount=trans.amount,
            description=trans.description,
            created_at=trans.created_at
        )
        for trans in transaction_list
    ]
    return result




"""
@router.get("/", response_model=list[TransactionResponse])
async def list_transaction(session: SessionDep):
    return await TransactionService.list_transactions(session)



# success
@router.get("/{transaction_id}", response_model=TransactionResponse)
async def get_transaction(session: SessionDep, transaction_id: UUID):
    transaction = await TransactionService.get_transaction_by_id(session, transaction_id)
    if not transaction:
        raise HTTPException(status_code=404,detail="Transaction not found")
    return transaction







@router.put("/{transaction_id}", response_model=TransactionResponse)
async def update_transaction(session: SessionDep, transaction_id: int, update_data: TransactionUpdate):
    response = await TransactionService.update_transaction_status(session, transaction_id, update_data.status)
    if not response["success"]:
        raise HTTPException(status_code=404, detail=response["message"])
    return {"message": response["message"]}

@router.post("/{transaction_id}/complete")
async def complete_transaction(session: SessionDep, transaction_id: int):
    response = await TransactionService.complete_transaction(session, transaction_id)
    if not response["success"]:
        raise HTTPException(status_code=404, detail=response["message"])
    return {"message": response["message"]}




"""
