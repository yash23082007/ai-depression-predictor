import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentForm from './pages/AssessmentForm';
import ResultDashboard from './pages/ResultDashboard';

const About = React.lazy(() => import('./pages/About'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const PrivacyControls = React.lazy(() => import('./pages/PrivacyControls'));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="p-10 text-center text-muted">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check-in" element={<AssessmentForm />} />
            <Route path="/assessment" element={<Navigate to="/check-in" replace />} />
            <Route path="/summary" element={<ResultDashboard />} />
            <Route path="/result" element={<Navigate to="/summary" replace />} />
            <Route path="/my-data" element={<PrivacyControls />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
