import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Cpu, Shield, Brain, Zap, Database, Activity } from 'lucide-react';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl mx-auto py-16 px-4 min-h-[90vh] flex flex-col"
        >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="text-center mb-20 pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-primary text-sm font-semibold tracking-wide mb-6">
                    <Activity className="w-4 h-4" />
                    <span>OUR MISSION</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6 tracking-tight leading-tight">
                    Democratizing Mental Health <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Insights with AI.
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-subtext max-w-2xl mx-auto font-body leading-relaxed">
                    Mental well-being is deeply personal, yet it often goes unnoticed until we feel completely overwhelmed. We built this platform to bring proactive, stigma-free self-reflection to millions of students worldwide.
                </p>
            </motion.div>

            {/* The Technology (Bento Grid) */}
            <motion.div variants={itemVariants} className="mb-24">
                <h2 className="text-3xl font-heading font-semibold text-text mb-8 tracking-tight">The Technology Behind MindCare</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Big Feature */}
                    <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-border flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-primary mb-6">
                                <Cpu className="w-6 h-6 border-transparent" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold text-text mb-3">Predictive Random Forest ML</h3>
                            <p className="text-subtext font-medium leading-relaxed">
                                Our core inference engine is powered by a Scikit-Learn Random Forest Classifier, rigorously trained and cross-validated on a comprehensive dataset of over 25,000 student behavioral records. It analyzes complex non-linear combinations of lifestyle factors to calculate an incredibly accurate baseline emotional strain index.
                            </p>
                        </div>
                    </div>

                    {/* Small Feature 1 */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-border flex flex-col group hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-secondary mb-6">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-text mb-3">Zero-Knowledge</h3>
                        <p className="text-subtext font-medium text-sm leading-relaxed">
                            Privacy is absolute. No Personally Identifiable Information (PII) is ever collected. Your sessions are ephemeral, and payloads are strictly anonymized.
                        </p>
                    </div>

                    {/* Small Feature 2 */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-border flex flex-col group hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-accent mb-6">
                            <Brain className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-text mb-3">Holistic Analysis</h3>
                        <p className="text-subtext font-medium text-sm leading-relaxed">
                            We don't look at stress in a vacuum. The model correlates 10 unique variables including sleep hygiene, academic pressure, and dietary habits.
                        </p>
                    </div>

                    {/* Medium Feature 1 */}
                    <div className="md:col-span-2 bg-[#1E293B] rounded-3xl p-8 shadow-lg border border-gray-700 flex flex-col group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
                        <div className="z-10">
                            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white mb-6 border border-gray-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold text-white mb-3">Real-time Flask Architecture</h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                Processing happens in milliseconds. The frontend React client communicates with an ultra-lightweight RESTful Python/Flask backend, loading serialized `.pkl` machine learning models directly into memory upon server spin-up to guarantee zero thermal latency during inference.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div variants={itemVariants} className="bg-orange-50 p-8 rounded-3xl border border-orange-100 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm mb-24">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-accent flex-shrink-0">
                    <Activity className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-heading font-bold text-gray-900 mb-2 tracking-wide">CLINICAL DISCLAIMER</h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                        This architecture acts as a deterministic risk enabler and reflective space, <strong>not a diagnostic medical tool</strong>. It is not approved by the FDA or equivalent agencies for clinical treating of MDD (Major Depressive Disorder). If you are in crisis, please immediately contact local emergency services or a licensed therapist.
                    </p>
                </div>
            </motion.div>

            {/* Founder / Creator Section */}
            <motion.div variants={itemVariants} className="pt-12 border-t border-border">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h3 className="text-2xl font-heading font-semibold text-text mb-2">Built with intention.</h3>
                        <p className="text-subtext font-medium">Have questions about the model or architecture? Reach out.</p>
                    </div>
                    <div className="flex gap-4">
                        <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-white text-subtext rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm border border-border transform hover:-translate-y-1">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-white text-subtext rounded-xl hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm border border-border transform hover:-translate-y-1">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-white text-subtext rounded-xl hover:bg-[#E1306C] hover:text-white transition-all shadow-sm border border-border transform hover:-translate-y-1">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="mailto:ktanayash@gmail.com" className="flex items-center justify-center w-12 h-12 bg-white text-subtext rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-border transform hover:-translate-y-1">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default About;


