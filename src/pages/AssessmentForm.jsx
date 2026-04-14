import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    { 
        id: 0,
        q: "Over the past two weeks, how often have you felt little interest or pleasure in doing things?",         
        section: "Mood & Energy",     
        hint: "Think about activities you usually enjoy — hobbies, socialising, or everyday tasks." 
    },
    { 
        id: 1,
        q: "Feeling down, depressed, or hopeless?",                
        section: "Mood & Energy",     
        hint: "Not just a bad day — a persistent feeling over the past two weeks." 
    },
    { 
        id: 2,
        q: "Trouble falling or staying asleep, or sleeping too much?", 
        section: "Sleep",          
        hint: "Changes in sleep patterns are a common early indicator." 
    },
    { 
        id: 3,
        q: "Feeling tired or having little energy?",               
        section: "Mood & Energy",     
        hint: "Consider your energy levels throughout typical days." 
    },
    { 
        id: 4,
        q: "Poor appetite or overeating?",                         
        section: "Physical",          
        hint: "Significant changes in eating habits can reflect mood changes." 
    },
    { 
        id: 5,
        q: "Feeling bad about yourself — or that you are a failure?",         
        section: "Self-worth",        
        hint: "Disproportionate guilt or self-blame, beyond a specific event." 
    },
    { 
        id: 6,
        q: "Trouble concentrating on things, such as reading or watching TV?",  
        section: "Concentration",     
        hint: "Difficulty staying present or following tasks you would normally manage." 
    },
    { 
        id: 7,
        q: "Moving or speaking so slowly that other people could have noticed?",      
        section: "Physical",          
        hint: "Others may have noticed this — agitation or physical slowness." 
    },
    { 
        id: 8,
        q: "Thoughts that you would be better off dead, or of hurting yourself?", 
        section: "Safety",          
        hint: "Please answer honestly. Your response helps us show you the right support." 
    },
];

const options = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 },
];

const AssessmentForm = () => {
    const navigate = useNavigate();
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState(new Array(9).fill(null));

    const handleSelect = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentQ] = value;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            // Calculate total score for PHQ-9
            const totalScore = answers.reduce((a, b) => a + (b || 0), 0);
            
            // Map score to severity
            let severity = "Low";
            if (totalScore >= 20) severity = "Severe";
            else if (totalScore >= 15) severity = "Moderately Severe";
            else if (totalScore >= 10) severity = "Moderate";
            else if (totalScore >= 5) severity = "Mild";

            // Map to existing result structure for the dashboard
            // We can mock the prediction result or pass raw score
            const resultData = {
                prediction: totalScore >= 10 ? 1 : 0, // Moderate or above is flagged
                probability: totalScore / 27,
                phq9_score: totalScore,
                severity: severity,
                timestamp: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            };

            navigate('/result', { state: { result: resultData, answers } });
        }
    };

    const prevQuestion = () => {
        if (currentQ > 0) setCurrentQ(prev => prev - 1);
    };

    const progress = ((currentQ + 1) / questions.length) * 100;
    const currentQuestionData = questions[currentQ];

    return (
        <div className="max-w-[680px] mx-auto px-6 pt-12">
            {/* Progress Header */}
            <div className="mb-10">
                <div className="flex justify-between items-baseline mb-3">
                    <span className="text-[0.82rem] font-semibold text-forest uppercase tracking-[0.08em]">
                        Wellbeing Assessment
                    </span>
                    <span className="text-[0.82rem] text-muted">
                        Question {currentQ + 1} of {questions.length}
                    </span>
                </div>
                <div className="h-[5px] bg-border rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                    />
                </div>
            </div>

            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 bg-forest-faint text-forest text-[0.75rem] font-bold tracking-[0.07em] uppercase px-3 py-1 rounded-full mb-4">
                <div className="w-[10px] h-[10px] bg-forest rounded-full" />
                {currentQuestionData.section}
            </div>

            {/* Question Card */}
            <div className="bg-white border border-border rounded-[20px] p-10 shadow-md">
                <p className="text-[0.78rem] font-bold text-muted tracking-[0.06em] uppercase mb-3">
                    {String(currentQ + 1).padStart(2, '0')}.
                </p>
                
                <h1 className="font-heading text-[1.55rem] leading-[1.35] text-ink mb-2">
                    {currentQuestionData.q}
                </h1>
                
                <p className="text-[0.85rem] text-muted italic leading-relaxed mb-8">
                    {currentQuestionData.hint}
                </p>

                {/* Options Grid */}
                <div className="grid gap-3">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`flex items-center gap-4 w-full p-4 rounded-[14px] border-[1.5px] text-left transition-all duration-200 group relative overflow-hidden ${
                                answers[currentQ] === option.value
                                    ? 'border-forest bg-sage shadow-[0_0_0_3px_rgba(45,90,61,0.1)]'
                                    : 'border-border bg-ivory hover:border-forest hover:bg-white hover:translate-x-[2px]'
                            }`}
                        >
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                answers[currentQ] === option.value
                                    ? 'border-forest bg-forest'
                                    : 'border-border bg-white group-hover:border-forest'
                            }`}>
                                {answers[currentQ] === option.value && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="flex-grow font-medium text-[0.95rem]">{option.label}</span>
                            <span className={`text-[0.72rem] font-bold px-2 py-0.5 rounded-md border transition-all ${
                                answers[currentQ] === option.value
                                    ? 'bg-forest/10 border-forest text-forest'
                                    : 'bg-white border-border text-muted'
                            }`}>
                                {option.value}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 gap-3">
                    <button
                        onClick={prevQuestion}
                        disabled={currentQ === 0}
                        className="btn-ghost py-3 flex items-center gap-2 group disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 12L6 8l4-4"/>
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={nextQuestion}
                        disabled={answers[currentQ] === null}
                        className="btn-forest py-3 flex items-center gap-2 group disabled:opacity-45 disabled:cursor-not-allowed"
                    >
                        {currentQ === questions.length - 1 ? 'See my results' : 'Next question'}
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 12l4-4-4-4"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Why We Ask This Panel */}
            <div className="editorial-card p-5 mt-5 flex gap-4 items-start">
                <div className="flex-shrink-0 w-9 h-9 bg-forest-faint rounded-[10px] flex items-center justify-center">
                    <svg className="w-5 h-5 stroke-forest fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
                <div>
                    <h4 className="text-[0.85rem] font-bold mb-0.5">Why we ask this</h4>
                    <p className="text-[0.8rem] text-muted leading-relaxed">
                        {currentQ === 0 ? "Loss of interest or pleasure (anhedonia) is one of the two core indicators used in the PHQ-9 clinical screening tool for depression." : 
                         currentQ === 8 ? "Safety is our priority. Thoughts of self-harm are serious symptoms that require compassionate support and professional guidance." :
                         "This question helps identify patterns in your daily life that are clinically associated with changes in mental wellbeing."}
                    </p>
                </div>
            </div>

            {/* Privacy Notice */}
            <div className="editorial-card p-3 mt-6 flex items-center gap-2 text-[0.78rem] text-muted">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Your responses are processed locally and are never stored or transmitted.
            </div>
        </div>
    );
};

export default AssessmentForm;
