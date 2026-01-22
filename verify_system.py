import requests
import time
from pymongo import MongoClient
import sys

def verify_system():
    print("--- 1. Testing API Connectivity ---")
    url = 'http://localhost:5000/api/predict'
    
    # Test Payload similar to frontend
    payload = {
        'gender': 'Male',
        'age': 20,
        'academic_pressure': 3,
        'study_satisfaction': 3,
        'sleep_duration': '5-6 Hours',
        'dietary_habits': 'Moderate',
        'suicidal_thoughts': 'No',
        'work_hours': 8,
        'financial_stress': 2,
        'family_history': 'No'
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("✅ API Request Successful")
            data = response.json()
            print(f"Risk Score: {data['risk_score']}%")
            print(f"Label: {data['label']}")
        else:
            print(f"❌ API Request Failed: {response.status_code}")
            print(response.text)
            return
    except Exception as e:
        print(f"❌ Could not connect to API: {e}")
        return

    print("\n--- 2. Checking MongoDB Storage ---")
    try:
        client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
        db = client['depression_predictor_db']
        collection = db['predictions']
        
        # Count documents
        count = collection.count_documents({})
        print(f"✅ Connection Successful. Total Records in DB: {count}")
        
        # Get latest
        latest = collection.find_one(sort=[('_id', -1)])
        if latest:
            print("\nLatest Record Validation:")
            print(f"Timestamp: {latest.get('timestamp')}")
            print(f"Logged Risk input: {latest.get('risk_score')}")
            
            if latest.get('risk_score') == data['risk_score']:
                print("✅ Data Integrity Verified (API Response matches DB Record)")
            else:
                print("❌ Data Mismatch!")
        else:
            print("❌ No records found in DB even after API call.")
            
    except Exception as e:
        print(f"❌ MongoDB Check Failed: {e}")
        print("Please ensure MongoDB Compass/Server is running locally on port 27017.")

if __name__ == "__main__":
    # Wait for server to definitely start
    time.sleep(2)
    verify_system()
