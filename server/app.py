from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import datetime
from db import get_db

app = Flask(__name__)
CORS(app)

# Load Model and Encoders
MODEL_PATH = os.path.join('models', 'depression_model.pkl')
ENCODERS_PATH = os.path.join('models', 'label_encoders.pkl')

model = None
encoders = None

try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    with open(ENCODERS_PATH, 'rb') as f:
        encoders = pickle.load(f)
    print("Model and Encoders loaded successfully.")
except FileNotFoundError:
    print("Error: Model files not found. Please run train_model.py first.")

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "AI Depression Risk Predictor API is Running", "training_data": "25,000 synthetic records"})

@app.route('/api/predict', methods=['POST'])
def predict():
    if not model or not encoders:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json
        
        # Expected fields and processing
        # We need to process input similar to training data
        # Input: JSON
        # Output: Risk Score
        
        # Mapping input to features
        # Assuming input keys match strict naming or we map them
        input_features = {
            'Gender': data.get('gender'),
            'Age': int(data.get('age')),
            'Academic Pressure': int(data.get('academic_pressure')),
            'Study Satisfaction': int(data.get('study_satisfaction')),
            'Sleep Duration': data.get('sleep_duration'),
            'Dietary Habits': data.get('dietary_habits'),
            'Suicidal Thoughts': data.get('suicidal_thoughts'),
            'Work/Study Hours': int(data.get('work_hours')),
            'Financial Stress': int(data.get('financial_stress')),
            'Family History': data.get('family_history')
        }
        
        # Encode Data
        features_for_model = [
            encoders['Gender'].transform([input_features['Gender']])[0],
            input_features['Age'],
            input_features['Academic Pressure'],
            input_features['Study Satisfaction'],
            encoders['Sleep Duration'].transform([input_features['Sleep Duration']])[0],
            encoders['Dietary Habits'].transform([input_features['Dietary Habits']])[0],
            encoders['Suicidal Thoughts'].transform([input_features['Suicidal Thoughts']])[0],
            input_features['Work/Study Hours'],
            input_features['Financial Stress'],
            encoders['Family History'].transform([input_features['Family History']])[0]
        ]
        
        # Reshape for model
        input_array = np.array(features_for_model).reshape(1, -1)
        
        # Predict Probabilities
        prediction_prob = model.predict_proba(input_array)[0][1] # Probability of Class 1 (Depression Risk)
        risk_percentage = round(prediction_prob * 100, 2)
        
        label = "High Risk" if risk_percentage > 50 else "Low Risk"
        
        # Log to MongoDB
        db = get_db()
        if db is not None:
            log_entry = {
                "timestamp": datetime.datetime.utcnow(),
                "inputs": data,  # Store raw inputs (anonymous)
                "risk_score": risk_percentage,
                "label": label
            }
            try:
                db.predictions.insert_one(log_entry)
            except Exception as e:
                print(f"Failed to log to MongoDB: {e}")

        return jsonify({
            "risk_score": risk_percentage,
            "label": label
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get("FLASK_DEBUG", "True") == "True")
