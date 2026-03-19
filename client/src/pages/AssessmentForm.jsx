import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictRisk } from '../services/api';

const emojis = ['😃', '🙂', '😐', '😟', '😨', '😱']; // 0 to 5

const AssessmentForm = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

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
        try {
            const result = await predictRisk(formData);
            navigate('/result', { state: { result, formData } });
        } catch (error) {
            console.error("Error predicting result:", error);
            alert("Failed to review your check-in. Please ensure the server is working.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-subtle border border-zinc-100 animate-slide-up relative mt-8 mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center tracking-tight">Well-being Check-in</h2>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Identity Section */}
                <section className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 bg-zinc-50/50 rounded-2xl border border-zinc-100/80 transition-all hover:bg-zinc-50 relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-sage-400 rounded-l-2xl opacity-50"></div>
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">How should we call you?</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First name or nickname" className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 outline-none transition-all text-zinc-800 placeholder-zinc-400" required />
                    </div>
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="99" className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 outline-none transition-all text-zinc-800" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">Identity</label>
                        <div className="flex p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/50">
                            {['Male', 'Female', 'Other'].map(g => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: g })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.gender === g ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sliders Section */}
                <section className="grid md:grid-cols-2 gap-10 p-6 sm:p-8 bg-white rounded-2xl border border-zinc-100/80 shadow-sm transition-all relative">
                    {/* Academic Pressure */}
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-zinc-800 font-medium">Pressure from studies/work</label>
                            <span className="text-2xl filter grayscale opacity-80 transition-all duration-300 hover:grayscale-0">{emojis[formData.academic_pressure]}</span>
                        </div>
                        <input
                            type="range"
                            name="academic_pressure"
                            min="1" max="5"
                            value={formData.academic_pressure}
                            onChange={handleSliderChange}
                            className="range-slider w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 mt-2 font-medium">
                            <span>Manageable</span><span>Overwhelming</span>
                        </div>
                    </div>

                    {/* Study Satisfaction */}
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-zinc-800 font-medium">Satisfaction with progress</label>
                            <span className="text-2xl filter grayscale opacity-80 transition-all duration-300 hover:grayscale-0">{emojis[5 - formData.study_satisfaction]}</span>
                        </div>
                        <input
                            type="range"
                            name="study_satisfaction"
                            min="1" max="5"
                            value={formData.study_satisfaction}
                            onChange={handleSliderChange}
                            className="range-slider w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 mt-2 font-medium">
                            <span>Struggling</span><span>Doing Great</span>
                        </div>
                    </div>

                    {/* Financial Stress */}
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-zinc-800 font-medium">Financial concerns</label>
                            <span className="text-2xl filter grayscale opacity-80 transition-all duration-300 hover:grayscale-0">{emojis[formData.financial_stress]}</span>
                        </div>
                        <input
                            type="range"
                            name="financial_stress"
                            min="1" max="5"
                            value={formData.financial_stress}
                            onChange={handleSliderChange}
                            className="range-slider w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 mt-2 font-medium">
                            <span>None</span><span>Keeping me up</span>
                        </div>
                    </div>

                    {/* Work Hours */}
                    <div className="flex flex-col justify-end">
                        <div className="flex justify-between items-end mb-4">
                            <label className="text-zinc-800 font-medium">Hours working/studying</label>
                            <span className="text-sage-600 font-bold bg-sage-50 px-3 py-1 rounded-md text-sm">{formData.work_hours} hr/day</span>
                        </div>
                        <input
                            type="range"
                            name="work_hours"
                            min="1" max="12"
                            value={formData.work_hours}
                            onChange={handleSliderChange}
                            className="range-slider w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-400 mt-2 font-medium">
                            <span>1h</span><span>12h+</span>
                        </div>
                    </div>
                </section>

                {/* Dropdowns Section */}
                <section className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 bg-zinc-50/50 rounded-2xl border border-zinc-100/80 transition-all hover:bg-zinc-50">
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">How much sleep do you get?</label>
                        <div className="relative">
                            <select name="sleep_duration" value={formData.sleep_duration} onChange={handleChange} className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 outline-none transition-all text-zinc-800 appearance-none cursor-pointer">
                                {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">▼</div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">How balanced is your diet?</label>
                        <div className="relative">
                            <select name="dietary_habits" value={formData.dietary_habits} onChange={handleChange} className="w-full p-3.5 bg-white border border-zinc-200 rounded-xl focus:border-sage-400 focus:ring-4 focus:ring-sage-100 outline-none transition-all text-zinc-800 appearance-none cursor-pointer">
                                {['Healthy', 'Moderate', 'Unhealthy'].map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">▼</div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">Do you have thoughts of giving up?</label>
                        <div className="flex p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/50">
                            {['No', 'Yes'].map(opt => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, suicidal_thoughts: opt })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.suicidal_thoughts === opt ? (opt === 'Yes' ? 'bg-red-50 text-red-700 shadow-sm border border-red-100' : 'bg-white text-zinc-900 shadow-sm') : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-zinc-600 text-sm font-semibold mb-2">Does your family have history of mental health challenges?</label>
                        <div className="flex p-1 bg-zinc-100/80 rounded-xl border border-zinc-200/50">
                            {['No', 'Yes'].map(opt => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, family_history: opt })}
                                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.family_history === opt ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 mt-10 border-t border-zinc-100">
                    <button type="button" onClick={() => navigate('/')} className="w-full sm:w-1/3 py-4 rounded-xl font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors border border-transparent">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="w-full sm:w-2/3 py-4 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]">
                        {loading ? 'Reviewing your responses...' : 'Complete Check-in'}
                    </button>
                </div>
                <p className="text-center text-xs text-zinc-400 mt-4 leading-relaxed max-w-lg mx-auto">
                    By confirming, you acknowledge that this is a soft guide to understanding your habits and not a medical diagnosis.
                </p>
            </form>

            {/* Disclaimer Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-hover max-w-md w-full p-8 relative flex flex-col text-left">
                        
                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        </div>

                        <h3 className="text-xl font-semibold text-zinc-900 mb-3">Just a quick note</h3>

                        <p className="text-zinc-500 mb-8 leading-relaxed text-sm">
                            This check-in looks at patterns in daily habits to provide gentle guidance. It is designed to encourage self-reflection and is not a clinical diagnosis or a replacement for professional care. Please take care of yourself.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3 px-4 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 px-4 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors"
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
