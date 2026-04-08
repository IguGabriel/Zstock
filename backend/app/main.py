from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models.user import User
from app.models.supplier import Supplier
from app.models.product import Product
from app.models.stock_movement import StockMovement
from app.routers import product, stock_movement

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ZStock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)
app.include_router(stock_movement.router)


@app.get("/")
def read_root():
    return {"message": "ZStock API is running"}