from flask import Flask,request, jsonify
import pickle
import json


app = Flask(__name__)
price_model = pickle.load(open('mumbai_house_prices_model.pickle','rb'))
encondings = {
    'Unknown':0,
    'Resale':1,
    'New':2,
    'Under Construction':0,
    'Ready to move':1,
}

@app.route('/predict-price',methods=['POST','GET'])
def hello():
    location = request.form.get('location')
    area = int(request.form.get('area'))
    bhk = int(request.form.get('bhk'))
    status = encondings[request.form.get('status')]
    age = encondings[request.form.get('age')]
    
    input_features = [location,area,bhk,status,age]
    print(input_features)
    prediction = price_model.predict([input_features])
    return jsonify({'predicted_price':prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)