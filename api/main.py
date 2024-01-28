from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Optional
from pydantic.functional_validators import BeforeValidator
from pydantic import BaseModel, Field
from enum import Enum
from bson import ObjectId
from mongostr import mongostr

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
    industry: list[Industry] = Field(...)
    subindustry: str = Field(...)
    funding: Funding = Field(...)
    description: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    liked: list[PyObjectId] = []

class InvestorModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    industry: list[Industry] = Field(...)
    funding: list[Funding] = Field(...)
    description: str = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    seen: list[PyObjectId] = []

class LikeModel(BaseModel):
    target: PyObjectId = Field(...)
    current: PyObjectId = Field(...)
    liked: bool = Field(...)

class IdModel(BaseModel):
    currId: PyObjectId = Field(...)

class InvestorModelList(BaseModel):
    investors: list[InvestorModel] = Field(...)

class LoginInfoModel(BaseModel):
    email: str = Field(...)
    password: str = Field(...)

class LoginOutModel(BaseModel):
    current: PyObjectId = Field(...)
    business: bool = Field(...)

client = motor.AsyncIOMotorClient(mongostr.key)
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
    print(type(new_business.inserted_id))
    created_business = await business_collection.find_one(
        {"_id": new_business.inserted_id}
    )
    print(created_business)
    return str(new_business.inserted_id)

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
    return str(new_investor.inserted_id)

@app.post("/likebusiness/")
async def like_business(liked: LikeModel):
    if liked.liked:
        result = await business_collection.update_one({"_id": ObjectId(liked.target)}, {"$push": {"liked": ObjectId(liked.current)}})
    result2 = await investor_collection.update_one({"_id": ObjectId(liked.current)}, {"$push": {"seen": ObjectId(liked.target)}})
    return "nya"

@app.post(
    "/recommend/",
    response_model=BusinessModel
)
async def recommend(current: IdModel):
    investor = await investor_collection.find_one({"_id": ObjectId(current.currId)})
    business = await business_collection.find_one({"industry": {"$in": investor["industry"]}, "funding": {"$in": investor["funding"]}, "_id": {"$nin": investor["seen"]}})
    return business

@app.post(
    "/getinvestors/",
    response_model=InvestorModelList
)
async def get_investors(current: IdModel):
    business = await business_collection.find_one({"_id": ObjectId(current.currId)})
    output = [x async for x in investor_collection.find({"_id": {"$in": business["liked"]}})]
    return {"investors": output}

@app.post(
    "/login/",
    response_model=LoginOutModel
)
async def login(current: LoginInfoModel):
    if (
        business := await business_collection.find_one({"email": current.email, "password": current.password})
    ) != None:
        return {"current": business.id, business: True}
    investor = await investor_collection.find_one({"email": current.email, "password": current.password})
    return {"current": investor.id, business:False}