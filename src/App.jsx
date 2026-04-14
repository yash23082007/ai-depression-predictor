import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentForm from './pages/AssessmentForm';
import ResultDashboard from './pages/ResultDashboard';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/assessment" element={<AssessmentForm />} />
                <Route path="/result" element={<ResultDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <Layout>
                <AnimatedRoutes />
            </Layout>
        </Router>
    );
}

export default App;


