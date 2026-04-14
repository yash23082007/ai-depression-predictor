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

model = None
encoders = None
explainer = None


def load_artifacts():
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


def validate_payload(payload):
    if not isinstance(payload, dict):
        raise ValueError('Request body must be a JSON object.')

    validated = {}

    for request_key, (feature_name, min_value, max_value) in NUMERIC_FIELDS.items():
        raw_value = payload.get(request_key)
        if raw_value is None:
            raise ValueError(f'Missing required field: {request_key}.')

        try:
            numeric_value = int(raw_value)
        except (TypeError, ValueError) as exc:
            raise ValueError(f'Field {request_key} must be an integer.') from exc

        if numeric_value < min_value or numeric_value > max_value:
            raise ValueError(f'Field {request_key} must be between {min_value} and {max_value}.')

        validated[feature_name] = numeric_value

    for request_key, feature_name in CATEGORICAL_FIELDS.items():
        raw_value = payload.get(request_key)
        if raw_value is None:
            raise ValueError(f'Missing required field: {request_key}.')

        allowed_values = encoders[feature_name].classes_.tolist()
        if raw_value not in allowed_values:
            allowed_text = ', '.join(allowed_values)
            raise ValueError(f'Field {request_key} must be one of: {allowed_text}.')

        validated[feature_name] = raw_value

    return validated


def build_risk_enabler(features):
    reasons = []

    if features['Suicidal Thoughts'] == 'Yes':
        reasons.append('reported suicidal thoughts')
    if features['Academic Pressure'] >= 4:
        reasons.append('high academic pressure')
    if features['Financial Stress'] >= 4:
        reasons.append('high financial stress')
    if features['Sleep Duration'] in {'Less than 5 Hours', '5-6 Hours'}:
        reasons.append('short sleep duration')
    if features['Dietary Habits'] == 'Unhealthy':
        reasons.append('unhealthy dietary habits')
    if features['Work/Study Hours'] >= 9:
        reasons.append('long work or study hours')
    if features['Family History'] == 'Yes':
        reasons.append('family history of depression')
    if features['Study Satisfaction'] <= 2:
        reasons.append('low study satisfaction')

    if not reasons:
        return 'No major lifestyle risk drivers were detected in the submitted answers.'

    return 'Primary contributors: ' + ', '.join(reasons) + '.'


def encode_features(features):
    return pd.DataFrame({
        'Gender': [encoders['Gender'].transform([features['Gender']])[0]],
        'Age': [features['Age']],
        'Academic Pressure': [features['Academic Pressure']],
        'Study Satisfaction': [features['Study Satisfaction']],
        'Sleep Duration': [encoders['Sleep Duration'].transform([features['Sleep Duration']])[0]],
        'Dietary Habits': [encoders['Dietary Habits'].transform([features['Dietary Habits']])[0]],
        'Suicidal Thoughts': [encoders['Suicidal Thoughts'].transform([features['Suicidal Thoughts']])[0]],
        'Work/Study Hours': [features['Work/Study Hours']],
        'Financial Stress': [features['Financial Stress']],
        'Family History': [encoders['Family History'].transform([features['Family History']])[0]],
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
    if model is None or encoders is None:
        return jsonify({'error': 'Model not loaded. Run train_model.py first.'}), 500

    try:
        payload = request.get_json(silent=True)
        features = validate_payload(payload)
        input_df = encode_features(features)

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

        risk_enabler = build_risk_enabler(features)

        db = get_db()
        if db is not None:
            log_entry = {
                'timestamp': datetime.datetime.now(datetime.timezone.utc),
                'inputs': payload,
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
    except ValueError as exc:
        return jsonify({'error': str(exc)}), 400
    except Exception as exc:
        print(f'Prediction error: {exc}')
        return jsonify({'error': 'Prediction failed due to an internal error.'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_DEBUG', 'True') == 'True')
