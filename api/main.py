from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Optional, List
from pydantic.functional_validators import BeforeValidator
from pydantic import BaseModel, Field
from enum import Enum

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

class Industry(str, Enum):
    food = "food"
    retail = "retail"
    service = "service"
    hospitality = "hospitality"
    tech = "tech"
    other = "other"

class Funding(str, Enum):
    seed = "seed"
    scale = "scale"
    expand = "expand"

PyObjectId = Annotated[str, BeforeValidator(str)]

class BusinessModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    industry: List[Industry] = Field(...)
    subindustry: str = Field(...)
    funding: Funding = Field(...)
    description: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: str = Field(...)
    liked: List[PyObjectId] = []

class InvestorModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    industry: List[Industry] = Field(...)
    funding: Funding = Field(...)
    description: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: str = Field(...)
    seen: List[PyObjectId] = []
'{"name": "temp", "industry": "food", "subindustry": "sushi", "funding": "seed", "description": "good food", "firstName": "me", "lastName": "me:3", "email": "email address"}'
client = motor.AsyncIOMotorClient('mongodb+srv://freddiebriden:rPf3IfAprDkH1h3m@cluster0.jw0jeya.mongodb.net/?retryWrites=true&w=majority')
db = client.get_database("users")
business_collection = db.get_collection("businesses")
investor_collection = db.get_collection("investors")

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/addbusiness/")
async def add_business(business: BusinessModel):
    print(business.name)
    new_business = await business_collection.insert_one(
        business.model_dump(by_alias=True, exclude=["id"])
    )
    print(new_business.inserted_id)
    created_business = await business_collection.find_one(
        {"_id": new_business.inserted_id}
    )
    print(created_business)
    return "bleh"

@app.post("/addinvestor/")
async def add_investor(investor: InvestorModel):
    print(investor.name)
    new_investor = await investor_collection.insert_one(
        investor.model_dump(by_alias=True, exclude=["id"])
    )
    print(new_investor.inserted_id)
    created_investor = await investor_collection.find_one(
        {"_id": new_investor.inserted_id}
    )
    print(created_investor)
    return "bleh"

@app.get("/business/{name}")
async def get_business(name: str):
    if (
        business := await business_collection.find_one({"name": name})
    ) is not None:
        print(business)
    return "yeah"