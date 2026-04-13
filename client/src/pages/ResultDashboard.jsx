import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AlertCircle, CheckCircle, Home as HomeIcon, BedDouble, Apple, BookOpen, CircleDollarSign, Clock, Heart, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

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
    
    const { risk_score, label } = resultState;
    const isHighRisk = risk_score > 50;
    const recommendations = getRecommendations(formData, isHighRisk);

    const gaugeColor = isHighRisk ? '#F59E0B' : '#22C55E'; // Accent (amber) or Secondary (green). No harsh reds!

    const chartData = {
        labels: ['Strain', 'Balance'],
        datasets: [{
            data: [risk_score, 100 - risk_score],
            backgroundColor: [gaugeColor, '#F1F5F9'], // tailwind slate-100
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
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto flex flex-col items-center py-16 px-4 min-h-[90vh]"
        >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-heading font-semibold text-text mb-12 tracking-tight text-center">
                Your Check-in Results
            </motion.h2>

            <div className="grid md:grid-cols-5 gap-8 w-full">
                {/* Score Section */}
                <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-border p-10 flex flex-col items-center justify-center relative">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                        className="w-full max-w-[260px] h-36 mb-6 relative"
                    >
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
                            <span className="text-5xl font-heading font-semibold text-text">
                                {risk_score}%
                            </span>
                        </div>
                    </motion.div>
                    
                    <p className="text-subtext mt-2 text-sm font-medium uppercase tracking-widest">Strain Indicator</p>

                    <div className={`mt-8 px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-3 border shadow-sm ${isHighRisk ? 'bg-orange-50 text-accent border-orange-100' : 'bg-green-50 text-secondary border-green-100'}`}>
                        {isHighRisk ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        {isHighRisk ? 'Your responses suggest you may be experiencing some challenges' : 'Looking Good'}
                    </div>

                    {formData.name && (
                        <p className="text-subtext text-xs font-semibold mt-8 uppercase tracking-widest">
                            Prepared for <span className="text-primary">{formData.name}</span>
                        </p>
                    )}
                </motion.div>

                {/* Suggestions Section */}
                <motion.div variants={itemVariants} className="md:col-span-3 bg-white rounded-2xl shadow-lg border border-border p-8 sm:p-10 flex flex-col">
                    <h3 className="text-2xl font-heading font-semibold text-text mb-3">Insights & Suggestions</h3>
                    <p className="text-subtext mb-8 leading-relaxed text-sm font-medium">
                        Based on your check-in, here are some gentle suggestions to help you find balance.
                    </p>

                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-3">
                        {recommendations.map((rec, i) => (
                            <motion.div 
                                key={i} 
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 rounded-2xl border shadow-sm flex gap-5 ${rec.bg}`}
                            >
                                <div className="mt-0.5">{rec.icon}</div>
                                <div>
                                    <h4 className="font-semibold text-text text-base mb-1.5">{rec.title}</h4>
                                    <p className="text-sm text-subtext leading-relaxed font-medium">{rec.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <Link to="/assessment" className="w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-subtext bg-white border border-border shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                    <RotateCcw className="w-5 h-5" /> Revisit Check-in
                </Link>
                <Link to="/" className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-lg">
                    <HomeIcon className="w-5 h-5" /> Return to Home
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ResultDashboard;


