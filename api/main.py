from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Optional
from pydantic.functional_validators import BeforeValidator
from pydantic import BaseModel, Field

import motor.motor_asyncio as motor

import os

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PyObjectId = Annotated[str, BeforeValidator(str)]

class BusinessModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)

client = motor.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.get_database("users")
business_collection = db.get_collection("businesses")

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/addbusiness/")
async def add_business(business: BusinessModel):
    new_business = await business_collection.insert_one(
        business.model_dump(by_alias=True, exclude=["id"])
    )
    created_business = await business_collection.find_one(
        {"_id": new_business.inserted_id}
    )
    return created_business