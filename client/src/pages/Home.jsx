import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBrain, FaRegHeart } from 'react-icons/fa';

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
        <div className="flex flex-col items-center justify-center py-24 text-center animate-slide-up relative px-4">
            <div className="bg-sage-50 text-sage-600 p-5 rounded-2xl mb-8 border border-sage-100/50">
                <FaRegHeart className="text-5xl" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 max-w-3xl leading-tight tracking-tight">
                A quiet space to reflect on how you're feeling.
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl leading-relaxed">
                Take a brief, gentle check-in about your daily habits to understand your current mental state. 
                It's completely private, secure, and designed to help you, not judge you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                    onClick={handlePredictClick}
                    className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl shadow-subtle hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:scale-95"
                >
                    Start Check-in <FaArrowRight className="text-sm opacity-80" />
                </button>
                <Link to="/about" className="px-8 py-4 bg-white text-zinc-600 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 active:scale-95">
                    Our Story
                </Link>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="p-8 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-sage-600 text-3xl font-semibold mb-2">25k+</div>
                    <p className="text-zinc-500 text-sm font-medium">People Helped</p>
                </div>
                <div className="p-8 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-sage-600 text-3xl font-semibold mb-2">Gentle</div>
                    <p className="text-zinc-500 text-sm font-medium">Research Backed</p>
                </div>
                <div className="p-8 bg-white rounded-2xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-sage-600 text-3xl font-semibold mb-2">100%</div>
                    <p className="text-zinc-500 text-sm font-medium">Private & Secure</p>
                </div>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-hover max-w-md w-full p-8 relative flex flex-col text-left">
                        
                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        </div>

                        <h3 className="text-xl font-semibold text-zinc-900 mb-3">Just a quick note</h3>

                        <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                            This check-in looks at patterns in finding balance and provides gentle guidance. It is designed to encourage self-reflection and is <strong>not a clinical diagnosis</strong> or a replacement for professional care.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 px-4 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3 px-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
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
