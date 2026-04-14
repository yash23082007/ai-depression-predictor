import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultDashboard = () => {
    const { state } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    if (!state || !state.result) {
        return <Navigate to="/assessment" />;
    }

    const { result, answers } = state;
    const { phq9_score, severity, timestamp } = result;

    // Map severity to colors and labels
    const getSeverityConfig = (sev) => {
        switch (sev) {
            case 'Severe':
                return { class: 'high', label: 'High concern', color: '#C94A4A', bg: '#FDE8E8', dot: '#C94A4A' };
            case 'Moderately Severe':
                return { class: 'moderate', label: 'Moderately severe', color: '#C9784A', bg: '#FDF0E8', dot: '#C9784A' };
            case 'Moderate':
                return { class: 'moderate', label: 'Moderate concern', color: '#C9784A', bg: '#FDF0E8', dot: '#C9784A' };
            case 'Mild':
                return { class: 'mild', label: 'Mild concern', color: '#D4A843', bg: '#FDF4E0', dot: '#D4A843' };
            default:
                return { class: 'low', label: 'Low concern', color: '#2D5A3D', bg: '#EBF5EE', dot: '#2D5A3D' };
        }
    };

    const config = getSeverityConfig(severity);
    const isCrisis = severity === 'Moderate' || severity === 'Moderately Severe' || severity === 'Severe';

    const shapFeatures = [
        { label: 'Interest / pleasure', value: answers[0] * 33.3 },
        { label: 'Mood / hopelessness', value: answers[1] * 33.3 },
        { label: 'Sleep quality', value: answers[2] * 33.3 },
        { label: 'Energy / fatigue', value: answers[3] * 33.3 },
        { label: 'Concentration', value: answers[6] * 33.3 },
    ].sort((a, b) => b.value - a.value);

    return (
        <div className="max-w-[680px] mx-auto px-6 py-4">
            <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white border border-border rounded-[20px] overflow-hidden shadow-lg"
            >
                {/* Header */}
                <div className="p-10 border-b border-border">
                    <p className="text-[0.9rem] text-muted mb-1.5">Assessment complete · {timestamp}</p>
                    <h1 className="font-heading text-[1.9rem] text-ink mb-8 tracking-tight">Your Wellbeing Summary</h1>

                    {/* Score & Gauge */}
                    <div className="relative">
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="font-heading text-[3.5rem] leading-none text-ink">{phq9_score}</span>
                            <span className="text-[1.2rem] text-muted">/27</span>
                            
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.82rem] font-bold ml-4 align-middle`} 
                                  style={{ backgroundColor: config.bg, color: config.color }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.dot }} />
                                {config.label}
                            </span>
                        </div>

                        <div className="h-[14px] bg-border rounded-full overflow-hidden relative mb-2">
                            <motion.div 
                                className={`h-full rounded-full bg-gradient-to-r`}
                                style={{ 
                                    width: `${(phq9_score / 27) * 100}%`,
                                    backgroundImage: `linear-gradient(90deg, ${config.color}, ${config.color}CC)`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(phq9_score / 27) * 100}%` }}
                                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            />
                        </div>
                        <div className="flex justify-between text-[0.72rem] text-muted font-medium">
                            <span>Low</span>
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>High</span>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-10">
                    
                    {/* Crisis Panel */}
                    {isCrisis && (
                        <div className="bg-[#FEF2F2] border-1.5 border-[#FCA5A5] rounded-[14px] p-5 mb-7 flex gap-4 items-start">
                            <div className="flex-shrink-0 w-9 h-9 bg-[#FEE2E2] rounded-[10px] flex items-center justify-center">
                                <svg className="w-5 h-5 stroke-[#B91C1C] fill-none" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.1 2.21 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[0.9rem] font-bold text-[#7F1D1D] mb-1.5">If you need to talk to someone right now</h4>
                                <ul className="text-[0.83rem] text-[#991B1B] space-y-1">
                                    <li>🇮🇳 <strong>India — iCall:</strong> <a href="tel:9152987821" className="underline font-bold text-[#B91C1C]">9152987821</a></li>
                                    <li>🌍 <strong>International — Befrienders:</strong> <a href="https://www.befrienders.org" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#B91C1C]">befrienders.org</a></li>
                                    <li>🇺🇸 <strong>US — Crisis Lifeline:</strong> <a href="tel:988" className="underline font-bold text-[#B91C1C]">Call or text 988</a></li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Interpretation */}
                    <div className="text-[0.95rem] leading-[1.65] text-gray-700 mb-8 p-5 bg-ivory rounded-lg border-l-[3px] border-forest">
                        {severity === 'Low' ? (
                            "Your responses suggest you are currently experiencing minimal symptoms of depression. Continue prioritizing your wellbeing and self-care routines."
                        ) : (
                            <>
                                Your responses suggest you may be experiencing symptoms commonly associated with <strong>{severity.toLowerCase()} depression</strong> — such as diffculty concentrating, low energy, and reduced interest in activities. <strong>This is not a diagnosis.</strong> Effective support is available.
                            </>
                        )}
                    </div>

                    {/* SHAP Sections */}
                    <div className="mb-8">
                        <p className="text-[0.82rem] font-bold uppercase tracking-[0.07em] text-muted mb-4">Key contributing factors</p>
                        <div className="space-y-3">
                            {shapFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-[0.84rem] text-ink w-[160px] flex-shrink-0">{feature.label}</span>
                                    <div className="flex-grow h-2 bg-border rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-forest rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${feature.value === 0 ? 5 : feature.value}%` }}
                                            transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                                        />
                                    </div>
                                    <span className="text-[0.78rem] text-muted w-[30px] text-right">
                                        {feature.value > 60 ? 'High' : feature.value > 30 ? 'Mod' : 'Low'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mb-8">
                        <p className="text-[0.82rem] font-bold uppercase tracking-[0.07em] text-muted mb-4">Suggested next steps</p>
                        <div className="space-y-4">
                            {[
                                { title: "Talk to a GP or professional", text: "Share these results with your doctor. A consultation can open doors to effective support options." },
                                { title: "Reach out to someone you trust", text: "Talking to a friend, family member, or counsellor often provides immediate relief." },
                                { title: "Try a grounding exercise", text: "Box breathing (4s in, 4s hold, 4s out) for 5 minutes can reduce anxiety today." },
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4 items-start py-4 border-b border-border last:border-0">
                                    <div className="flex-shrink-0 w-7 h-7 bg-sage text-forest rounded-lg font-bold text-[0.82rem] flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-[0.9rem] font-bold mb-0.5">{step.title}</h4>
                                        <p className="text-[0.82rem] text-muted leading-relaxed">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Retake */}
                    <div className="text-center pt-8 border-t border-border">
                        <Link to="/assessment" className="btn-ghost inline-flex items-center gap-2 py-2 px-6 text-[0.85rem]">
                            ↺ Retake Assessment
                        </Link>
                        <p className="text-[0.75rem] text-muted mt-2">Scores can vary naturally with mood, sleep, and daily context.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultDashboard;
