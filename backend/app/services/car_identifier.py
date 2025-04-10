import os
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()


class CarIdentifierService:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

    def identify(self, base64_image: str):
        response = self.client.responses.create(
            model="gpt-4o",
            input=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "Identify the car in this image and return all details in JSON.",
                        },
                        {
                            "type": "input_image",
                            "image_url": f"data:image/png;base64,{base64_image}",
                        },
                    ],
                }
            ],
            text={
                "format": {
                    "type": "json_schema",
                    "name": "car_identification",
                    "schema": self._get_schema(),
                    "strict": True,
                }
            },
        )
        return json.loads(response.output_text)

    def _get_schema(self):
        return {
            "type": "object",
            "properties": {
                "make": {"type": "string"},
                "model": {"type": "string"},
                "year": {"type": "integer"},
                "body_style": {"type": "string"},
                "engine": {"type": "string"},
                "horsepower_hp": {"type": "integer"},
                "acceleration_0_100_kmph_sec": {"type": "number"},
                "top_speed_kmph": {"type": "integer"},
                "drivetrain": {"type": "string"},
                "fuel_type": {"type": "string"},
                "original_msrp_usd": {"type": "integer"},
                "current_value_usd": {"type": "integer"},
                "rarity": {"type": "string"},
                "description": {"type": "string"},
                "confidence": {"type": "number"},
            },
            "required": [
                "make",
                "model",
                "year",
                "body_style",
                "engine",
                "horsepower_hp",
                "acceleration_0_100_kmph_sec",
                "top_speed_kmph",
                "drivetrain",
                "fuel_type",
                "original_msrp_usd",
                "current_value_usd",
                "rarity",
                "description",
                "confidence",
            ],
            "additionalProperties": False,
        }
