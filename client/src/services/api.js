import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://ai-depression-predictor-1.onrender.com/api';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 60000, // 60s to handle Render free-tier cold starts
});

const MAX_RETRIES = 2;

export const predictRisk = async (data) => {
    let lastError;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await apiClient.post('/predict', data);
            return response.data;
        } catch (error) {
            lastError = error;
            // Only retry on network/timeout errors, not on 4xx client errors
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                throw error;
            }
            if (attempt < MAX_RETRIES) {
                // Wait 3 seconds before retrying
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }
    throw lastError;
};
