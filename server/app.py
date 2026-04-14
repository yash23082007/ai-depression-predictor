from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, ValidationError, validator
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os
import datetime
import shap
from db import get_db

app = Flask(__name__)
# Allow local dev and the deployed Vercel frontend
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000",
    "https://ai-depression-predictor.vercel.app"
]}})

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'depression_model.pkl')
ENCODERS_PATH = os.path.join(BASE_DIR, 'models', 'label_encoders.pkl')

NUMERIC_FIELDS = {
    'age': ('Age', 15, 35),
    'academic_pressure': ('Academic Pressure', 1, 5),
    'study_satisfaction': ('Study Satisfaction', 1, 5),
    'work_hours': ('Work/Study Hours', 1, 12),
    'financial_stress': ('Financial Stress', 1, 5),
}

CATEGORICAL_FIELDS = {
    'gender': 'Gender',
    'sleep_duration': 'Sleep Duration',
    'dietary_habits': 'Dietary Habits',
    'suicidal_thoughts': 'Suicidal Thoughts',
    'family_history': 'Family History',
}

# Pydantic Models for Robust Validation
class PredictionPayload(BaseModel):
    name: Optional[str] = Field(None, max_length=50)
    gender: str = Field(..., pattern='^(Male|Female|Other)$')
    age: int = Field(..., ge=15, le=99)
    academic_pressure: int = Field(..., ge=1, le=5)
    study_satisfaction: int = Field(..., ge=1, le=5)
    sleep_duration: str = Field(..., pattern='^(Less than 5 Hours|5-6 Hours|7-8 Hours|More than 8 Hours)$')
    dietary_habits: str = Field(..., pattern='^(Healthy|Moderate|Unhealthy)$')
    suicidal_thoughts: str = Field(..., pattern='^(Yes|No)$')
    work_hours: int = Field(..., ge=1, le=12)
    financial_stress: int = Field(..., ge=1, le=5)
    family_history: str = Field(..., pattern='^(Yes|No)$')

model: Optional[Any] = None
encoders: Optional[Dict[str, Any]] = None
explainer: Optional[Any] = None


def load_artifacts() -> None:
    global model, encoders

    try:
        with open(MODEL_PATH, 'rb') as model_file:
            model = pickle.load(model_file)
        with open(ENCODERS_PATH, 'rb') as encoders_file:
            encoders = pickle.load(encoders_file)
        
        if model is not None:
             global explainer
             explainer = shap.TreeExplainer(model)
             
        print('Model, encoders, and SHAP explainer loaded successfully.')
    except FileNotFoundError:
        model = None
        encoders = None
        explainer = None
        print('Error: model files not found. Please run train_model.py first.')


def build_risk_enabler(features: Dict[str, Any]) -> str:
    """Explains primary lifestyle contributors in plain English."""
    reasons: List[str] = []

    if features.get('suicidal_thoughts') == 'Yes':
        reasons.append('reported suicidal thoughts')
    if features.get('academic_pressure', 0) >= 4:
        reasons.append('high academic pressure')
    if features.get('financial_stress', 0) >= 4:
        reasons.append('high financial stress')
    if features.get('sleep_duration') in {'Less than 5 Hours', '5-6 Hours'}:
        reasons.append('short sleep duration')
    if features.get('dietary_habits') == 'Unhealthy':
        reasons.append('unhealthy dietary habits')
    if features.get('work_hours', 0) >= 9:
        reasons.append('long work or study hours')
    if features.get('family_history') == 'Yes':
        reasons.append('family history of depression')
    if features.get('study_satisfaction', 0) <= 2:
        reasons.append('low study satisfaction')

    if not reasons:
        return 'No major lifestyle risk drivers were detected in the submitted answers.'

    return 'Primary contributors: ' + ', '.join(reasons) + '.'


def encode_features(data: PredictionPayload) -> pd.DataFrame:
    """Prepares payload for model inference using loaded encoders."""
    return pd.DataFrame({
        'Gender': [encoders['Gender'].transform([data.gender])[0]],
        'Age': [data.age],
        'Academic Pressure': [data.academic_pressure],
        'Study Satisfaction': [data.study_satisfaction],
        'Sleep Duration': [encoders['Sleep Duration'].transform([data.sleep_duration])[0]],
        'Dietary Habits': [encoders['Dietary Habits'].transform([data.dietary_habits])[0]],
        'Suicidal Thoughts': [encoders['Suicidal Thoughts'].transform([data.suicidal_thoughts])[0]],
        'Work/Study Hours': [data.work_hours],
        'Financial Stress': [data.financial_stress],
        'Family History': [encoders['Family History'].transform([data.family_history])[0]],
    })


load_artifacts()


@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'AI Depression Risk Predictor API is running.',
        'model_loaded': model is not None and encoders is not None,
        'training_data': '25,000 synthetic records',
    })


@app.route('/api/predict', methods=['POST'])
def predict():
    """Predicts depression risk and returns severity, score, and SHAP explanations."""
    if model is None or encoders is None:
        return jsonify({'error': 'Model not loaded. Run train_model.py first.'}), 500

    try:
        json_data = request.get_json(silent=True)
        if json_data is None:
             return jsonify({'error': 'Invalid JSON payload.'}), 400
             
        # Pydantic validation
        data = PredictionPayload(**json_data)
        input_df = encode_features(data)

        prediction_prob = float(model.predict_proba(input_df)[0][1])
        risk_percentage = round(prediction_prob * 100, 2)
        
        # Determine Severity Level based on report suggestions
        if risk_percentage <= 30:
            severity = "Low"
        elif risk_percentage <= 60:
            severity = "Mild"
        elif risk_percentage <= 80:
            severity = "Moderate"
        else:
            severity = "High"
            
        label = f"{severity} Risk"
        
        # Calculate SHAP explanations
        shap_values = explainer.shap_values(input_df)
        # Handle cases where shap_values might be a list (standard for binary RF in SHAP)
        if isinstance(shap_values, list):
            # We want the impact on the positive class (class 1)
            impacts = shap_values[1][0]
        else:
            impacts = shap_values[0]
            
        feature_names = input_df.columns.tolist()
        feature_impacts = sorted(zip(feature_names, impacts), key=lambda x: x[1], reverse=True)
        
        # Get top 3 positive contributors
        top_contributors = [
            {"feature": name, "impact": round(float(val), 4)} 
            for name, val in feature_impacts if val > 0
        ][:3]

        risk_enabler = build_risk_enabler(data.dict())

        db = get_db()
        if db is not None:
            log_entry = {
                'timestamp': datetime.datetime.now(datetime.timezone.utc),
                'inputs': json_data,
                'risk_score': risk_percentage,
                'label': label,
                'risk_enabler': risk_enabler,
                'top_contributors': top_contributors
            }
            try:
                db.predictions.insert_one(log_entry)
            except Exception as exc:
                print(f'Failed to log to MongoDB: {exc}')

        return jsonify({
            'risk_score': risk_percentage,
            'label': label,
            'severity': severity,
            'risk_enabler': risk_enabler,
            'explanations': top_contributors
        })
    except ValidationError as exc:
        return jsonify({'error': exc.errors()}), 400
    except Exception as exc:
        print(f'Prediction error: {exc}')
        return jsonify({'error': 'Prediction failed due to an internal error.'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_DEBUG', 'True') == 'True')
