from fastapi import APIRouter, Depends, status, HTTPException
from backend.app.api.deps import SessionDep, CurrentUser
from sqlalchemy import select
from backend.app.model import Wallet
from backend.app.schemas.wallets import WalletResponse, DepositRequest

router = APIRouter(prefix="/wallets", tags=["wallets"])

@router.get("/", response_model=WalletResponse)
async def get_wallet(session: SessionDep, current_user: CurrentUser):
    stmt = select(Wallet).where(Wallet.user_id == current_user.id)  
    result = await session.execute(stmt) 
    wallet = result.scalars().first()
    if not wallet: 
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet not found for the current user"
        )
    return wallet

@router.post("/deposit", response_model=WalletResponse)
async def deposit(session: SessionDep, current_user: CurrentUser, deposit: DepositRequest):
    if deposit.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Số tiền phải lớn hơn 0"
        )
    stmt = select(Wallet).where(Wallet.user_id == current_user.id)  
    result = await session.execute(stmt)
    wallet = result.scalars().first()
    wallet.balance += deposit.amount
    session.add(wallet)
    await session.commit()
    await session.refresh(wallet)
    return wallet