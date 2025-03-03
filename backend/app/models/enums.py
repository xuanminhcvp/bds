from enum import Enum

class TransactionStatusEnum(enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELED = "canceled"

