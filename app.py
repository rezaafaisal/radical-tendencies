from flask import Flask, jsonify, request
from flask_cors import CORS

from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load('models/model.joblib')

@app.route('/')
def hello_world():
    return "Hello, cross origin word"

@app.route('/predict', methods=['POST'])
def predict():
    target = ''
    data = None
    if request.method =='POST':
        vector = sentence_to_vectors(request.form['sentences'])
        result = model.predict(vector)

        if(result == '0'): target = 'netral'
        elif(result == '1'): target = 'positif'
        elif(result == '2'): target = 'radikal'

        probs = model.predict_log_proba(vector)
        data = {
            'prediksi' : target,
            'probabilitas': {
                'netral': round(100 + (probs[0][0]/100000000)),
                'positif': round(100 + (probs[0][1]/100000000)),
                'radikal': round(100 + (probs[0][2]/100000000)),
            }
        }

        response = jsonify(data)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response



def sentence_to_vectors(sentence):
    vectorizer = CountVectorizer(lowercase=False)
    X = vectorizer.fit_transform([sentence])

    if X.shape[1] < model.n_features_in_:
        # Jika jumlah fitur data prediksi lebih sedikit, tambahkan kolom dengan nilai 0
        x_predict = np.hstack((X.toarray(), np.zeros((X.shape[0],  model.n_features_in_ - X.shape[1]))))
    
    return x_predict
