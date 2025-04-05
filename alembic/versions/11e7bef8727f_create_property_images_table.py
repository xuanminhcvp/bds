"""create property_images table

Revision ID: 11e7bef8727f
Revises: None
Create Date: 2025-04-04
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
import uuid

# revision identifiers, used by Alembic.
revision = '11e7bef8727f'  # Phải có dòng này
down_revision = None       # Phải có dòng này (None nếu là migration đầu tiên)
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'property_images',
        sa.Column('id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True),
        sa.Column('property_id', UUID(as_uuid=True), nullable=False),
        sa.Column('image_url', sa.String(), nullable=False),
        sa.Column('is_primary', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['property_id'], ['properties.id']),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('property_images')