import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AlertCircle, CheckCircle, Home as HomeIcon, BedDouble, Apple, BookOpen, CircleDollarSign, Clock, Heart, RotateCcw, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import SafetyModal from '../components/SafetyModal';

ChartJS.register(ArcElement, Tooltip, Legend);

const getRecommendations = (formData, isHighRisk) => {
    const tips = [];
    if (formData.sleep_duration === 'Less than 5 Hours' || formData.sleep_duration === '5-6 Hours') {
        tips.push({
            icon: <BedDouble className="text-primary mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Improve sleep routine',
            text: `Sleeping "${formData.sleep_duration}" can heighten daily stress. A little extra sleep can dramatically improve how you process emotions.`,
            bg: 'bg-indigo-50 border-indigo-100'
        });
    }
    if (formData.dietary_habits === 'Unhealthy' || formData.dietary_habits === 'Moderate') {
        tips.push({
            icon: <Apple className="text-secondary mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Nourish your body',
            text: `Incorporating a few more fresh fruits or balanced meals can gently lift your baseline energy and focus.`,
            bg: 'bg-green-50 border-green-100'
        });
    }
    if (formData.academic_pressure >= 4) {
        tips.push({
            icon: <BookOpen className="text-accent mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Take intentional breaks',
            text: `Expectations seem heavy right now. Remind yourself it's okay to take structured breaks or study with a friend to lighten the mental load.`,
            bg: 'bg-orange-50 border-orange-100'
        });
    }
    if (formData.financial_stress >= 4) {
        tips.push({
            icon: <CircleDollarSign className="text-subtext mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Navigating financial worries',
            text: `Financial concerns take a massive toll. Consider reaching out to a campus aid office or a trusted advisor—you don't have to figure it all out alone.`,
            bg: 'bg-gray-100 border-gray-200'
        });
    }
    if (formData.work_hours >= 9) {
        tips.push({
            icon: <Clock className="text-primary mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Finding time to breathe',
            text: `Working ${formData.work_hours} hours daily is a fast track to burnout. Try to carve out just 30 minutes a day that are completely yours to unplug.`,
            bg: 'bg-indigo-50 border-indigo-100'
        });
    }
    if (formData.suicidal_thoughts === 'Yes' || formData.family_history === 'Yes' || isHighRisk) {
        tips.push({
            icon: <Heart className="text-accent mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Talk to someone',
            text: 'Given the strain you are under, talking to a licensed therapist, counselor, or a trusted friend could truly help provide a safe, non-judgmental space.',
            bg: 'bg-orange-50 border-orange-100'
        });
    }
    if (tips.length === 0) {
        tips.push({
            icon: <CheckCircle className="text-secondary mt-1 w-6 h-6 flex-shrink-0" />,
            title: 'Keep taking care of yourself',
            text: 'Your responses reflect some really solid daily habits. Keep prioritizing your peace, sleep, and connections with others.',
            bg: 'bg-green-50 border-green-100'
        });
    }
    return tips;
};

