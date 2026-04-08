from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.product import Product
from app.models.user import User
from app.models.stock_movement import StockMovement
from app.schemas.stock_movement import StockMovementCreate

def get_stock_movements(db: Session):
    return db.query(StockMovement).all()

def create_stock_movement(db: Session, movement_data: StockMovementCreate):
    product = db.query(Product).filter(Product.id == movement_data.product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado.")

    if not product.is_active:
        raise HTTPException(status_code=400, detail="Produto inativo não pode receber movimentação.")

    user = db.query(User).filter(User.id == movement_data.user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Usuário inativo não pode realizar movimentação.")

    if movement_data.movement_type == "EXIT":
        if product.current_stock < movement_data.quantity:
            raise HTTPException(status_code=400, detail="Estoque insuficiente para realizar a saída.")

        product.current_stock -= movement_data.quantity

    elif movement_data.movement_type == "ENTRY":
        product.current_stock += movement_data.quantity
    if product.current_stock < 0:
        raise HTTPException(status_code=400, detail="Erro de consistência de estoque.")

    movement = StockMovement(
        product_id=movement_data.product_id,
        user_id=movement_data.user_id,
        movement_type=movement_data.movement_type,
        quantity=movement_data.quantity,
        reason=movement_data.reason,
        notes=movement_data.notes
    )

    db.add(movement)
    db.commit()
    db.refresh(movement)
    db.refresh(product)

    return {
        "message": "Movimentação realizada com sucesso.",
        "product_id": product.id,
        "current_stock": product.current_stock,
        "movement_id": movement.id
    }