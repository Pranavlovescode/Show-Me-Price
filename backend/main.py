
import pickle
import json
import numpy as np
from fastapi import FastAPI,requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

origins=[
    'http://localhost:3000',
    'https://showmeprice.pranavtitambe.in'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# print(loc)

encondings = {
    'Unknown':0,
    'Resale':1,
    'New':2,
    'Under Construction':0,
    'Ready to move':1,
}


class Item(BaseModel):
    location:str
    area:float
    bhk:int
    status:str
    age:str


@app.post('/predict-price')
async def model(item:Item):
    with open('mumbai_house_prices_model.pkl','rb') as f:
        price_model = pickle.load(f)

    with open('columns.json','r') as f:
        data_columns = json.load(f)['data_columns']
        loc = data_columns[4:]
    
    location = item.location
    area = item.area
    bhk = item.bhk
    status = encondings[item.status]
    age = encondings[item.age]
    print(location,area,bhk,status,age)
    if location =='Andheri West':
        x = np.zeros(len(data_columns))
        x[0] = bhk
        x[1] = area
        x[2] = status
        x[3] = age   
    else:
        loc_index = data_columns.index(location.lower())
        x = np.zeros(len(data_columns))
        x[0] = bhk
        x[1] = area
        x[2] = status
        x[3] = age
        if loc_index >= 0:
            x[loc_index] = 1

    prediction = price_model.predict([x])
    print(round(prediction[0],2))
    return {'predicted_price':round(prediction[0],2)}


@app.get('/')
def get_location():
    with open('mumbai_house_prices_model.pkl','rb') as f:
        price_model = pickle.load(f)

    with open('columns.json','r') as f:
        data_columns = json.load(f)['data_columns']
        loc = data_columns[4:]
    return {'locations':loc}


    