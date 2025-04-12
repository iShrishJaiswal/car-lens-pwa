from fastapi import FastAPI
from services.car_identifier import CarIdentifierService
from models.car import CarInfo, IdentifyCarInput
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
service = CarIdentifierService()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "Hello": "Welcome to car-lens-pwa backend. Probably on the wrong endpoint I believe?"
    }

@app.post("/get_car_info", response_model=CarInfo)
def identify_car(params: IdentifyCarInput) -> CarInfo:
    return service.identify(params.base64_image)
