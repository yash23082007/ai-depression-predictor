import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaExclamationTriangle, FaCheckCircle, FaHome, FaBed, FaAppleAlt, FaBook, FaDollarSign, FaClock, FaHandsHelping } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRecommendations = (formData, isHighRisk) => {
    const tips = [];

    if (formData.sleep_duration === 'Less than 5 Hours' || formData.sleep_duration === '5-6 Hours') {
        tips.push({
            icon: <FaBed className="text-zinc-500 mt-1 flex-shrink-0" />,
            title: 'Try to prioritize rest',
            text: `You mentioned sleeping only "${formData.sleep_duration}". A little extra sleep (aiming for 7-8 hours) can make a huge difference in how you process daily stress.`,
            border: 'border-zinc-300',
        });
    }

    if (formData.dietary_habits === 'Unhealthy' || formData.dietary_habits === 'Moderate') {
        tips.push({
            icon: <FaAppleAlt className="text-emerald-500 mt-1 flex-shrink-0" />,
            title: 'Nourish your body',
            text: `Your diet was noted as "${formData.dietary_habits}". Sometimes, incorporating a few more fresh fruits or balanced meals can gently lift your energy levels.`,
            border: 'border-emerald-200',
        });
    }

    if (formData.academic_pressure >= 4) {
        tips.push({
            icon: <FaBook className="text-amber-500 mt-1 flex-shrink-0" />,
            title: 'Ease the pressure',
            text: `It sounds like expectations are weighing heavily on you. Remind yourself that it's okay to take breaks, talk to a counselor, or study with a friend to lighten the load.`,
            border: 'border-amber-200',
        });
    }

    if (formData.financial_stress >= 4) {
        tips.push({
            icon: <FaDollarSign className="text-orange-500 mt-1 flex-shrink-0" />,
            title: 'Navigating financial worries',
            text: `Financial concerns can take a massive toll. Please don't hesitate to reach out to a campus aid office or a trusted advisor—you don't have to figure it all out alone.`,
            border: 'border-orange-200',
        });
    }

    if (formData.work_hours >= 9) {
        tips.push({
            icon: <FaClock className="text-purple-500 mt-1 flex-shrink-0" />,
            title: 'Finding time to breathe',
            text: `Working or studying ${formData.work_hours} hours a day is a recipe for burnout. Try to carve out just 30 minutes a day that are completely yours to unplug.`,
            border: 'border-purple-200',
        });
    }

    if (formData.suicidal_thoughts === 'Yes' || formData.family_history === 'Yes' || isHighRisk) {
        tips.push({
            icon: <FaHandsHelping className="text-red-500 mt-1 flex-shrink-0" />,
            title: 'You are not alone',
            text: formData.suicidal_thoughts === 'Yes'
                ? 'You mentioned having very difficult thoughts. Please, reach out to someone who can help right now. Call a friend, a helpline (like iCall: 9152987821), or a professional. People want to help you.'
                : 'Given the strain you are under, talking to a licensed therapist or counselor could truly help. Having a safe space to talk is incredibly valuable.',
            border: 'border-red-200',
        });
    }

    // Fallback positive tip if no specific concerns
    if (tips.length === 0) {
        tips.push({
            icon: <FaCheckCircle className="text-sage-500 mt-1 flex-shrink-0" />,
            title: 'Keep taking care of yourself',
            text: 'Your responses reflect some really solid daily habits. Keep prioritizing your peace, sleep, and connections with others.',
            border: 'border-sage-200',
        });
    }

    return tips;
};

const ResultDashboard = () => {
    const { state } = useLocation();

    if (!state) {
        return <Navigate to="/" />;
    }

    const { risk_score, label } = state.result;
    const formData = state.formData || {};
    const isHighRisk = risk_score > 50;

    const chartData = {
        labels: ['Attention Needed', 'Doing Well'],
        datasets: [
            {
                data: [risk_score, 100 - risk_score],
                backgroundColor: [
                    isHighRisk ? '#f87171' : '#35a171', // red-400 or sage-500
                    '#f4f4f5', // zinc-100
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        cutout: '78%',
    };

    const recommendations = getRecommendations(formData, isHighRisk);

    return (
        <div className="max-w-5xl mx-auto flex flex-col items-center py-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-zinc-900 mb-10 tracking-tight">Your Check-in Results</h2>

            <div className="grid md:grid-cols-5 gap-8 w-full">
                {/* Gauge Chart Section */}
                <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-subtle border border-zinc-100 flex flex-col items-center justify-center relative">
                    <div className="w-full max-w-[240px] h-32 mb-6 relative">
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                            <span className={`text-4xl font-bold tracking-tighter ${isHighRisk ? 'text-red-500' : 'text-sage-600'}`}>{risk_score}%</span>
                        </div>
                    </div>
                    <p className="text-zinc-400 mt-2 text-xs font-semibold uppercase tracking-widest">Strain Indicator</p>

                    <div className={`mt-8 px-6 py-2.5 rounded-2xl font-semibold text-sm flex items-center gap-2.5 border ${isHighRisk ? 'bg-red-50 text-red-600 border-red-100' : 'bg-sage-50 text-sage-700 border-sage-100'}`}>
                        {isHighRisk ? <FaExclamationTriangle className="text-red-500" /> : <FaCheckCircle className="text-sage-500" />}
                        {label === 'High' ? 'Needs Attention' : 'Looking Good'}
                    </div>

                    {formData.name && (
                        <p className="text-zinc-400 text-sm mt-6">Prepared for: <strong className="text-zinc-700 font-semibold">{formData.name}</strong></p>
                    )}
                </div>

                {/* Advice Section */}
                <div className="md:col-span-3 bg-white p-8 sm:p-10 rounded-3xl shadow-subtle border border-zinc-100 flex flex-col">
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">Insights & Gentle Advice</h3>
                    <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                        Based on your daily patterns, it looks like you might be experiencing a <strong className={isHighRisk ? 'text-red-500' : 'text-sage-600 font-semibold'}>{label.toLowerCase()}</strong> amount of emotional strain right now. Here are some gentle suggestions that might help.
                    </p>

                    <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                        {recommendations.map((rec, i) => (
                            <div key={i} className={`p-5 bg-zinc-50/50 rounded-2xl border-l-[3px] border border-zinc-100 ${rec.border} flex gap-4 transition-all hover:bg-zinc-50`}>
                                <div className="mt-0.5">{rec.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-zinc-900 text-sm mb-1">{rec.title}</h4>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{rec.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <Link to="/assessment" className="px-6 py-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 transition-colors flex items-center gap-2">
                    ↩ Revisit Check-in
                </Link>
                <Link to="/" className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-subtle">
                    <FaHome className="mb-0.5" /> Return to Home
                </Link>
            </div>
        </div>
    );
};

export default ResultDashboard;
