from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from langdetect import detect

import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load('naive bayes/model.joblib')
vectorizer = joblib.load('naive bayes/vectorizer.joblib')

@app.route('/')
def hello_world():
    return "Hello, cross origin word"

@app.route('/predict', methods=['POST'])
def predict():
    target = ''
    data = None
    if request.method =='POST':
        sentence = request.form['sentences']
        if detect(sentence) != 'id':
            return Response(
                "Bahasa yang bisa diprediksi hanya Bahasa Indonesia",
                status=400
            )
        sentence_vector = vectorizer.transform([sentence])
        result = model.predict(sentence_vector)

        if(result[0] == '0'): target = 'unradical'
        elif(result[0] == '1'): target = 'radical'

        proba_result = model.predict_proba(sentence_vector)
        proba = [round(predict*100 )for predict in proba_result[0]]
        data = {
            'predict' : target,
            'prob': {
                'unradical': proba[0],
                'radical': proba[1],
            }
        }

        response = jsonify(data), 200
        return response



def sentence_to_vectors(sentence):
    return vectorizer.transform(sentence)
