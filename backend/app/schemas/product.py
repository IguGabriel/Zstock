from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    sku: str
    category: str
    storage_type: str
    unit: str
    minimum_stock: int
    price: Optional[float] = None
    supplier_id: Optional[int] = None


class ProductResponse(BaseModel):
    id: int
    code: str
    name: str
    description: Optional[str] = None
    sku: str
    category: str
    storage_type: str
    unit: str
    current_stock: int
    minimum_stock: int
    price: Optional[float] = None
    supplier_id: Optional[int] = None

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    sku: str
    category: str
    storage_type: str
    unit: str
    minimum_stock: int
    price: Optional[float] = None
    supplier_id: Optional[int] = None
    is_active: bool