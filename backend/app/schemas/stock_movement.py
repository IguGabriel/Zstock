from pydantic import BaseModel, field_validator
from typing import Literal, Optional


class StockMovementCreate(BaseModel):
    product_id: int
    user_id: int
    movement_type: Literal["ENTRY", "EXIT"]
    quantity: int
    reason: str
    notes: Optional[str] = None

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, value: int):
        if value <= 0:
            raise ValueError("A quantidade deve ser maior que zero.")
        return value