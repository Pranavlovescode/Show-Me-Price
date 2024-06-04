from flask import Flask,request, jsonify
import pickle
import json
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

with open('mumbai_house_prices_model.pkl','rb') as f:
    price_model = pickle.load(f)

with open('columns.json','r') as f:
    data_columns = json.load(f)['data_columns']
    loc = data_columns[4:]

# print(loc)

encondings = {
    'Unknown':0,
    'Resale':1,
    'New':2,
    'Under Construction':0,
    'Ready to move':1,
}



@app.route('/predict-price',methods=['POST','GET'])
def model():
    location = request.json.get('location')
    area = request.json.get('area')
    bhk = request.json.get('bhk')
    status = encondings[request.json.get('status')]
    age = encondings[request.json.get('age')]
    
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
    return jsonify({'predicted_price':round(prediction[0],2)})


@app.route('/',methods=['GET'])
def get_location():
    return jsonify({'locations':loc})

if __name__ == '__main__':
    app.run(debug=True)
    