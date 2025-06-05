"""cascade delete wallet

Revision ID: 2197f6acac5c
Revises: a11003b8f017
Create Date: 2025-06-03 02:46:15.727951

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2197f6acac5c'
down_revision: Union[str, None] = 'a11003b8f017'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Xóa ràng buộc khóa ngoại cũ
    op.drop_constraint('wallet_user_id_fkey', 'wallet', type_='foreignkey')
    # Tạo ràng buộc khóa ngoại mới với ondelete='CASCADE' và đặt tên cụ thể
    op.create_foreign_key('wallet_user_id_fkey', 'wallet', 'user', ['user_id'], ['id'], ondelete='CASCADE')


def downgrade() -> None:
    # Xóa ràng buộc khóa ngoại có ondelete='CASCADE'
    op.drop_constraint('wallet_user_id_fkey', 'wallet', type_='foreignkey')
    # Tạo lại ràng buộc khóa ngoại cũ (không có ondelete='CASCADE')
    op.create_foreign_key('wallet_user_id_fkey', 'wallet', 'user', ['user_id'], ['id'])