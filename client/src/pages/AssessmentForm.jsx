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
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1 }
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
        <div ref={containerRef} className="max-w-3xl mx-auto py-16 px-4 relative min-h-screen flex flex-col justify-center">
            
            <div className={`transition-opacity duration-500 ${showModal ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-ink-900 tracking-tight mb-4">Well-being Check-in</h2>
                    <p className="text-ink-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                        Helping us understand your daily habits to find better balance.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm font-semibold text-ink-400">
                        <span className="flex items-center gap-2"><FaClock className="text-ink-300" /> ~2 minutes</span>
                        <span className="flex items-center gap-2"><FaLock className="text-ink-300" /> Private</span>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* SECTION 1: Basic Info & Identity */}
                    <section className="premium-card p-8 md:p-10 relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-500"></div>
                            <h3 className="text-xl font-serif font-medium text-ink-900 tracking-tight">Basic Info</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                            {/* Floating Label Input for Name */}
                            <div className="relative group">
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="peer w-full p-4 pt-6 pb-2 bg-ink-50 border border-ink-200 rounded-xl focus:bg-white focus:border-ink-400 focus:ring-1 focus:ring-ink-400 outline-none transition-all text-ink-900 font-medium placeholder-transparent shadow-sm" placeholder="Nickname" required />
                                <label htmlFor="name" className="absolute left-4 text-ink-400 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-ink-500 peer-focus:uppercase tracking-wide top-2 text-[10px] uppercase pointer-events-none">
                                    Preferred Name
                                </label>
                            </div>
                            
                            {/* Floating Label Input for Age */}
                            <div className="relative group">
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="peer w-full p-4 pt-6 pb-2 bg-ink-50 border border-ink-200 rounded-xl focus:bg-white focus:border-ink-400 focus:ring-1 focus:ring-ink-400 outline-none transition-all text-ink-900 font-medium placeholder-transparent shadow-sm" placeholder="18" required />
                                <label htmlFor="age" className="absolute left-4 text-ink-400 text-sm font-semibold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-ink-500 peer-focus:uppercase tracking-wide top-2 text-[10px] uppercase pointer-events-none">
                                    Age
                                </label>
                            </div>

                            {/* Segmented Control for Gender */}
                            <div className="md:col-span-2 mt-2">
                                <label className="block text-ink-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Identity</label>
                                <div className="flex bg-ink-100 rounded-xl p-1 border border-ink-200">
                                    {['Male', 'Female', 'Other'].map(g => {
                                        const isActive = formData.gender === g;
                                        return (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-200 z-10 ${isActive ? 'bg-white text-ink-900 shadow-crisp border border-ink-200/50' : 'text-ink-500 hover:text-ink-700 hover:bg-ink-200/50 border border-transparent'}`}
                                            >
                                                {g}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-ink-400 mt-8 mb-2 tracking-wide text-center w-full block">Your information is completely anonymized.</p>
                    </section>

                    {/* SECTION 2: Lifestyle & Work */}
                    <section className="premium-card p-8 md:p-10 relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                            <h3 className="text-xl font-serif font-medium text-ink-900 tracking-tight">Lifestyle</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-ink-800 font-semibold tracking-wide text-sm">Study/Work Pressure</label>
                                    <span className="text-2xl filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.academic_pressure]}</span>
                                </div>
                                <input type="range" name="academic_pressure" min="1" max="5" value={formData.academic_pressure} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-[10px] text-ink-400 mt-4 font-bold uppercase tracking-widest">
                                    <span>Manageable</span><span>Overwhelming</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-ink-800 font-semibold tracking-wide text-sm">Satisfaction with progress</label>
                                    <span className="text-2xl filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[5 - formData.study_satisfaction]}</span>
                                </div>
                                <input type="range" name="study_satisfaction" min="1" max="5" value={formData.study_satisfaction} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-[10px] text-ink-400 mt-4 font-bold uppercase tracking-widest">
                                    <span>Struggling</span><span>Doing Great</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-ink-800 font-semibold tracking-wide text-sm">Financial concerns</label>
                                    <span className="text-2xl filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100">{emojis[formData.financial_stress]}</span>
                                </div>
                                <input type="range" name="financial_stress" min="1" max="5" value={formData.financial_stress} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-[10px] text-ink-400 mt-4 font-bold uppercase tracking-widest">
                                    <span>None</span><span>Keeping me up</span>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end group">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-ink-800 font-semibold tracking-wide text-sm">Hours working/studying</label>
                                    <span className="text-ink-900 font-bold bg-ink-100 px-3 py-1 rounded-lg border border-ink-200 text-xs">{formData.work_hours} hr</span>
                                </div>
                                <input type="range" name="work_hours" min="1" max="12" value={formData.work_hours} onChange={handleSliderChange} className="range-slider" />
                                <div className="flex justify-between text-[10px] text-ink-400 mt-4 font-bold uppercase tracking-widest">
                                    <span>1h</span><span>12h+</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Habits & Mood */}
                    <section className="premium-card p-8 md:p-10 relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                            <h3 className="text-xl font-serif font-medium text-ink-900 tracking-tight">Habits & Mindset</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                            <div>
                                <label className="block text-ink-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Sleep duration</label>
                                <div className="relative">
                                    <select name="sleep_duration" value={formData.sleep_duration} onChange={handleChange} className="premium-input cursor-pointer font-semibold py-4 pr-10 shadow-sm">
                                        {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-ink-400 text-sm font-bold">▼</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-ink-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Dietary Balance</label>
                                <div className="relative">
                                    <select name="dietary_habits" value={formData.dietary_habits} onChange={handleChange} className="premium-input cursor-pointer font-semibold py-4 pr-10 shadow-sm">
                                        {['Healthy', 'Moderate', 'Unhealthy'].map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-ink-400 text-sm font-bold">▼</div>
                                </div>
                            </div>
                            
                            {/* Segmented Controls for Yes/No Flags */}
                            <div>
                                <label className="block text-ink-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Thoughts of giving up?</label>
                                <div className="flex bg-ink-100 rounded-xl p-1 border border-ink-200 shadow-inner">
                                    {['No', 'Yes'].map(opt => {
                                        const isActive = formData.suicidal_thoughts === opt;
                                        const isYes = opt === 'Yes';
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })}
                                                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isActive ? (isYes ? 'bg-white text-red-600 shadow-crisp border border-ink-200' : 'bg-white text-ink-900 shadow-crisp border border-ink-200') : 'text-ink-500 hover:text-ink-700 hover:bg-ink-200/50 border border-transparent'}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <label className="block text-ink-500 text-[10px] font-bold mb-3 uppercase tracking-widest">Family history of mental health?</label>
                                <div className="flex bg-ink-100 rounded-xl p-1 border border-ink-200 shadow-inner">
                                    {['No', 'Yes'].map(opt => {
                                        const isActive = formData.family_history === opt;
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, family_history: opt })}
                                                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isActive ? 'bg-white text-ink-900 shadow-crisp border border-ink-200' : 'text-ink-500 hover:text-ink-700 hover:bg-ink-200/50 border border-transparent'}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6">
                        <button type="button" onClick={() => navigate('/')} className="w-full sm:w-1/3 py-4 rounded-xl font-bold tracking-widest uppercase text-ink-500 hover:bg-ink-100 transition-all border border-transparent border-ink-200/50">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="w-full sm:w-2/3 py-4 bg-ink-900 text-ink-50 rounded-xl font-bold text-lg hover:bg-ink-800 transition-all shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed border border-ink-800">
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-ink-400 border-t-white rounded-full animate-spin"></div>
                                    Analyzing Insights...
                                </span>
                            ) : 'Complete Check-in'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white max-w-md w-full p-10 relative flex flex-col text-left animate-slide-up shadow-card border border-ink-200 rounded-3xl">
                        <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center mb-8 border border-ink-200 shadow-crisp">
                            <div className="w-2.5 h-2.5 rounded-full bg-ink-800 animate-pulse"></div>
                        </div>

                        <h3 className="text-2xl font-serif font-medium text-ink-900 mb-4 tracking-tight">Before we begin</h3>

                        <p className="text-ink-500 mb-10 leading-relaxed font-medium text-sm">
                            This check-in analyzes your daily habits to provide gentle guidance. It's designed to encourage self-reflection—<strong>not a clinical diagnosis</strong>. Please take care of yourself.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-4 px-4 rounded-xl font-semibold text-ink-500 hover:bg-ink-50 border border-transparent hover:border-ink-200 transition-all"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-4 px-4 bg-ink-900 text-ink-50 rounded-xl font-semibold hover:bg-ink-800 shadow-crisp hover:shadow-card transform active:scale-95 transition-all outline-none"
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


