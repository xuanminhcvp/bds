"""Update Project model

Revision ID: 1fc7541dce6e
Revises: 696b1c91ed32
Create Date: 2025-06-09 12:31:28.092698

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1fc7541dce6e'
down_revision: Union[str, None] = '696b1c91ed32'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('is_approved', sa.Boolean(), nullable=False, server_default=sa.false()))
    op.add_column('project', sa.Column('expires_at', sa.DateTime(timezone=True), server_default=sa.text('now() + make_interval(secs=>259200.0)'), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('project', 'expires_at')
    op.drop_column('project', 'is_approved')
    # ### end Alembic commands ###