const ResultDashboard = () => {
    const { state } = useLocation();
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    useEffect(() => {
        if (state) {
            localStorage.setItem('last_checkin_score', state.result?.risk_score || 0);
            localStorage.setItem('last_checkin_date', new Date().toLocaleDateString());
            localStorage.setItem('last_checkin_state', JSON.stringify(state));
        }
    }, [state]);

    if (!state) {
        return <Navigate to="/" />;
    }

    const resultState = state.result;
    const formData = state.formData || {};
    
    const { risk_score, label, severity, explanations } = resultState;
    const isCrisis = severity === 'Moderate' || severity === 'High';
    const recommendations = getRecommendations(formData, isCrisis);

    const getSeverityColor = (sev) => {
        switch (sev) {
            case 'Low': return '#10B981'; // Green
            case 'Mild': return '#F59E0B'; // Amber
            case 'Moderate': return '#EF4444'; // Red
            case 'High': return '#7F1D1D'; // Dark Red
            default: return '#6366F1';
        }
    };

    const gaugeColor = getSeverityColor(severity);

    const chartData = {
        labels: ['Strain', 'Balance'],
        datasets: [{
            data: [risk_score, 100 - risk_score],
            backgroundColor: [gaugeColor, '#F1F5F9'], // slate-100 fallback
            borderColor: 'transparent',
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0 // Disable chartjs animation to use Framer Motion wrapper
        },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        cutout: '80%',
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-[90vh]">
            <SafetyModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                severity={severity} 
            />

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-5xl mx-auto flex flex-col items-center py-16 px-4"
            >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-bold text-text dark:text-white mb-12 tracking-tight text-center">
                Your Baseline Analysis
            </motion.h2>

            {isCrisis && (
                <motion.div 
                    variants={itemVariants}
                    className="w-full mb-10 p-6 bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-900/50 rounded-3xl flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-red-500/5"
                >
                    <div className="bg-red-500 p-4 rounded-2xl shadow-lg animate-pulse">
                        <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-1">Immediate Support is Available</h3>
                        <p className="text-red-600 dark:text-red-300/80 font-medium text-sm">
                            Your baseline analysis suggests you are carrying a heavy load right now. You don't have to face it alone. 
                            <span className="block mt-2 font-bold bg-white/50 dark:bg-black/20 p-2 rounded-lg inline-block">
                                India: 9152987821 (iCall) • US: 988 (Crisis Line) • Intl: Befrienders.org
                            </span>
                        </p>
                    </div>
                    <a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20 whitespace-nowrap">
                        Get Help Now
                    </a>
                </motion.div>
            )}

            <div className="grid md:grid-cols-5 gap-8 w-full">
                {/* Score & SHAP Section */}
                <div className="md:col-span-2 space-y-6">
                    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-border dark:border-slate-800 p-10 flex flex-col items-center justify-center relative">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                            className="w-full max-w-[260px] h-36 mb-6 relative"
                        >
                            <Doughnut data={chartData} options={chartOptions} />
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                                <span className="text-5xl font-heading font-bold text-text dark:text-white">
                                    {risk_score}%
                                </span>
                            </div>
                        </motion.div>
                        
                        <p className="text-subtext dark:text-gray-400 mt-2 text-sm font-bold uppercase tracking-widest">Baseline Strain</p>

                        <div 
                            className="mt-8 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-3 border shadow-md transition-colors"
                            style={{ borderColor: `${gaugeColor}40`, backgroundColor: `${gaugeColor}10`, color: gaugeColor }}
                        >
                            {isCrisis ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                            {label} Level
                        </div>

                        {formData.name && (
                            <p className="text-subtext dark:text-gray-400 text-xs font-semibold mt-10 uppercase tracking-widest">
                                Analyst Insight for <span className="text-primary dark:text-indigo-400">{formData.name}</span>
                            </p>
                        )}
                    </motion.div>

                    {/* SHAP Explanations */}
                    {explanations && explanations.length > 0 && (
                        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-border dark:border-slate-800 p-8">
                            <h4 className="text-lg font-heading font-bold text-text dark:text-white mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" /> Key Risk Drivers
                            </h4>
                            <div className="space-y-4">
                                {explanations.map((exp, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                                            <span className="text-subtext dark:text-gray-400">{exp.feature}</span>
                                            <span className="text-text dark:text-gray-200">Impact: +{(exp.impact * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(exp.impact * 100, 100)}%` }}
                                                className="bg-primary h-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Suggestions Section */}
                <motion.div variants={itemVariants} className="md:col-span-3 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-border dark:border-slate-800 p-8 sm:p-10 flex flex-col">
                    <h3 className="text-2xl font-heading font-bold text-text dark:text-white mb-3">Holistic Recommendations</h3>
                    <p className="text-subtext dark:text-gray-400 mb-8 leading-relaxed text-sm font-medium">
                        Our AI has analyzed your check-in patterns. Here are tailored lifestyle adjustments to help restore equilibrium.
                    </p>

                    <div className="space-y-4 max-h-[480px] overflow-y-auto pr-3 custom-scrollbar">
                        {recommendations.map((rec, i) => (
                            <motion.div 
                                key={i} 
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                                className={`p-6 rounded-3xl border shadow-sm flex gap-5 transition-colors ${rec.bg} dark:bg-slate-800/50 dark:border-slate-700`}
                            >
                                <div className="mt-0.5">{rec.icon}</div>
                                <div>
                                    <h4 className="font-bold text-text dark:text-white text-base mb-1.5">{rec.title}</h4>
                                    <p className="text-sm text-subtext dark:text-gray-400 leading-relaxed font-medium">{rec.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <Link to="/assessment" className="w-full md:w-auto px-10 py-4 rounded-2xl font-bold text-subtext dark:text-gray-400 bg-white dark:bg-slate-900 border border-border dark:border-slate-800 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    <RotateCcw className="w-5 h-5" /> Revisit Assessment
                </Link>
                <Link to="/" className="w-full md:w-auto px-10 py-4 bg-[#6366F1] text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20">
                    <HomeIcon className="w-5 h-5" /> Return to Command
                </Link>
            </motion.div>
            </motion.div>
        </div>
    );
};

export default ResultDashboard;


