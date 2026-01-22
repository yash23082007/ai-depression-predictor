# AI Depression Risk Predictor

A FERN stack (Flask, Express-like Python, React, Node/MongoDB) application to predict student depression risk based on lifestyle factors.


[![Deploy Backend](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yash23082007/ai-depression-predictor)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yash23082007/ai-depression-predictor/tree/main/client)

## Links
- **Live Demo:** [depressionana.in](https://depressionana.in) (Coming Soon)
- **Repository:** [github.com/yash23082007/ai-depression-predictor](https://github.com/yash23082007/ai-depression-predictor)

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)

## About
This project uses a Random Forest Classifier trained on 25,000 synthetic student records to predict the risk of depression. It is designed to be privacy-focused, storing only anonymous data for analytics.

**Developed by:** Yash Vijay

## Features
- **AI-Driven Prediction:** Random Forest model with high accuracy.
- **Interactive Assessment:** 10-question assessment with dynamic UI.
- **Real-time Visualization:** Gauge chart for risk scores.
- **Privacy First:** No PII is permanently stored.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS (Light Mode)
- **Backend:** Flask (Python)
- **AI/ML:** Scikit-Learn, Pandas
- **Database:** MongoDB

## Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js & npm
- MongoDB (running locally or Atlas URI)

### Backend
1. Navigate to `server`:
   ```bash
   cd server
   ```
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Train the model:
   ```bash
   python train_model.py
   ```
4. Run the server:
   ```bash
   python app.py
   ```

### Frontend
1. Navigate to `client`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Usage
Visit `http://localhost:3000` to access the application.
