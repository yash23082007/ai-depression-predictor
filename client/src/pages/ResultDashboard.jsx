import React, { useRef } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaExclamationTriangle, FaCheckCircle, FaHome, FaBed, FaAppleAlt, FaBook, FaDollarSign, FaClock, FaHandsHelping, FaRedoAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
ChartJS.register(ArcElement, Tooltip, Legend);

const getRecommendations = (formData, isHighRisk) => {
    const tips = [];
    if (formData.sleep_duration === 'Less than 5 Hours' || formData.sleep_duration === '5-6 Hours') {
        tips.push({
            icon: <FaBed className="text-zinc-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Prioritize restorative rest',
            text: `Sleeping "${formData.sleep_duration}" can heighten daily stress. A little extra sleep can dramatically improve how you process emotions.`,
            border: 'border-zinc-300',
        });
    }
    if (formData.dietary_habits === 'Unhealthy' || formData.dietary_habits === 'Moderate') {
        tips.push({
            icon: <FaAppleAlt className="text-sage-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Nourish your body',
            text: `Incorporating a few more fresh fruits or balanced meals can gently lift your baseline energy and focus.`,
            border: 'border-sage-300',
        });
    }
    if (formData.academic_pressure >= 4) {
        tips.push({
            icon: <FaBook className="text-amber-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Ease the pressure',
            text: `Expectations seem heavy right now. Remind yourself it's okay to take structured breaks or study with a friend to lighten the mental load.`,
            border: 'border-amber-300',
        });
    }
    if (formData.financial_stress >= 4) {
        tips.push({
            icon: <FaDollarSign className="text-orange-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Navigating financial worries',
            text: `Financial concerns take a massive toll. Consider reaching out to a campus aid office or a trusted advisor—you don't have to figure it all out alone.`,
            border: 'border-orange-300',
        });
    }
    if (formData.work_hours >= 9) {
        tips.push({
            icon: <FaClock className="text-purple-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Finding time to breathe',
            text: `Working ${formData.work_hours} hours daily is a fast track to burnout. Try to carve out just 30 minutes a day that are completely yours to unplug.`,
            border: 'border-purple-300',
        });
    }
    if (formData.suicidal_thoughts === 'Yes' || formData.family_history === 'Yes' || isHighRisk) {
        tips.push({
            icon: <FaHandsHelping className="text-red-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'You are not alone',
            text: formData.suicidal_thoughts === 'Yes'
                ? 'You mentioned having very difficult thoughts. Please reach out to someone who can help right now. Call a friend or a helpline—people want to help you.'
                : 'Given the strain you are under, talking to a licensed therapist or counselor could truly help provide a safe, non-judgmental space.',
            border: 'border-red-300',
        });
    }
    if (tips.length === 0) {
        tips.push({
            icon: <FaCheckCircle className="text-sage-500 mt-1 flex-shrink-0 text-xl" />,
            title: 'Keep taking care of yourself',
            text: 'Your responses reflect some really solid daily habits. Keep prioritizing your peace, sleep, and connections with others.',
            border: 'border-sage-300',
        });
    }
    return tips;
};

