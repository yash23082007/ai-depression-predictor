import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { predictRisk } from '../services/api';
import { FaExclamationTriangle } from 'react-icons/fa';

const emojis = ['😃', '🙂', '😐', '😟', '😨', '😱']; // 0 to 5

const AssessmentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user came from Home and agreed
    // If not, we show the modal on mount
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Simple logic: if no state passed from navigation, assume direct access -> show modal
        // Or we could always show it to be safe, but let's be nice.
        // Actually, previous request asked for "also in assessment section", implies redundancy is desired or direct access protection.
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
            alert("Failed to get prediction. Please check if the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in relative">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Depression Risk Self-Assessment</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Identity Section */}
                <section className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition-all" required />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="35" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none transition-all" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-slate-700 font-semibold mb-2">Gender</label>
                        <div className="flex space-x-4">
                            {['Male', 'Female'].map(g => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: g })}
                                    className={`flex-1 py-3 rounded-lg border transition-all transform active:scale-95 ${formData.gender === g ? 'bg-medical-500 text-white border-medical-500 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-medical-300 hover:bg-slate-50'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sliders Section */}
                <section className="grid md:grid-cols-2 gap-8 p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                    {/* Academic Pressure */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-700 font-semibold text-lg">Academic Pressure</label>
                            <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>{emojis[formData.academic_pressure]}</span>
                        </div>
                        <input
                            type="range"
                            name="academic_pressure"
                            min="0" max="5"
                            value={formData.academic_pressure}
                            onChange={handleSliderChange}
                            className="range-slider accent-medical-500 w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Low</span><span>High</span>
                        </div>
                    </div>

                    {/* Study Satisfaction */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-700 font-semibold text-lg">Study Satisfaction</label>
                            <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>{emojis[5 - formData.study_satisfaction]}</span> {/* Inverted emoji logic for positive trait */}
                        </div>
                        <input
                            type="range"
                            name="study_satisfaction"
                            min="0" max="5"
                            value={formData.study_satisfaction}
                            onChange={handleSliderChange}
                            className="range-slider accent-medical-500 w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Low</span><span>High</span>
                        </div>
                    </div>

                    {/* Financial Stress */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-700 font-semibold text-lg">Financial Stress</label>
                            <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>{emojis[formData.financial_stress]}</span>
                        </div>
                        <input
                            type="range"
                            name="financial_stress"
                            min="0" max="5"
                            value={formData.financial_stress}
                            onChange={handleSliderChange}
                            className="range-slider accent-medical-500 w-full"
                        />
                    </div>

                    {/* Work Hours */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-slate-700 font-semibold text-lg">Work/Study Hours</label>
                            <span className="text-medical-600 font-bold">{formData.work_hours} hr/day</span>
                        </div>
                        <input
                            type="range"
                            name="work_hours"
                            min="0" max="12"
                            value={formData.work_hours}
                            onChange={handleSliderChange}
                            className="range-slider accent-medical-500 w-full"
                        />
                    </div>
                </section>

                {/* Dropdowns Section */}
                <section className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Sleep Duration</label>
                        <select name="sleep_duration" value={formData.sleep_duration} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-medical-500 transition-all hover:border-medical-300 cursor-pointer">
                            {['Less than 5 Hours', '5-6 Hours', '7-8 Hours', 'More than 8 Hours'].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Dietary Habits</label>
                        <select name="dietary_habits" value={formData.dietary_habits} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-medical-500 transition-all hover:border-medical-300 cursor-pointer">
                            {['Healthy', 'Moderate', 'Unhealthy'].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Suicidal Thoughts?</label>
                        <select name="suicidal_thoughts" value={formData.suicidal_thoughts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-medical-500 transition-all hover:border-medical-300 cursor-pointer">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2">Family History?</label>
                        <select name="family_history" value={formData.family_history} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-medical-500 transition-all hover:border-medical-300 cursor-pointer">
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </section>

                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => navigate('/')} className="flex-1 py-4 border border-red-400 text-red-500 rounded-lg font-bold hover:bg-red-50 transition-colors transform hover:-translate-y-1">CANCEL</button>
                    <button type="submit" disabled={loading} className="flex-1 py-4 bg-medical-600 text-white rounded-lg font-bold hover:bg-medical-500 transition-colors shadow-lg disabled:opacity-50 transform hover:-translate-y-1 hover:shadow-xl">
                        {loading ? 'ANALYZING...' : 'SUBMIT ASSESSMENT'}
                    </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-4">By continuing, you agree to our Privacy Policy.</p>
            </form>

            {/* Disclaimer Modal (Same as Home) */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>

                        <div className="flex justify-center mb-6 text-yellow-500">
                            <FaExclamationTriangle className="text-5xl animate-pulse-slow" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Important Disclaimer</h3>

                        <p className="text-gray-600 mb-6 text-center leading-relaxed">
                            This tool is a <strong>predictive AI model</strong> for educational purposes only. It is <strong>NOT</strong> a medical diagnosis.
                            <br /><br />
                            Results are based on statistical patterns and may not reflect your actual clinical state.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-3 bg-medical-600 text-white rounded-lg font-bold hover:bg-medical-500 transition-colors shadow-lg"
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
