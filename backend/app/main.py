from fastapi import FastAPI
from services.car_identifier import CarIdentifierService
from models.car import CarInfo, IdentifyCarInput

app = FastAPI()
service = CarIdentifierService()

@app.get("/")
def root():
    return {
        "Hello": "Welcome to car-lens-pwa backend. Probably on the wrong endpoint I believe?"
    }

@app.post("/get_car_info", response_model=CarInfo)
def identify_car(params: IdentifyCarInput) -> CarInfo:
    return service.identify(params.base64_image)
