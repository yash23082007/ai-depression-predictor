import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaExclamationTriangle, FaCheckCircle, FaHome } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultDashboard = () => {
    const { state } = useLocation();

    if (!state) {
        return <Navigate to="/" />;
    }

    const { risk_score, label } = state.result;
    const isHighRisk = risk_score > 50;

    const chartData = {
        labels: ['Risk', 'Safe'],
        datasets: [
            {
                data: [risk_score, 100 - risk_score],
                backgroundColor: [
                    isHighRisk ? '#ef4444' : '#10b981', // Red if high, Green if low
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
                </div>

                {/* Advice Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">AI Analysis & Recommendations</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        Based on the factors provided, our Random Forest model indicates a <strong className={isHighRisk ? 'text-red-500' : 'text-emerald-500'}>{label.toLowerCase()}</strong> probability of depression.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-medical-500">
                            <h4 className="font-semibold text-slate-800">Improve Sleep Hygiene</h4>
                            <p className="text-sm text-gray-500">Aim for 7-8 hours of quality sleep to regulate mood.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-yellow-500">
                            <h4 className="font-semibold text-slate-800">Manage Stress</h4>
                            <p className="text-sm text-gray-500">Consider mindfulness or counseling if academic pressure feels overwhelming.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-medical-600 font-semibold transition-colors">
                    <FaHome /> Return to Home
                </Link>
            </div>
        </div>
    );
};

export default ResultDashboard;
