import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { predictRisk } from '../services/api';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const emojis = ['😃', '🙂', '😐', '😟', '😨', '😱'];

const AssessmentForm = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        gender: 'Male',
        age: 18,
        academic_pressure: 2,
        study_satisfaction: 3,
        sleep_duration: '5-6 Hours',
        dietary_habits: 'Moderate',
        suicidal_thoughts: 'No',
        work_hours: 6,
        financial_stress: 2,
        family_history: 'No'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await predictRisk(formData);
            navigate('/result', { state: { result, formData } });
        } catch (error) {
            console.error("Error predicting result:", error);
            alert("Failed to review your check-in. Please ensure the server is working.");
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const steps = [
        {
            title: "Let's get to know you",
            content: (
                <div className="space-y-6">
                    <div>
                        <label className="block text-subtext text-sm font-medium mb-2">Preferred Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-[#F8FAFC] border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text font-medium" placeholder="Nickname" required />
                    </div>
                    <div>
                        <label className="block text-subtext text-sm font-medium mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="w-full p-4 bg-[#F8FAFC] border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text font-medium" placeholder="18" required />
                    </div>
                    <div>
                        <label className="block text-subtext text-sm font-medium mb-2">Identity</label>
                        <div className="flex bg-[#F8FAFC] rounded-xl p-1 border border-border">
                            {['Male', 'Female', 'Other'].map(g => (
                                <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })} className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${formData.gender === g ? 'bg-white text-primary shadow-sm border border-indigo-100' : 'text-subtext hover:bg-gray-100'}`}>
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "How is your study/work pressure lately?",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8">{emojis[formData.academic_pressure]}</span>
                    <input type="range" name="academic_pressure" min="1" max="5" value={formData.academic_pressure} onChange={handleSliderChange} className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                    <div className="flex justify-between w-full text-subtext text-sm mt-4 font-medium">
                        <span>Manageable</span><span>Overwhelming</span>
                    </div>
                </div>
            )
        },
        {
            title: "How satisfied are you with your progress?",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8">{emojis[5 - formData.study_satisfaction]}</span>
                    <input type="range" name="study_satisfaction" min="1" max="5" value={formData.study_satisfaction} onChange={handleSliderChange} className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-secondary" />
                    <div className="flex justify-between w-full text-subtext text-sm mt-4 font-medium">
                        <span>Struggling</span><span>Doing Great</span>
                    </div>
                </div>
            )
        },
        {
            title: "Are you experiencing financial concerns?",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8">{emojis[formData.financial_stress]}</span>
                    <input type="range" name="financial_stress" min="1" max="5" value={formData.financial_stress} onChange={handleSliderChange} className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-accent" />
                    <div className="flex justify-between w-full text-subtext text-sm mt-4 font-medium">
                        <span>None</span><span>Keeping me up</span>
                    </div>
                </div>
            )
        },
        {
            title: "How many hours do you work/study daily?",
            content: (
                <div className="flex flex-col items-center">
                    <div className="text-4xl font-heading font-semibold text-primary mb-8">{formData.work_hours} hr</div>
                    <input type="range" name="work_hours" min="1" max="12" value={formData.work_hours} onChange={handleSliderChange} className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-primary" />
                    <div className="flex justify-between w-full text-subtext text-sm mt-4 font-medium">
                        <span>1h</span><span>12h+</span>
                    </div>
                </div>
            )
        },
        {
            title: "What is your sleep duration like?",
            content: (
                <div className="space-y-4">
                    {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => (
                        <button key={o} type="button" onClick={() => setFormData({ ...formData, sleep_duration: o })} className={`w-full p-4 rounded-xl text-left font-medium transition-all ${formData.sleep_duration === o ? 'bg-primary text-white shadow-md' : 'bg-[#F8FAFC] text-text border border-border hover:bg-indigo-50'}`}>
                            {o}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "How would you describe your dietary balance?",
            content: (
                <div className="space-y-4">
                    {['Healthy', 'Moderate', 'Unhealthy'].map(o => (
                        <button key={o} type="button" onClick={() => setFormData({ ...formData, dietary_habits: o })} className={`w-full p-4 rounded-xl text-left font-medium transition-all ${formData.dietary_habits === o ? 'bg-secondary text-white shadow-md' : 'bg-[#F8FAFC] text-text border border-border hover:bg-green-50'}`}>
                            {o}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "Have you had thoughts of giving up lately?",
            content: (
                <div className="flex gap-4">
                    {['No', 'Yes'].map(opt => (
                        <button key={opt} type="button" onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })} className={`flex-1 py-6 rounded-xl font-medium text-lg transition-all ${formData.suicidal_thoughts === opt ? 'bg-accent text-white shadow-md' : 'bg-[#F8FAFC] text-text border border-border hover:bg-orange-50'}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "Is there a family history of mental health challenges?",
            content: (
                <div className="flex gap-4">
                    {['No', 'Yes'].map(opt => (
                        <button key={opt} type="button" onClick={() => setFormData({ ...formData, family_history: opt })} className={`flex-1 py-6 rounded-xl font-medium text-lg transition-all ${formData.family_history === opt ? 'bg-primary text-white shadow-md' : 'bg-[#F8FAFC] text-text border border-border hover:bg-indigo-50'}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            )
        }
    ];

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="max-w-2xl mx-auto py-16 px-4 min-h-[90vh] flex flex-col justify-center">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-sm font-medium text-subtext mb-2">
                    <span>Question {currentStep + 1} of {steps.length}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden border border-border min-h-[400px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow"
                    >
                        <h2 className="text-2xl font-heading font-semibold text-text mb-8">{steps[currentStep].title}</h2>
                        {steps[currentStep].content}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-12 pt-6 border-t border-border">
                    <button 
                        onClick={prevStep} 
                        disabled={currentStep === 0} 
                        className={`flex items-center gap-2 font-medium transition-all ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-subtext hover:text-primary'}`}
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep} 
                        disabled={loading}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-medium shadow-md hover:bg-indigo-600 transition-all flex items-center gap-2"
                    >
                        {loading ? 'Analyzing...' : (currentStep === steps.length - 1 ? 'See Results' : 'Next')} 
                        {!loading && currentStep !== steps.length - 1 && <ArrowRight className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentForm;


