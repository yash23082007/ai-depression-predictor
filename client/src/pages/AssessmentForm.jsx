import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictRisk } from '../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaLock, FaClock } from 'react-icons/fa';

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
            const sections = formRef.current.children;
            gsap.fromTo(sections, 
                { y: 40, opacity: 0 }, 
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
        gsap.to(containerRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power2.inOut" });
        
        try {
            const result = await predictRisk(formData);
            setTimeout(() => {
                navigate('/result', { state: { result, formData } });
            }, 400);
        } catch (error) {
            console.error("Error predicting result:", error);
            alert("Failed to review your check-in. Please ensure the server is working.");
            gsap.to(containerRef.current, { opacity: 1, y: 0 });
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-16 px-4 relative min-h-screen flex flex-col justify-center">
            
            <div className={`transition-opacity duration-500 ${showModal ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">Well-being Check-in</h2>
                    <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Helping us understand your daily habits to find better balance.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm font-semibold text-zinc-400">
                        <span className="flex items-center gap-2"><FaClock className="text-sage-500" /> Takes less than 2 minutes</span>
                        <span className="flex items-center gap-2"><FaLock className="text-amber-500" /> Safe & private space</span>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                    
                    {/* SECTION 1: Basic Info & Identity */}
                    <section className="glass-panel p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-sage-400"></div>
                        <h3 className="text-2xl font-bold text-zinc-800 mb-8 tracking-tight">Basic Info</h3>
                        
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                            {/* Floating Label Input for Name */}
                            <div className="relative group">
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="peer w-full p-4 pt-6 pb-2 bg-white/60 backdrop-blur-md border border-zinc-200/80 rounded-xl focus:border-sage-500 focus:ring-4 focus:ring-sage-100/50 outline-none transition-all text-zinc-900 font-medium placeholder-transparent" placeholder="Nickname" required />
                                <label htmlFor="name" className="absolute left-4 text-zinc-500 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sage-600 top-2 text-xs pointer-events-none">
                                    How should we call you?
                                </label>
                            </div>
                            
                            {/* Floating Label Input for Age */}
                            <div className="relative group">
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="peer w-full p-4 pt-6 pb-2 bg-white/60 backdrop-blur-md border border-zinc-200/80 rounded-xl focus:border-sage-500 focus:ring-4 focus:ring-sage-100/50 outline-none transition-all text-zinc-900 font-medium placeholder-transparent" placeholder="18" required />
                                <label htmlFor="age" className="absolute left-4 text-zinc-500 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sage-600 top-2 text-xs pointer-events-none">
                                    Age
                                </label>
                            </div>

                            {/* Segmented Control for Gender */}
                            <div className="md:col-span-2 mt-2">
                                <label className="block text-zinc-700 text-sm font-bold mb-4 uppercase tracking-widest">Identity</label>
                                <div className="flex bg-zinc-200/60 rounded-2xl p-1.5 backdrop-blur-sm shadow-inner relative">
                                    {['Male', 'Female', 'Other'].map(g => {
                                        const isActive = formData.gender === g;
                                        return (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 z-10 ${isActive ? 'bg-white text-zinc-900 shadow-[0_4px_12px_rgb(0,0,0,0.1)] scale-[1.02] border border-zinc-100' : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40 shadow-none'}`}
                                            >
                                                {g}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-zinc-400 mt-6 tracking-wide">Your information is completely anonymized.</p>
                    </section>

                    {/* SECTION 2: Lifestyle & Work */}
                    <section className="glass-panel p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-400"></div>
                        <h3 className="text-2xl font-bold text-zinc-800 mb-8 tracking-tight">Lifestyle</h3>
                        
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-5">
                                    <label className="text-zinc-800 font-extrabold tracking-wide">Pressure from studies/work</label>
                                    <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.academic_pressure]}</span>
                                </div>
                                <input type="range" name="academic_pressure" min="1" max="5" value={formData.academic_pressure} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-xs text-zinc-500 mt-4 font-bold uppercase tracking-widest">
                                    <span>Manageable</span><span>Overwhelming</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-5">
                                    <label className="text-zinc-800 font-extrabold tracking-wide">Satisfaction with progress</label>
                                    <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[5 - formData.study_satisfaction]}</span>
                                </div>
                                <input type="range" name="study_satisfaction" min="1" max="5" value={formData.study_satisfaction} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-xs text-zinc-500 mt-4 font-bold uppercase tracking-widest">
                                    <span>Struggling</span><span>Doing Great</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-5">
                                    <label className="text-zinc-800 font-extrabold tracking-wide">Financial concerns</label>
                                    <span className="text-3xl filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.financial_stress]}</span>
                                </div>
                                <input type="range" name="financial_stress" min="1" max="5" value={formData.financial_stress} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-xs text-zinc-500 mt-4 font-bold uppercase tracking-widest">
                                    <span>None</span><span>Keeping me up</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-5">
                                    <label className="text-zinc-800 font-extrabold tracking-wide">Hours working/studying</label>
                                    <span className="text-blue-700 font-black bg-blue-100/80 px-4 py-1.5 rounded-xl shadow-sm border border-blue-200">{formData.work_hours} hr/day</span>
                                </div>
                                <input type="range" name="work_hours" min="1" max="12" value={formData.work_hours} onChange={handleSliderChange} className="range-slider [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:hover:border-blue-600" />
                                <div className="flex justify-between text-xs text-zinc-500 mt-4 font-bold uppercase tracking-widest">
                                    <span>1h</span><span>12h+</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Habits & Mood */}
                    <section className="glass-panel p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
                        <h3 className="text-2xl font-bold text-zinc-800 mb-8 tracking-tight">Habits & Mindset</h3>
                        
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                            <div>
                                <label className="block text-zinc-700 text-sm font-bold mb-4 uppercase tracking-widest">How much sleep do you get?</label>
                                <div className="relative">
                                    <select name="sleep_duration" value={formData.sleep_duration} onChange={handleChange} className="glass-input cursor-pointer appearance-none font-bold py-4">
                                        {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-400 text-sm font-bold">▼</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-zinc-700 text-sm font-bold mb-4 uppercase tracking-widest">How balanced is your diet?</label>
                                <div className="relative">
                                    <select name="dietary_habits" value={formData.dietary_habits} onChange={handleChange} className="glass-input cursor-pointer appearance-none font-bold py-4">
                                        {['Healthy', 'Moderate', 'Unhealthy'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-400 text-sm font-bold">▼</div>
                                </div>
                            </div>
                            
                            {/* Segmented Controls for Yes/No Flags */}
                            <div>
                                <label className="block text-zinc-700 text-sm font-bold mb-4 uppercase tracking-widest">Thoughts of giving up?</label>
                                <div className="flex bg-zinc-200/60 rounded-2xl p-1.5 backdrop-blur-sm shadow-inner">
                                    {['No', 'Yes'].map(opt => {
                                        const isActive = formData.suicidal_thoughts === opt;
                                        const isYes = opt === 'Yes';
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })}
                                                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive ? (isYes ? 'bg-red-50 text-red-600 shadow-[0_4px_12px_rgb(239,68,68,0.2)] border border-red-200 scale-[1.02]' : 'bg-white text-zinc-900 shadow-[0_4px_12px_rgb(0,0,0,0.1)] border border-zinc-100 scale-[1.02]') : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40'}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <label className="block text-zinc-700 text-sm font-bold mb-4 uppercase tracking-widest">Family history of mental health?</label>
                                <div className="flex bg-zinc-200/60 rounded-2xl p-1.5 backdrop-blur-sm shadow-inner">
                                    {['No', 'Yes'].map(opt => {
                                        const isActive = formData.family_history === opt;
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, family_history: opt })}
                                                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${isActive ? 'bg-white text-zinc-900 shadow-[0_4px_12px_rgb(0,0,0,0.1)] border border-zinc-100 scale-[1.02]' : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40'}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse sm:flex-row gap-5 pt-4">
                        <button type="button" onClick={() => navigate('/')} className="w-full sm:w-1/3 py-5 rounded-2xl font-bold tracking-widest uppercase text-zinc-500 hover:bg-white/80 hover:shadow-subtle hover:text-zinc-800 transition-all border border-transparent">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="w-full sm:w-2/3 py-5 bg-zinc-900 text-white rounded-2xl font-extrabold text-lg hover:bg-zinc-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:-translate-y-1 transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Analyzing Insights...
                                </span>
                            ) : 'Complete Check-in'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-md animate-fade-in">
                    <div className="glass-panel max-w-md w-full p-10 relative flex flex-col text-left animate-slide-up shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-8 border border-amber-100">
                            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
                        </div>

                        <h3 className="text-3xl font-extrabold text-zinc-900 mb-4 tracking-tight">Before we begin</h3>

                        <p className="text-zinc-600 mb-10 leading-relaxed font-medium">
                            This check-in analyzes your daily habits to provide gentle guidance. It's designed to encourage self-reflection—<strong>not a clinical diagnosis</strong>. Please take care of yourself.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-4 px-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-800 transition-all"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-4 px-4 bg-zinc-900 text-white rounded-xl font-extrabold hover:bg-zinc-800 shadow-hover transform active:scale-95 transition-all outline-none focus:ring-4 focus:ring-zinc-200"
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
