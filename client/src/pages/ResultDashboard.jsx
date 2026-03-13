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
            icon: <FaBed className="text-medical-500 mt-1 flex-shrink-0" />,
            title: 'Improve Sleep Hygiene',
            text: `You reported sleeping only "${formData.sleep_duration}". Aim for at least 7-8 hours of sleep per night to regulate mood and reduce stress hormones.`,
            border: 'border-medical-500',
        });
    }

    if (formData.dietary_habits === 'Unhealthy' || formData.dietary_habits === 'Moderate') {
        tips.push({
            icon: <FaAppleAlt className="text-green-500 mt-1 flex-shrink-0" />,
            title: 'Adopt Healthier Dietary Habits',
            text: `Your dietary habits were reported as "${formData.dietary_habits}". A balanced diet rich in omega-3s, fruits, and vegetables is linked to improved mental well-being.`,
            border: 'border-green-500',
        });
    }

    if (formData.academic_pressure >= 4) {
        tips.push({
            icon: <FaBook className="text-yellow-500 mt-1 flex-shrink-0" />,
            title: 'Manage Academic Pressure',
            text: `High academic pressure (${formData.academic_pressure}/5) can be a major stressor. Consider time-blocking, speaking with a counselor, or joining a study group to reduce the load.`,
            border: 'border-yellow-500',
        });
    }

    if (formData.financial_stress >= 4) {
        tips.push({
            icon: <FaDollarSign className="text-orange-500 mt-1 flex-shrink-0" />,
            title: 'Address Financial Stress',
            text: `Significant financial stress (${formData.financial_stress}/5) can heavily impact mental health. Reach out to your institution's financial aid office or seek guidance on budgeting.`,
            border: 'border-orange-500',
        });
    }

    if (formData.work_hours >= 9) {
        tips.push({
            icon: <FaClock className="text-purple-500 mt-1 flex-shrink-0" />,
            title: 'Balance Work & Study Hours',
            text: `Working/studying ${formData.work_hours} hours a day may be contributing to burnout. Try to schedule regular breaks and protect time for rest and social activities.`,
            border: 'border-purple-500',
        });
    }

    if (formData.suicidal_thoughts === 'Yes' || formData.family_history === 'Yes' || isHighRisk) {
        tips.push({
            icon: <FaHandsHelping className="text-red-500 mt-1 flex-shrink-0" />,
            title: 'Seek Professional Support',
            text: formData.suicidal_thoughts === 'Yes'
                ? 'You indicated experiencing suicidal thoughts. Please reach out to a mental health professional or a crisis helpline (iCall: 9152987821) immediately. You are not alone.'
                : 'Given your risk profile or family history, speaking with a licensed therapist or counselor can provide significant relief and coping strategies.',
            border: 'border-red-500',
        });
    }

    // Fallback positive tip if no specific concerns
    if (tips.length === 0) {
        tips.push({
            icon: <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />,
            title: 'Keep Up the Great Habits',
            text: 'Your responses suggest healthy lifestyle choices. Continue prioritizing sleep, nutrition, and social connections to maintain your mental well-being.',
            border: 'border-emerald-500',
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
        labels: ['Risk', 'Safe'],
        datasets: [
            {
                data: [risk_score, 100 - risk_score],
                backgroundColor: [
                    isHighRisk ? '#ef4444' : '#10b981',
                    '#e2e8f0',
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
        cutout: '75%',
    };

    const recommendations = getRecommendations(formData, isHighRisk);

    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-10">Assessment Results</h2>

            <div className="grid md:grid-cols-2 gap-12 w-full">
                {/* Gauge Chart Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative">
                    <div className="w-64 h-32 mb-8 relative">
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="absolute inset-0 flex items-end justify-center pb-2">
                            <span className={`text-4xl font-bold ${isHighRisk ? 'text-red-500' : 'text-emerald-500'}`}>{risk_score}%</span>
                        </div>
                    </div>
                    <p className="text-gray-500 mt-4 font-medium uppercase tracking-wide">Depression Risk Score</p>

                    <div className={`mt-6 px-6 py-2 rounded-full font-bold text-lg flex items-center gap-2 ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {isHighRisk ? <FaExclamationTriangle /> : <FaCheckCircle />}
                        {label}
                    </div>

                    {formData.name && (
                        <p className="text-gray-400 text-sm mt-4">Assessment for: <strong className="text-slate-600">{formData.name}</strong></p>
                    )}
                </div>

                {/* Advice Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">AI Analysis & Recommendations</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Based on the factors provided, our Random Forest model indicates a <strong className={isHighRisk ? 'text-red-500' : 'text-emerald-500'}>{label.toLowerCase()}</strong> probability of depression.
                    </p>

                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                        {recommendations.map((rec, i) => (
                            <div key={i} className={`p-4 bg-slate-50 rounded-lg border-l-4 ${rec.border} flex gap-3`}>
                                {rec.icon}
                                <div>
                                    <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{rec.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex items-center gap-6">
                <Link to="/assessment" className="flex items-center gap-2 text-gray-500 hover:text-medical-600 font-semibold transition-colors">
                    ↩ Retake Assessment
                </Link>
                <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-medical-600 font-semibold transition-colors">
                    <FaHome /> Return to Home
                </Link>
            </div>
        </div>
    );
};

export default ResultDashboard;
