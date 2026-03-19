import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictRisk } from '../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const emojis = ['😃', '🙂', '😐', '😟', '😨', '😱']; // 0 to 5

const AssessmentForm = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        setShowModal(true);
    }, []);

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
    const [loading, setLoading] = useState(false);

    useGSAP(() => {
        if (!showModal) {
            // Animate form sections when modal closes
            const sections = formRef.current.children;
            gsap.fromTo(sections, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
            );
        }
    }, { scope: containerRef, dependencies: [showModal] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Animate out
        gsap.to(containerRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.inOut" });
        
        try {
            const result = await predictRisk(formData);
            setTimeout(() => {
                navigate('/result', { state: { result, formData } });
            }, 500);
        } catch (error) {
            console.error("Error predicting result:", error);
            alert("Failed to review your check-in. Please ensure the server is working.");
            gsap.to(containerRef.current, { opacity: 1, y: 0 }); // Restore if failed
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-12 px-4 relative min-h-screen flex flex-col justify-center">
            
            <div className={`glass-panel p-8 sm:p-12 transition-opacity duration-500 ${showModal ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-center mb-10">
                    <div className="inline-block bg-sage-100 text-sage-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4 tracking-wide shadow-sm border border-sage-200/50">
                        Step 1 of 1
                    </div>
                    <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Well-being Check-in</h2>
                    <p className="text-zinc-500 mt-3 text-lg">Help us understand your current lifestyle baseline.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                    {/* Identity Section */}
                    <section className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-subtle grid md:grid-cols-2 gap-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-sage-300 to-sage-500 rounded-l-2xl"></div>
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">How should we call you?</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First name or nickname" className="glass-input" required />
                        </div>
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">Age</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="glass-input" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">Identity</label>
                            <div className="flex p-1.5 bg-zinc-200/50 rounded-2xl border border-zinc-200/50 backdrop-blur-sm">
                                {['Male', 'Female', 'Other'].map(g => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: g })}
                                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${formData.gender === g ? 'bg-white text-zinc-900 shadow-md transform scale-[1.02]' : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/30'}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Sliders Section */}
                    <section className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-subtle grid md:grid-cols-2 gap-10">
                        {/* Academic Pressure */}
                        <div className="flex flex-col justify-end group">
                            <div className="flex justify-between items-end mb-5">
                                <label className="text-zinc-800 font-bold tracking-wide">Pressure from studies/work</label>
                                <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.academic_pressure]}</span>
                            </div>
                            <input type="range" name="academic_pressure" min="1" max="5" value={formData.academic_pressure} onChange={handleSliderChange} className="range-slider" />
                            <div className="flex justify-between text-xs text-zinc-500 mt-3 font-semibold uppercase tracking-wider">
                                <span>Manageable</span><span>Overwhelming</span>
                            </div>
                        </div>

                        {/* Study Satisfaction */}
                        <div className="flex flex-col justify-end group">
                            <div className="flex justify-between items-end mb-5">
                                <label className="text-zinc-800 font-bold tracking-wide">Satisfaction with progress</label>
                                <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[5 - formData.study_satisfaction]}</span>
                            </div>
                            <input type="range" name="study_satisfaction" min="1" max="5" value={formData.study_satisfaction} onChange={handleSliderChange} className="range-slider" />
                            <div className="flex justify-between text-xs text-zinc-500 mt-3 font-semibold uppercase tracking-wider">
                                <span>Struggling</span><span>Doing Great</span>
                            </div>
                        </div>

                        {/* Financial Stress */}
                        <div className="flex flex-col justify-end group">
                            <div className="flex justify-between items-end mb-5">
                                <label className="text-zinc-800 font-bold tracking-wide">Financial concerns</label>
                                <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.financial_stress]}</span>
                            </div>
                            <input type="range" name="financial_stress" min="1" max="5" value={formData.financial_stress} onChange={handleSliderChange} className="range-slider" />
                            <div className="flex justify-between text-xs text-zinc-500 mt-3 font-semibold uppercase tracking-wider">
                                <span>None</span><span>Keeping me up</span>
                            </div>
                        </div>

                        {/* Work Hours */}
                        <div className="flex flex-col justify-end group">
                            <div className="flex justify-between items-end mb-5">
                                <label className="text-zinc-800 font-bold tracking-wide">Hours working/studying</label>
                                <span className="text-sage-700 font-extrabold bg-sage-100/80 px-4 py-1.5 rounded-xl shadow-sm border border-sage-200/50">{formData.work_hours} hr/day</span>
                            </div>
                            <input type="range" name="work_hours" min="1" max="12" value={formData.work_hours} onChange={handleSliderChange} className="range-slider" />
                            <div className="flex justify-between text-xs text-zinc-500 mt-3 font-semibold uppercase tracking-wider">
                                <span>1h</span><span>12h+</span>
                            </div>
                        </div>
                    </section>

                    {/* Dropdowns Section */}
                    <section className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-subtle grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">How much sleep do you get?</label>
                            <div className="relative">
                                <select name="sleep_duration" value={formData.sleep_duration} onChange={handleChange} className="glass-input cursor-pointer appearance-none">
                                    {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-sage-500 text-xs font-bold">▼</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">How balanced is your diet?</label>
                            <div className="relative">
                                <select name="dietary_habits" value={formData.dietary_habits} onChange={handleChange} className="glass-input cursor-pointer appearance-none">
                                    {['Healthy', 'Moderate', 'Unhealthy'].map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-sage-500 text-xs font-bold">▼</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">Thoughts of giving up?</label>
                            <div className="flex p-1.5 bg-zinc-200/50 rounded-2xl border border-zinc-200/50 backdrop-blur-sm">
                                {['No', 'Yes'].map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${formData.suicidal_thoughts === opt ? (opt === 'Yes' ? 'bg-red-50 text-red-600 shadow-md border border-red-200 transform scale-[1.02]' : 'bg-white text-zinc-900 shadow-md transform scale-[1.02]') : 'text-zinc-500 hover:text-zinc-800'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-zinc-700 text-sm font-bold mb-3 uppercase tracking-wider">Mental health history in family?</label>
                            <div className="flex p-1.5 bg-zinc-200/50 rounded-2xl border border-zinc-200/50 backdrop-blur-sm">
                                {['No', 'Yes'].map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, family_history: opt })}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${formData.family_history === opt ? 'bg-white text-zinc-900 shadow-md transform scale-[1.02]' : 'text-zinc-500 hover:text-zinc-800'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse sm:flex-row gap-5 pt-8 mt-12 border-t border-zinc-200/60">
                        <button type="button" onClick={() => navigate('/')} className="w-full sm:w-1/3 py-4 rounded-2xl font-bold tracking-wide text-zinc-500 hover:bg-white/60 hover:shadow-subtle transition-all border border-transparent">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="w-full sm:w-2/3 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing Insights...
                                </span>
                            ) : 'Complete Check-in'}
                        </button>
                    </div>
                    <p className="text-center text-xs font-semibold text-zinc-400 mt-6 leading-relaxed max-w-lg mx-auto uppercase tracking-wider">
                        By confirming, you acknowledge that this is a soft guide and not a medical diagnosis.
                    </p>
                </form>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative flex flex-col text-left animate-slide-up border border-white/20">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 border border-amber-100">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                        </div>

                        <h3 className="text-2xl font-extrabold text-zinc-900 mb-3 tracking-tight">Before we begin</h3>

                        <p className="text-zinc-500 mb-8 leading-relaxed font-medium">
                            This check-in analyzes your daily habits to provide gentle guidance. It is designed to encourage self-reflection and is not a clinical diagnosis or a replacement for professional care. Please take care of yourself.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3.5 px-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3.5 px-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 shadow-hover transform active:scale-95 transition-all"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssessmentForm;
