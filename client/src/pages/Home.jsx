import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Activity, Users, Clock } from 'lucide-react';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [lastScore, setLastScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedScore = localStorage.getItem('last_checkin_score');
        const savedDate = localStorage.getItem('last_checkin_date');
        const savedState = localStorage.getItem('last_checkin_state');
        if (savedScore && savedState) {
            setLastScore({ score: savedScore, date: savedDate, state: JSON.parse(savedState) });
        }
    }, []);

    const handlePredictClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/assessment');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4 relative min-h-[90vh]"
        >
            {/* Hero Section */}
            <div className="flex flex-col items-center text-center max-w-4xl w-full z-10 pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-primary text-sm font-semibold tracking-wide mb-6">
                    <Activity className="w-4 h-4" />
                    <span>AI-POWERED INSIGHTS</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6 leading-tight tracking-tight">
                    Understand Your Mental Well-being
                </h1>

                <p className="text-lg md:text-xl text-subtext mb-12 max-w-[550px] mx-auto font-body font-medium leading-relaxed">
                    Gain profound insights into how your lifestyle, academic pressure, and habits intersect to define your mental baseline.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePredictClick}
                        className="bg-[#6366F1] text-white px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-600 transition flex items-center justify-center gap-3 text-lg font-medium"
                    >
                        Start Assessment <ArrowRight className="w-5 h-5" />
                    </motion.button>
                    {lastScore && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/result', { state: lastScore.state })}
                            className="bg-white text-subtext border border-border px-8 py-4 rounded-xl shadow-sm hover:text-primary transition flex items-center justify-center gap-3 text-lg font-medium"
                        >
                            <Clock className="w-5 h-5" /> View Last Score
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Value Props / Stats */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10 pb-20"
            >
                <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-start border border-border hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-primary flex items-center justify-center mb-10">
                        <Users className="w-6 h-6" />
                    </div>
                    <div className="text-text text-3xl font-heading font-semibold mb-2">25k+</div>
                    <p className="text-subtext font-medium text-sm">Students Assisted</p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-start border border-border hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 text-secondary flex items-center justify-center mb-10">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div className="text-text text-3xl font-heading font-semibold mb-2">Gentle</div>
                    <p className="text-subtext font-medium text-sm">Research Backed</p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-start border border-border hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-accent flex items-center justify-center mb-10">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div className="text-text text-3xl font-heading font-semibold mb-2">100%</div>
                    <p className="text-subtext font-medium text-sm">Private & Secure</p>
                </div>
            </motion.div>

            {/* Disclaimer Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 relative flex flex-col text-left border border-border"
                        >
                            <h3 className="text-2xl font-heading font-semibold text-text mb-3">Just a quick note</h3>

                            <p className="text-subtext mb-10 leading-relaxed text-sm font-body">
                                This check-in looks at patterns in finding balance and provides gentle guidance. It is designed to encourage self-reflection and is <strong>not a clinical diagnosis</strong> or a replacement for professional care.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3.5 px-4 rounded-xl font-medium text-subtext hover:bg-gray-50 border border-transparent transition-all"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleConfirm}
                                    className="flex-1 py-3.5 px-4 bg-[#6366F1] text-white rounded-xl font-semibold hover:bg-indigo-600 shadow-lg transition-all"
                                >
                                    I Understand
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Home;


