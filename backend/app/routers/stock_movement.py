from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.stock_movement import StockMovementCreate
from app.crud.stock_movement import create_stock_movement
from app.crud.stock_movement import get_stock_movements

router = APIRouter(prefix="/stock-movements", tags=["Stock Movements"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_movement(movement: StockMovementCreate, db: Session = Depends(get_db)):
    return create_stock_movement(db, movement)

@router.get("/")
def list_movements(db: Session = Depends(get_db)):
    return get_stock_movements(db)