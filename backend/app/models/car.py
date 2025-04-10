from pydantic import BaseModel

class CarInfo(BaseModel):
    make: str
    model: str
    year: int
    body_style: str
    engine: str
    horsepower_hp: int
    acceleration_0_100_kmph_sec: float
    top_speed_kmph: int
    drivetrain: str
    fuel_type: str
    original_msrp_usd: int
    current_value_usd: int
    rarity: str
    description: str
    confidence: float

class IdentifyCarInput(BaseModel):
    base64_image: str