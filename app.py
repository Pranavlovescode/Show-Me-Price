from flask import Flask,request, jsonify
import pickle
import json
import numpy as np


app = Flask(__name__)

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
    location = request.form.get('location')
    area = int(request.form.get('area'))
    bhk = int(request.form.get('bhk'))
    status = encondings[request.form.get('status')]
    age = encondings[request.form.get('age')]
    
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
    return jsonify({'predicted_price':round(prediction[0],2)})

if __name__ == '__main__':
    app.run(debug=True)
    