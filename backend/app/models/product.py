from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Numeric
from datetime import datetime
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    sku = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)
    storage_type = Column(String, nullable=False)
    unit = Column(String, nullable=False)
    current_stock = Column(Integer, default=0, nullable=False)
    minimum_stock = Column(Integer, default=0, nullable=False)
    price = Column(Numeric(10, 2), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=True)