const ResultDashboard = () => {
    const { state } = useLocation();
    const containerRef = useRef(null);
    const scoreCardRef = useRef(null);
    const tipsRef = useRef(null);

    const resultState = state?.result;
    const formData = state?.formData || {};
    
    // We do useGSAP at the top level so hooks are always called.
    useGSAP(() => {
        if (!state) return;
        
        // Stagger Dashboard Elements
        const tl = gsap.timeline();
        
        tl.fromTo(containerRef.current.querySelector('h2'),
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(scoreCardRef.current,
            { opacity: 0, scale: 0.95, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "spring.out(1, 0.75)" },
            "-=0.4"
        )
        .fromTo(tipsRef.current.children,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
            "-=0.4"
        );
    }, { scope: containerRef });

    if (!state) {
        return <Navigate to="/" />;
    }

    const { risk_score, label } = resultState;
    const isHighRisk = risk_score > 50;
    const recommendations = getRecommendations(formData, isHighRisk);

    const chartData = {
        labels: ['Attention Needed', 'Doing Well'],
        datasets: [{
            data: [risk_score, 100 - risk_score],
            backgroundColor: [
                isHighRisk ? '#f87171' : '#5abf8f', 
                'rgba(255, 255, 255, 0.4)', 
            ],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        cutout: '80%',
    };

    return (
        <div ref={containerRef} className="max-w-6xl mx-auto flex flex-col items-center py-12 px-4 min-h-[90vh]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-12 tracking-tight drop-shadow-sm text-center">
                Your Check-in Results
            </h2>

            <div className="grid md:grid-cols-5 gap-8 w-full">
                {/* Gauge Chart Section */}
                <div ref={scoreCardRef} className="md:col-span-2 glass-panel p-10 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    
                    <div className="w-full max-w-[260px] h-36 mb-6 relative">
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                            <span className={`text-5xl font-extrabold tracking-tighter ${isHighRisk ? 'text-red-500' : 'text-sage-600'} drop-shadow-sm`}>
                                {risk_score}%
                            </span>
                        </div>
                    </div>
                    
                    <p className="text-zinc-500 mt-2 text-xs font-bold uppercase tracking-widest">Strain Indicator</p>

                    <div className={`mt-8 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 border shadow-sm ${isHighRisk ? 'bg-red-50 text-red-600 border-red-200' : 'bg-sage-50 text-sage-600 border-sage-200'}`}>
                        {isHighRisk ? <FaExclamationTriangle className="text-red-500 text-lg" /> : <FaCheckCircle className="text-sage-500 text-lg" />}
                        {label === 'High' ? 'Needs Attention' : 'Looking Good'}
                    </div>

                    {formData.name && (
                        <p className="text-zinc-400 text-xs font-semibold mt-8 uppercase tracking-wider">
                            Prepared for <span className="text-zinc-700">{formData.name}</span>
                        </p>
                    )}
                </div>

                {/* Advice Section */}
                <div className="md:col-span-3 glass-panel p-8 sm:p-10 flex flex-col">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">Insights & Guidance</h3>
                    <p className="text-zinc-500 mb-10 leading-relaxed font-medium">
                        Based on your daily patterns, it looks like you might be experiencing a <strong className={isHighRisk ? 'text-red-500' : 'text-sage-600 font-bold'}>{label.toLowerCase()}</strong> amount of emotional strain right now. Here are some gentle suggestions.
                    </p>

                    <div ref={tipsRef} className="space-y-4 max-h-[380px] overflow-y-auto pr-3 custom-scrollbar">
                        {recommendations.map((rec, i) => (
                            <div key={i} className={`p-6 bg-white/60 backdrop-blur-md rounded-2xl border-l-[4px] border border-white/40 shadow-sm ${rec.border} flex gap-5 transition-transform hover:-translate-y-1 hover:shadow-md`}>
                                <div className="mt-0.5">{rec.icon}</div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 text-base mb-2 tracking-wide">{rec.title}</h4>
                                    <p className="text-sm text-zinc-600 leading-relaxed font-medium">{rec.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
                <Link to="/assessment" className="px-8 py-4 rounded-2xl font-bold text-zinc-600 bg-white/40 backdrop-blur-sm border border-zinc-200 shadow-sm hover:bg-white hover:shadow-md transition-all flex items-center gap-3 transform active:scale-95">
                    <FaRedoAlt className="text-zinc-400" /> Revisit Check-in
                </Link>
                <Link to="/" className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-3 shadow-hover transform hover:-translate-y-1 active:scale-95">
                    <FaHome className="mb-0.5 text-zinc-300" /> Return to Home
                </Link>
            </div>
        </div>
    );
};

export default ResultDashboard;
