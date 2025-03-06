from .user import User, Role
from .commission import Commission
from .contacthistory import ContactHistory
from .crawedproperty import CrawledProperty
from .enums import TransactionStatusEnum
from .image import Image
from .payment import Payment
from .property import Property
from .review import Review
from .transaction import Transaction
from .wishlist import Wishlist
from .payment import Payment
from backend.app.database import Base

Base.registry.configure()




