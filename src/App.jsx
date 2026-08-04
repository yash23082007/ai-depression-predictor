import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentForm from './pages/AssessmentForm';
import ResultDashboard from './pages/ResultDashboard';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PrivacyControls from './pages/PrivacyControls';

function App() {
  return <BrowserRouter><Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/check-in" element={<AssessmentForm />} />
    <Route path="/assessment" element={<Navigate to="/check-in" replace />} />
    <Route path="/summary" element={<ResultDashboard />} />
    <Route path="/result" element={<Navigate to="/summary" replace />} />
    <Route path="/my-data" element={<PrivacyControls />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Layout></BrowserRouter>;
}
export default App;
