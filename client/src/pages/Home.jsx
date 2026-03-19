import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaLeaf, FaUserFriends, FaRegHeart } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const statsRef = useRef(null);

    const handlePredictClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/assessment');
    };

    useGSAP(() => {
        // Hero Section Staggered Entrance
        const heroElements = heroRef.current.children;
        gsap.fromTo(heroElements, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2 }
        );

        // Stats Section ScrollTrigger
        const statElements = statsRef.current.children;
        gsap.fromTo(statElements,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center py-20 px-4 relative min-h-[90vh]">
            {/* Hero Section */}
            <div ref={heroRef} className="flex flex-col items-center text-center max-w-4xl w-full z-10 pt-10">
                <div className="bg-sage-100 text-sage-600 p-4 rounded-2xl mb-8 border border-sage-200 shadow-sm backdrop-blur-sm">
                    <FaRegHeart className="text-4xl" />
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 mb-6 leading-tight tracking-tight drop-shadow-sm">
                    A quiet space to <br className="hidden md:block"/> reflect on how you're feeling.
                </h1>

                <p className="text-lg md:text-xl text-zinc-600 mb-12 max-w-2xl leading-relaxed">
                    Take a brief, gentle check-in about your daily habits to understand your current mental state. 
                    It's highly private, secure, and designed to support your personal growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                    <button
                        onClick={handlePredictClick}
                        className="px-8 py-4 bg-zinc-900 text-white font-medium rounded-2xl shadow-hover hover:bg-zinc-800 hover:shadow-lg transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 text-lg"
                    >
                        Start Check-in <FaArrowRight className="text-sm opacity-80" />
                    </button>
                    <Link to="/about" className="px-8 py-4 bg-white/80 backdrop-blur-md text-zinc-700 font-medium rounded-2xl border border-zinc-200/60 hover:bg-white hover:border-zinc-300 transition-all flex items-center justify-center shadow-subtle hover:shadow-md transform hover:-translate-y-1 active:scale-95 text-lg">
                        Our Story
                    </Link>
                </div>
            </div>

            {/* Value Props / Stats */}
            <div ref={statsRef} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl z-10 pb-20">
                <div className="glass-panel p-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-sage-50 text-sage-500 flex items-center justify-center mb-6 text-2xl shadow-inner">
                        <FaUserFriends />
                    </div>
                    <div className="text-zinc-900 text-3xl font-bold mb-2">25k+</div>
                    <p className="text-zinc-500 font-medium tracking-wide text-sm uppercase">People Helped</p>
                </div>
                <div className="glass-panel p-10 flex flex-col items-center text-center translate-y-0 md:translate-y-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 text-2xl shadow-inner">
                        <FaLeaf />
                    </div>
                    <div className="text-zinc-900 text-3xl font-bold mb-2">Gentle</div>
                    <p className="text-zinc-500 font-medium tracking-wide text-sm uppercase">Research Backed</p>
                </div>
                <div className="glass-panel p-10 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 text-2xl shadow-inner">
                        <FaShieldAlt />
                    </div>
                    <div className="text-zinc-900 text-3xl font-bold mb-2">100%</div>
                    <p className="text-zinc-500 font-medium tracking-wide text-sm uppercase">Private & Secure</p>
                </div>
            </div>

            {/* Disclaimer Modal with GSAP entry via Tailwind class */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative flex flex-col text-left animate-slide-up border border-zinc-100">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 border border-amber-100/50">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                        </div>

                        <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">Just a quick note</h3>

                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            This check-in looks at patterns in finding balance and provides gentle guidance. It is designed to encourage self-reflection and is <strong>not a clinical diagnosis</strong> or a replacement for professional care.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3.5 px-4 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3.5 px-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 hover:shadow-lg transition-all transform active:scale-95"
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
