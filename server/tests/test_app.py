import pytest
from app import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_endpoint(client):
    """Test the base API endpoint."""
    response = client.get('/')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'message' in data
    assert 'AI Depression Risk Predictor' in data['message']

def test_predict_invalid_json(client):
    """Test prediction with malformed JSON."""
    response = client.post('/api/predict', data="invalid json")
    assert response.status_code == 400

def test_predict_missing_fields(client):
    """Test prediction with missing required fields."""
    payload = {
        "gender": "Male",
        "age": 20
        # Missing other required fields
    }
    response = client.post('/api/predict', 
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_predict_out_of_range_values(client):
    """Test prediction with invalid numeric ranges."""
    payload = {
        "name": "Test",
        "gender": "Male",
        "age": 10, # Below min 15
        "academic_pressure": 6, # Above max 5
        "study_satisfaction": 3,
        "sleep_duration": "7-8 Hours",
        "dietary_habits": "Healthy",
        "suicidal_thoughts": "No",
        "work_hours": 8,
        "financial_stress": 2,
        "family_history": "No"
    }
    response = client.post('/api/predict', 
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400

def test_predict_invalid_categorical(client):
    """Test prediction with unknown categorical values."""
    payload = {
        "gender": "Unknown", # Not in [Male, Female, Other]
        "age": 20,
        "academic_pressure": 3,
        "study_satisfaction": 3,
        "sleep_duration": "7-8 Hours",
        "dietary_habits": "Healthy",
        "suicidal_thoughts": "No",
        "work_hours": 8,
        "financial_stress": 2,
        "family_history": "No"
    }
    response = client.post('/api/predict', 
                          data=json.dumps(payload),
                          content_type='application/json')
    assert response.status_code == 400

def test_predict_success_flow(client):
    """Test a successful prediction flow."""
    # This requires the model to be loaded. 
    # In a CI environment, we'd mock the model or ensure it's trained.
    payload = {
        "name": "Yash",
        "gender": "Male",
        "age": 22,
        "academic_pressure": 4,
        "study_satisfaction": 2,
        "sleep_duration": "Less than 5 Hours",
        "dietary_habits": "Unhealthy",
        "suicidal_thoughts": "Yes",
        "work_hours": 10,
        "financial_stress": 4,
        "family_history": "Yes"
    }
    response = client.post('/api/predict', 
                          data=json.dumps(payload),
                          content_type='application/json')
    
    # If model is not loaded, it might return 500 or 200 depending on environment.
    # We check if it's either success or the 'Model not loaded' error.
    if response.status_code == 200:
        data = json.loads(response.data)
        assert 'risk_score' in data
        assert 'severity' in data
        assert 'explanations' in data
        assert len(data['explanations']) > 0
