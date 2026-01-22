import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Set random seed for reproducibility
np.random.seed(42)

# Configuration
NUM_SAMPLES = 25000
MODEL_DIR = 'models'
MODEL_PATH = os.path.join(MODEL_DIR, 'depression_model.pkl')
ENCODERS_PATH = os.path.join(MODEL_DIR, 'label_encoders.pkl')

def generate_synthetic_data(n_samples):
    """Generates synthetic student dataset."""
    print(f"Generating {n_samples} synthetic records...")
    
    data = {
        'Gender': np.random.choice(['Male', 'Female'], n_samples),
        'Age': np.random.randint(17, 24, n_samples),
        'Academic Pressure': np.random.randint(1, 6, n_samples), # 1-5 scale
        'Study Satisfaction': np.random.randint(1, 6, n_samples), # 1-5 scale
        'Sleep Duration': np.random.choice(['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'], n_samples, p=[0.2, 0.3, 0.4, 0.1]),
        'Dietary Habits': np.random.choice(['Healthy', 'Moderate', 'Unhealthy'], n_samples),
        'Suicidal Thoughts': np.random.choice(['Yes', 'No'], n_samples, p=[0.15, 0.85]),
        'Work/Study Hours': np.random.randint(1, 13, n_samples),
        'Financial Stress': np.random.randint(1, 6, n_samples), # 1-5 scale
        'Family History': np.random.choice(['Yes', 'No'], n_samples, p=[0.2, 0.8])
    }
    
    df = pd.DataFrame(data)
    
    # Generate Target Variable (Depression Risk) based on logic to make it somewhat realistic
    # This is a simplification for synthetic data
    risk_score = (
        (df['Academic Pressure'] * 0.15) +
        (6 - df['Study Satisfaction']) * 0.1 + # Inverse satisfaction
        (df['Financial Stress'] * 0.15) +
        (df['Sleep Duration'].map({'Less than 5 Hours': 5, '5-6 Hours': 3, '7-8 Hours': 1, 'More than 8 Hours': 2}) * 0.1) +
        (df['Dietary Habits'].map({'Healthy': 1, 'Moderate': 3, 'Unhealthy': 5}) * 0.1) +
        (df['Suicidal Thoughts'].map({'Yes': 5, 'No': 0}) * 0.2) +
        (df['Family History'].map({'Yes': 3, 'No': 0}) * 0.1)
    )
    
    # Normalize risk score to 0-1 probability roughly, then threshold
    # Note: Random Forest will learn the pattern we just created
    df['Depression'] = (risk_score > risk_score.median()).astype(int)
    
    return df

def train_model():
    # 1. Generate Data
    df = generate_synthetic_data(NUM_SAMPLES)
    
    # 2. Preprocessing
    le_dict = {}
    categorical_cols = ['Gender', 'Sleep Duration', 'Dietary Habits', 'Suicidal Thoughts', 'Family History']
    
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        le_dict[col] = le
        
    X = df.drop('Depression', axis=1)
    y = df['Depression']
    
    # 3. Train Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 4. Train Model
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    score = model.score(X_test, y_test)
    print(f"Model Accuracy: {score:.2f}")
    
    # 5. Save Artifacts
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
        
    with open(ENCODERS_PATH, 'wb') as f:
        pickle.dump(le_dict, f)
        
    print(f"Model saved to {MODEL_PATH}")
    print(f"Encoders saved to {ENCODERS_PATH}")

if __name__ == '__main__':
    train_model()
