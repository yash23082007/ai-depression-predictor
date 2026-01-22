from pymongo import MongoClient
import os

def get_db():
    # Helper to get the database connection
    # Default to localhost for this project as requested
    MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
    DB_NAME = 'depression_predictor_db'
    
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Check connection
        client.admin.command('ping')
        return client[DB_NAME]
    except Exception as e:
        print(f"MongoDB Connection Error: {e}")
        return None
