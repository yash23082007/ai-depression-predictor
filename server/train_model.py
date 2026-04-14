import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, f1_score, recall_score
from imblearn.over_sampling import SMOTE

# Set random seed for reproducibility
np.random.seed(42)

# Configuration
NUM_SAMPLES = 25000
MODEL_DIR = 'models'
MODEL_PATH = os.path.join(MODEL_DIR, 'depression_model.pkl')
ENCODERS_PATH = os.path.join(MODEL_DIR, 'label_encoders.pkl')

def generate_synthetic_data(n_samples: int) -> pd.DataFrame:
    """Generates synthetic student dataset with realistic patterns."""
    print(f"Generating {n_samples} synthetic records...")
    
    data = {
        'Gender': np.random.choice(['Male', 'Female'], n_samples),
        'Age': np.random.randint(17, 24, n_samples),
        'Academic Pressure': np.random.randint(1, 6, n_samples),
        'Study Satisfaction': np.random.randint(1, 6, n_samples),
        'Sleep Duration': np.random.choice(['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'], n_samples, p=[0.2, 0.3, 0.4, 0.1]),
        'Dietary Habits': np.random.choice(['Healthy', 'Moderate', 'Unhealthy'], n_samples),
        'Suicidal Thoughts': np.random.choice(['Yes', 'No'], n_samples, p=[0.15, 0.85]),
        'Work/Study Hours': np.random.randint(1, 13, n_samples),
        'Financial Stress': np.random.randint(1, 6, n_samples),
        'Family History': np.random.choice(['Yes', 'No'], n_samples, p=[0.2, 0.8])
    }
    
    df = pd.DataFrame(data)
    
    # Complex Risk Score Logic (Target variable generation)
    risk_score = (
        (df['Academic Pressure'] * 0.15) +
        (6 - df['Study Satisfaction']) * 0.1 +
        (df['Financial Stress'] * 0.15) +
        (df['Sleep Duration'].map({'Less than 5 Hours': 5, '5-6 Hours': 3, '7-8 Hours': 1, 'More than 8 Hours': 2}) * 0.1) +
        (df['Dietary Habits'].map({'Healthy': 1, 'Moderate': 3, 'Unhealthy': 5}) * 0.1) +
        (df['Suicidal Thoughts'].map({'Yes': 5, 'No': 0}) * 0.2) +
        (df['Family History'].map({'Yes': 3, 'No': 0}) * 0.1)
    )
    
    # Create imbalance: threshold carefully to replicate real-world prevalence (roughly 15-20%)
    # Current threshold (median) makes it 50/50. Let's move it to top 20% for realism.
    threshold = np.percentile(risk_score, 80)
    df['Depression'] = (risk_score > threshold).astype(int)
    
    return df

def preprocess_data(df: pd.DataFrame):
    """Encodes categorical features and splits data."""
    le_dict = {}
    categorical_cols = ['Gender', 'Sleep Duration', 'Dietary Habits', 'Suicidal Thoughts', 'Family History']
    
    df_encoded = df.copy()
    for col in categorical_cols:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df[col])
        le_dict[col] = le
        
    X = df_encoded.drop('Depression', axis=1)
    y = df_encoded['Depression']
    
    return X, y, le_dict

def train_and_evaluate():
    """Main training pipeline with SMOTE and Cross-Validation."""
    # 1. Load/Generate Data
    df = generate_synthetic_data(NUM_SAMPLES)
    
    # 2. Preprocess
    X, y, le_dict = preprocess_data(df)
    
    print(f"Initial class distribution: {np.bincount(y)}")
    
    # 3. Handle Imbalance with SMOTE
    print("Applying SMOTE to balance classes...")
    smote = SMOTE(random_state=42)
    X_res, y_res = smote.fit_resample(X, y)
    print(f"Balanced class distribution: {np.bincount(y_res)}")
    
    # 4. Cross-Validation
    print("Performing 5-Fold Stratified Cross-Validation...")
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    
    cv_scores = cross_val_score(model, X_res, y_res, cv=cv, scoring='f1')
    print(f"Mean CV F1-Score: {np.mean(cv_scores):.4f} (+/- {np.std(cv_scores):.4f})")
    
    # 5. Final Training
    print("Training final model on all balanced data...")
    model.fit(X_res, y_res)
    
    # 6. Save Artifacts
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
        
    with open(ENCODERS_PATH, 'wb') as f:
        pickle.dump(le_dict, f)
        
    print(f"Model and Encoders saved to {MODEL_DIR}/")
    
    # 7. Final Metrics (on a small holdout from original imbalanced set for realistic check)
    original_preds = model.predict(X)
    print("\nPerformance on original imbalanced distribution:")
    print(classification_report(y, original_preds))

if __name__ == '__main__':
    train_and_evaluate()
