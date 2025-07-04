"""empty message

Revision ID: 41fbb9f737f9
Revises: 2197f6acac5c
Create Date: 2025-06-06 19:07:28.902832

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41fbb9f737f9'
down_revision: Union[str, None] = '2197f6acac5c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('transaction', sa.Column('description', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('transaction', 'description')
    # ### end Alembic commands ###
