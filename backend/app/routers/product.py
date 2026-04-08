from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import SessionLocal
from app.schemas.product import ProductCreate, ProductResponse
from app.crud.product import create_product, get_products, get_product_by_id, update_product
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate


router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ProductResponse)
def create(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product)


@router.get("/", response_model=List[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_existing_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return updated_product