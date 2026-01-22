import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AssessmentForm from './pages/AssessmentForm';
import ResultDashboard from './pages/ResultDashboard';
import About from './pages/About';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/assessment" element={<AssessmentForm />} />
                    <Route path="/result" element={<ResultDashboard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
