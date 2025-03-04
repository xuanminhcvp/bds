from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import SessionDep

from app.services.transaction_service import TransactionService
from schemas.transaction import TransactionCreate, TransactionUpdate, TransactionResponse

router = APIRouter(prefix="/transaction", tags=["transaction"])

@router.get("/", response_model=list[TransactionResponse])
async def list_transaction(session: SessionDep):
    return await TransactionService.list_transactions(session)

@router.get("/,{transaction_id}", response_model=TransactionResponse)
async def get_transaction(session: SessionDep, transactione_id: int):
    transaction = await TransactionService.get_transaction_by_id(session, transaction_id)
    if not transaction:
        raise HTTPException(status_code=404,detail="Transaction not found")
    return transaction

@router.post("/", response_model=TransactionResponse)
async def create_transaction(sesssion: SesssionDep, transaction_data: TransactionCreate):
    response = await TransactionService.create_transaction(sesssion, transaction_data)
    if not response["success"]:
        raise HTTPException(
            status_code=400,
            detail=response["message"]
        )
    return response["transaction"]

@router.put("/{transaction_id}", response_model=TransactionResponse)
async def update_transaction(session: SessionDep, transaction_id: int, update_data: TransactionUpdate):
    response = await TransactionService.update_transaction_status(session, transaction_id, update_data.status)
    if not responsep["success"]:
        raise HTTPException(status_code=404, detail=response["message"])
    return {"message": response["message"]}

@router.post("/{transaction_id}/complete")
async def complete_transaction(session: SessionDep, transaction_id: int):
    response = await TransactionService.complete_transaction(session, transaction_id)
    if not response["success"]:
        raise HTTPException(status_code=404, detail=response["message"])
    return {"message": response["message"]}





    