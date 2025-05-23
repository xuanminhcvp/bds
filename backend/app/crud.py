from uuid import UUID, uuid4 
from typing import Any 

from sqlmodel import Session, select, update, delete 
from backend.schemas.user import UserCreate, UserUpdate, UserSchema
from backend.schemas.property import PropertyCreate, Property
from backend.schemas.transaction import TransactionCreate, TransactionUpdate
from backend.schemas.review import ReviewCreate, Review
from backend.app.models import User, Transaction
from backend.app.core.security import get_password_hash, verify_password 

def create_user(*, session: Session, user_create: UserCreate) -> UserSchema:
    
    hashed_password = get_password_hash(user_create.password)
    
    db_obj = User(
        id=uuid4(),
        email=user_create.email,
        full_name=user_create.full_name,
        hashed_password=hashed_password
    )
    # db_obj = UserSchema.model_validate(
    #    user_create, update={"hashed_password": get_password_hash(user_create.password)}
    # )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def update_user(*, session: Session, db_user: UserSchema, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

async def get_user_by_email(*, session: Session, email: str) -> UserSchema | None:
    statement = select(User).where(User.email == email)
    result = await session.exec(statement)
    session_user = result.scalars().first()
    return session_user

async def authenticate(*, session: Session, email: str, password: str) -> UserSchema | None:
    db_user = await get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user

def create_property(*, session: Session, property: PropertyCreate, owner_id: UUID):
    db_property = Property(id=uuid4(),**property.model_dump(), owner_id=owner_id)
    session.add(db_property)
    session.commit()
    session.refresh(db_property)
    return db_property

def get_property(session: Session, property_id: UUID):
    statement = select(Property).where(Property.id == property_id)
    result = session.exec(statement)
    return result.scalar_one_or_none()

def get_all_properties(session: Session, skip: int = 0, limit: int = 10):
    statement = select(Property).offset(skip).limit(limit)
    result = session.exec(statement)
    return result.scalars().all()

def update_property(session: Session, property_id: UUID, update_data: dict):
    statement = (
        update(Property)
        .where(Property.id == property_id)
        .values(**update_data)
    )
    session.exec(statement)
    session.commit() 

def delete_property(session: Session, property_id: UUID):
    statement = delete(Property).where(Property.id == property_id)
    session.exec(statement)
    session.commit()

def create_transaction(db: Session, transaction: TransactionCreate):
    db_transaction = Transaction(id=uuid4(), **transaction.model_dump(), status="pending")
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transaction(session: Session, transaction_id: UUID):
    statement = select(Transaction).where(Transaction.id == transaction_id)
    result = session.exec(statement)
    return result.scalar_one_or_none()

def get_transactions_by_user(session: Session, user_id: UUID):
    statement = select(Transaction).where(Transaction.user_id == user_id)
    result = session.exec(statement)
    return result.scalars().all()

def update_transaction(session: Session, transaction_id: UUID, update_data: dict):
    statement = (
        update(Transaction)
        .where(Transaction.id == transaction_id)
        .values(**update_data)
    )
    session.exec(statement)
    session.commit()

def delete_transaction(session: Session, transaction_id: UUID):
    statement = (
        delete(Transaction)
        .where(Transaction.id == transaction_id)
    )
    session.exec(statement)
    session.commit()

def create_review(session: Session, review: ReviewCreate):
    db_review = Review(id=uuid4(), **review.model_dump())  
    session.add(db_review)
    session.commit()
    session.refresh(db_review)
    return db_review

def get_reviews_by_property(session: Session, property_id: UUID):
    statement = select(Review).where(Review.property_id == property_id)
    result = session.exec(statement)
    return result.scalars().all()

def update_review(session: Session, review_id: UUID, update_data: dict):
    statement = (
        update(Review)
        .where(Review.id == review_id)
        .values(**update_data)
    )
    session.exec(statement)
    session.commit()

def delete_review(session: Session, review_id: UUID):
    statement = (
        delete(Review)
        .where(Review.id == review_id)
    )
    session.exec(statement)
    session.commit()
