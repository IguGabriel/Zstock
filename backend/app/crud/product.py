from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException

from app.models.product import Product
from app.models.supplier import Supplier
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product: ProductCreate):
    if product.supplier_id is not None:
        supplier = db.query(Supplier).filter(Supplier.id == product.supplier_id).first()

        if not supplier:
            raise HTTPException(status_code=400, detail="Fornecedor não encontrado")

    db_product = Product(
        code=product.code,
        name=product.name,
        description=product.description,
        sku=product.sku,
        category=product.category,
        storage_type=product.storage_type,
        unit=product.unit,
        minimum_stock=product.minimum_stock,
        price=product.price,
        supplier_id=product.supplier_id
    )

    try:
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product

    except IntegrityError as e:
        db.rollback()
        error_message = str(e.orig)

        if "products_sku_key" in error_message:
            raise HTTPException(status_code=409, detail="Já existe um produto com este SKU.")

        if "products_code_key" in error_message:
            raise HTTPException(status_code=409, detail="Já existe um produto com este código.")

        raise HTTPException(status_code=400, detail="Erro de integridade ao cadastrar produto.")


def get_products(db: Session):
    return db.query(Product).all()


def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, product_data: ProductUpdate):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return None

    if product_data.supplier_id is not None:
        supplier = db.query(Supplier).filter(Supplier.id == product_data.supplier_id).first()

        if not supplier:
            raise HTTPException(status_code=400, detail="Fornecedor não encontrado")

    product.code = product_data.code
    product.name = product_data.name
    product.description = product_data.description
    product.sku = product_data.sku
    product.category = product_data.category
    product.storage_type = product_data.storage_type
    product.unit = product_data.unit
    product.minimum_stock = product_data.minimum_stock
    product.price = product_data.price
    product.supplier_id = product_data.supplier_id
    product.is_active = product_data.is_active

    try:
        db.commit()
        db.refresh(product)
        return product

    except IntegrityError as e:
        db.rollback()
        error_message = str(e.orig)

        if "products_sku_key" in error_message:
            raise HTTPException(status_code=409, detail="Já existe um produto com este SKU.")

        if "products_code_key" in error_message:
            raise HTTPException(status_code=409, detail="Já existe um produto com este código.")

        raise HTTPException(status_code=400, detail="Erro de integridade ao atualizar produto.")