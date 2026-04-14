import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-10"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-faint text-forest text-[0.75rem] font-bold tracking-[0.1em] uppercase">
                    <svg className="w-3.5 h-3.5 fill-forest" viewBox="0 0 16 16">
                        <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 7c-2 0-3.7-1-4.7-2.5C4.5 8 6.1 7 8 7s3.5 1 4.7 2.5C11.7 11 10.1 12 8 12z"/>
                    </svg>
                    Next-Gen Wellbeing AI
                </div>

                {/* Hero */}
                <h1 className="font-heading text-6xl md:text-7xl text-ink leading-[1.1] tracking-tight">
                    Understand the <span className="italic text-forest">Logic</span> <br /> of Your Resilience.
                </h1>

                <p className="max-w-xl mx-auto text-lg md:text-xl text-muted font-medium leading-relaxed">
                    MindCheck moves beyond generic scores. We use explainable AI to map how your context, habits, and pressures intersect to define your mental baseline.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Link to="/assessment" className="btn-forest px-10 py-4 flex items-center gap-3">
                        Start Assessment
                        <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 12l4-4-4-4"/>
                        </svg>
                    </Link>
                    <Link to="/about" className="btn-ghost px-10 py-4">
                        Learn our methodology
                    </Link>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 text-left">
                    <div className="editorial-card p-8 space-y-4">
                        <div className="w-10 h-10 bg-forest-faint rounded-xl flex items-center justify-center text-forest">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <h3 className="font-heading text-xl text-ink">Clinical Foundations</h3>
                        <p className="text-[0.9rem] text-muted leading-relaxed">
                            Based on the PHQ-9, the most widely used clinical scale for assessing wellbeing indicators.
                        </p>
                    </div>

                    <div className="editorial-card p-8 space-y-4">
                        <div className="w-10 h-10 bg-forest-faint rounded-xl flex items-center justify-center text-forest">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                            </svg>
                        </div>
                        <h3 className="font-heading text-xl text-ink">Privacy by Default</h3>
                        <p className="text-[0.9rem] text-muted leading-relaxed">
                            Your data never leaves your browser. All analysis is performed locally to ensure absolute privacy.
                        </p>
                    </div>

                    <div className="editorial-card p-8 space-y-4">
                        <div className="w-10 h-10 bg-forest-faint rounded-xl flex items-center justify-center text-forest">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <h3 className="font-heading text-xl text-ink">Actionable Logic</h3>
                        <p className="text-[0.9rem] text-muted leading-relaxed">
                            Go beyond a simple score. Identify which lifestyle factors are impacting your current baseline most.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
