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
            subtitle: "We value your privacy and only use this to personalize your insights.",
            content: (
                <div className="space-y-6">
                    <div>
                        <label htmlFor="pref_name" className="block text-subtext dark:text-gray-400 text-sm font-medium mb-2">Preferred Name</label>
                        <input id="pref_name" type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-[#F8FAFC] dark:bg-slate-800/50 border border-border dark:border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text dark:text-white font-medium" placeholder="Nickname" required />
                    </div>
                    <div>
                        <label htmlFor="age_input" className="block text-subtext dark:text-gray-400 text-sm font-medium mb-2">Age</label>
                        <input id="age_input" type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="w-full p-4 bg-[#F8FAFC] dark:bg-slate-800/50 border border-border dark:border-slate-700 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-text dark:text-white font-medium" placeholder="18" required />
                    </div>
                    <div>
                        <label className="block text-subtext dark:text-gray-400 text-sm font-medium mb-2">Identity</label>
                        <div className="flex bg-[#F8FAFC] dark:bg-slate-800/50 rounded-xl p-1 border border-border dark:border-slate-700" role="group" aria-label="Identity Selection">
                            {['Male', 'Female', 'Other'].map(g => (
                                <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })} aria-pressed={formData.gender === g} className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${formData.gender === g ? 'bg-white dark:bg-slate-700 text-primary dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-slate-600' : 'text-subtext dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "How is your study or work pressure lately?",
            subtitle: "It's okay to feel a bit overwhelmed sometimes.",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8 filter drop-shadow-md">{emojis[formData.academic_pressure]}</span>
                    <input type="range" name="academic_pressure" min="1" max="5" value={formData.academic_pressure} onChange={handleSliderChange} className="w-full h-2 bg-indigo-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                    <div className="flex justify-between w-full text-subtext dark:text-gray-400 text-sm mt-4 font-medium">
                        <span>Manageable</span><span>Overwhelming</span>
                    </div>
                </div>
            )
        },
        {
            title: "How satisfied are you with your progress?",
            subtitle: "Be kind to yourself—every small win counts.",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8 filter drop-shadow-md">{emojis[5 - formData.study_satisfaction]}</span>
                    <input type="range" name="study_satisfaction" min="1" max="5" value={formData.study_satisfaction} onChange={handleSliderChange} className="w-full h-2 bg-green-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary" />
                    <div className="flex justify-between w-full text-subtext dark:text-gray-400 text-sm mt-4 font-medium">
                        <span>Struggling</span><span>Doing Great</span>
                    </div>
                </div>
            )
        },
        {
            title: "Are you experiencing financial concerns?",
            subtitle: "Money can be a heavy burden. How has it been for you?",
            content: (
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-8 filter drop-shadow-md">{emojis[formData.financial_stress]}</span>
                    <input type="range" name="financial_stress" min="1" max="5" value={formData.financial_stress} onChange={handleSliderChange} className="w-full h-2 bg-orange-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent" />
                    <div className="flex justify-between w-full text-subtext dark:text-gray-400 text-sm mt-4 font-medium">
                        <span>None</span><span>Keeping me up</span>
                    </div>
                </div>
            )
        },
        {
            title: "How many hours do you work or study daily?",
            subtitle: "Finding balance is key to sustainable well-being.",
            content: (
                <div className="flex flex-col items-center">
                    <div className="text-4xl font-heading font-semibold text-primary dark:text-indigo-400 mb-8">{formData.work_hours} hr</div>
                    <input type="range" name="work_hours" min="1" max="12" value={formData.work_hours} onChange={handleSliderChange} className="w-full h-2 bg-indigo-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                    <div className="flex justify-between w-full text-subtext dark:text-gray-400 text-sm mt-4 font-medium">
                        <span>1hr</span><span>12hr+</span>
                    </div>
                </div>
            )
        },
        {
            title: "What is your sleep duration like?",
            subtitle: "Rest is the foundation of mental resilience.",
            content: (
                <div className="space-y-4" role="radiogroup" aria-label="Sleep Duration">
                    {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => (
                        <button key={o} type="button" onClick={() => setFormData({ ...formData, sleep_duration: o })} aria-checked={formData.sleep_duration === o} role="radio" className={`w-full p-4 rounded-xl text-left font-medium transition-all ${formData.sleep_duration === o ? 'bg-primary text-white shadow-md' : 'bg-[#F8FAFC] dark:bg-slate-800 text-text dark:text-white border border-border dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700'}`}>
                            {o}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "How would you describe your dietary balance?",
            subtitle: "Nourishment for your body is nourishment for your mind.",
            content: (
                <div className="space-y-4" role="radiogroup" aria-label="Dietary Habits">
                    {['Healthy', 'Moderate', 'Unhealthy'].map(o => (
                        <button key={o} type="button" onClick={() => setFormData({ ...formData, dietary_habits: o })} aria-checked={formData.dietary_habits === o} role="radio" className={`w-full p-4 rounded-xl text-left font-medium transition-all ${formData.dietary_habits === o ? 'bg-secondary text-white shadow-md' : 'bg-[#F8FAFC] dark:bg-slate-800 text-text dark:text-white border border-border dark:border-slate-700 hover:bg-green-50 dark:hover:bg-slate-700'}`}>
                            {o}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "Have you had thoughts of giving up lately?",
             subtitle: "This is a safe space. Your honesty helps us provide the best resources.",
            content: (
                <div className="flex gap-4" role="radiogroup" aria-label="Suicidal Thoughts Selection">
                    {['No', 'Yes'].map(opt => (
                        <button key={opt} type="button" onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })} aria-checked={formData.suicidal_thoughts === opt} role="radio" className={`flex-1 py-6 rounded-xl font-medium text-lg transition-all ${formData.suicidal_thoughts === opt ? 'bg-accent text-white shadow-md' : 'bg-[#F8FAFC] dark:bg-slate-800 text-text dark:text-white border border-border dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-700'}`}>
                            {opt}
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "Any family history of mental health challenges?",
            subtitle: "Genetics can play a role, but they don't define your journey.",
            content: (
                <div className="flex gap-4" role="radiogroup" aria-label="Family History Selection">
                    {['No', 'Yes'].map(opt => (
                        <button key={opt} type="button" onClick={() => setFormData({ ...formData, family_history: opt })} aria-checked={formData.family_history === opt} role="radio" className={`flex-1 py-6 rounded-xl font-medium text-lg transition-all ${formData.family_history === opt ? 'bg-primary text-white shadow-md' : 'bg-[#F8FAFC] dark:bg-slate-800 text-text dark:text-white border border-border dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700'}`}>
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
                <div className="flex justify-between text-sm font-semibold text-subtext dark:text-gray-400 mb-3">
                    <span>Question {currentStep + 1} of {steps.length}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <div className="w-full bg-[#E2E8F0] dark:bg-slate-800 rounded-full h-3">
                    <div className="bg-[#10B981] h-3 rounded-full transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-border dark:border-slate-800 min-h-[450px] flex flex-col justify-between backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex-grow"
                    >
                        <h2 className="text-3xl font-heading font-bold text-text dark:text-white mb-2 leading-tight">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-subtext dark:text-gray-400 mb-10 font-medium">
                            {steps[currentStep].subtitle}
                        </p>
                        {steps[currentStep].content}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-12 pt-8 border-t border-border dark:border-slate-800">
                    <button 
                        onClick={prevStep} 
                        disabled={currentStep === 0} 
                        className={`flex items-center gap-2 font-semibold transition-all ${currentStep === 0 ? 'text-gray-300 dark:text-slate-700 cursor-not-allowed' : 'text-subtext dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400'}`}
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={nextStep} 
                        disabled={loading}
                        className="bg-[#6366F1] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-600 transition-all flex items-center gap-3"
                    >
                        {loading ? 'Analyzing Neural Patterns...' : (currentStep === steps.length - 1 ? 'See Results' : 'Next Step')} 
                        {!loading && currentStep !== steps.length - 1 && <ArrowRight className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentForm;


