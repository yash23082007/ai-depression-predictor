import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaUserGraduate, FaExclamationTriangle } from 'react-icons/fa';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handlePredictClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/assessment');
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in relative">
            <div className="bg-white p-4 rounded-full shadow-sm mb-6 animate-float">
                <FaBrain className="text-6xl text-medical-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 max-w-2xl leading-tight">
                AI-Driven Depression Risk Assessment
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl">
                Predict depression risk based on lifestyle factors using our advanced AI model trained on over 25,000 student records.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={handlePredictClick}
                    className="px-8 py-4 bg-medical-600 text-white font-bold rounded-lg shadow-lg hover:bg-medical-500 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                >
                    Predict Risk Now <FaArrowRight />
                </button>
                <Link to="/about" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:shadow-md">
                    Read Project Details <FaUserGraduate />
                </Link>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow animate-pulse-slow">
                    <div className="text-medical-500 text-3xl font-bold mb-2">25k+</div>
                    <p className="text-gray-500">Student Records Analyzed</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
                    <div className="text-medical-500 text-3xl font-bold mb-2">97%</div>
                    <p className="text-gray-500">Model Accuracy</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                    <div className="text-medical-500 text-3xl font-bold mb-2">100%</div>
                    <p className="text-gray-500">Privacy Focused</p>
                </div>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>

                        <div className="flex justify-center mb-6 text-yellow-500">
                            <FaExclamationTriangle className="text-5xl" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Important Disclaimer</h3>

                        <p className="text-gray-600 mb-6 text-center leading-relaxed">
                            This tool is a <strong>predictive AI model</strong> for educational purposes only. It is <strong>NOT</strong> a medical diagnosis.
                            <br /><br />
                            Results are based on statistical patterns and may not reflect your actual clinical state.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3 bg-medical-600 text-white rounded-lg font-bold hover:bg-medical-500 transition-colors shadow-lg"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
