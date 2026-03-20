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
        // Subtle, elegant fade up
        const heroElements = heroRef.current.children;
        gsap.fromTo(heroElements, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.1 }
        );

        const statElements = statsRef.current.children;
        gsap.fromTo(statElements,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out",
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
                <div className="bg-white text-brand-600 p-4 rounded-full mb-8 border border-ink-200 shadow-crisp">
                    <FaRegHeart className="text-3xl" />
                </div>

                <h1 className="text-5xl md:text-[5.5rem] font-serif font-medium text-ink-900 mb-6 leading-[1.1] tracking-tight">
                    A quiet space to <br className="hidden md:block"/> reflect on your mind.
                </h1>

                <p className="text-lg md:text-xl text-ink-500 mb-12 max-w-[550px] leading-relaxed mx-auto font-medium">
                    Take a brief, gentle check-in about your daily habits to understand your current mental state. 
                    Highly private, secure, and designed for personal growth.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                    <button
                        onClick={handlePredictClick}
                        className="px-10 py-5 bg-ink-900 text-ink-50 font-semibold rounded-2xl shadow-card hover:shadow-card-hover hover:bg-ink-800 transition-all flex items-center justify-center gap-4 transform active:scale-95 text-lg"
                    >
                        Start Check-in <FaArrowRight className="text-base" />
                    </button>
                    <Link to="/about" className="px-10 py-5 bg-white text-ink-700 font-semibold rounded-2xl border border-ink-200 hover:border-ink-300 transition-all flex items-center justify-center shadow-crisp hover:shadow-card transform active:scale-95 text-lg">
                        Our Story
                    </Link>
                </div>
            </div>

            {/* Value Props / Stats (Bento Grid Style) */}
            <div ref={statsRef} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10 pb-20">
                <div className="premium-card p-10 flex flex-col items-start bg-white">
                    <div className="w-12 h-12 rounded-xl bg-ink-100 border border-ink-200 text-ink-600 flex items-center justify-center mb-16 text-xl shadow-crisp">
                        <FaUserFriends />
                    </div>
                    <div className="text-ink-900 text-4xl font-serif mb-2">25k+</div>
                    <p className="text-ink-400 font-semibold tracking-wide text-xs uppercase">People Helped</p>
                </div>
                
                <div className="premium-card p-10 flex flex-col items-start bg-brand-50 border-brand-200">
                    <div className="w-12 h-12 rounded-xl bg-white border border-brand-200 text-brand-600 flex items-center justify-center mb-16 text-xl shadow-crisp">
                        <FaLeaf />
                    </div>
                    <div className="text-brand-900 text-4xl font-serif mb-2">Gentle</div>
                    <p className="text-brand-600/80 font-semibold tracking-wide text-xs uppercase">Research Backed</p>
                </div>

                <div className="premium-card p-10 flex flex-col items-start bg-ink-900 border-ink-800">
                    <div className="w-12 h-12 rounded-xl bg-ink-800 border border-ink-700 text-ink-300 flex items-center justify-center mb-16 text-xl shadow-crisp">
                        <FaShieldAlt />
                    </div>
                    <div className="text-ink-50 text-4xl font-serif mb-2">100%</div>
                    <p className="text-ink-400 font-semibold tracking-wide text-xs uppercase">Private & Secure</p>
                </div>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/20 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-card max-w-md w-full p-10 relative flex flex-col text-left animate-slide-up border border-ink-200">
                        <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center mb-8 border border-ink-200 shadow-crisp">
                            <div className="w-2.5 h-2.5 rounded-full bg-ink-800 animate-pulse"></div>
                        </div>

                        <h3 className="text-2xl font-serif font-medium text-ink-900 mb-3 tracking-tight">Just a quick note</h3>

                        <p className="text-ink-500 mb-10 leading-relaxed text-sm">
                            This check-in looks at patterns in finding balance and provides gentle guidance. It is designed to encourage self-reflection and is <strong>not a clinical diagnosis</strong> or a replacement for professional care.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-ink-500 hover:bg-ink-50 border border-transparent hover:border-ink-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-3.5 px-4 bg-ink-900 text-white rounded-xl font-semibold hover:bg-ink-800 shadow-crisp hover:shadow-card transition-all transform active:scale-95"
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


