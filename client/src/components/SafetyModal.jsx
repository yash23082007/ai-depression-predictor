import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, ExternalLink, ShieldCheck, HeartPulse } from 'lucide-react';

const SafetyModal = ({ isOpen, onClose, severity }) => {
    const isHighRisk = severity === 'High' || severity === 'Moderate';

    if (!isOpen || !isHighRisk) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-2xl w-full p-8 md:p-12 relative border border-red-100 dark:border-red-900/30 overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">You're not alone.</h2>
                                <p className="text-red-600 dark:text-red-400 font-bold uppercase tracking-widest text-xs mt-1">Immediate Support Resources</p>
                            </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-lg">
                            We noticed your profile indicates you're navigating some significant challenges. While our AI tool provides patterns, real human support is invaluable. Please consider reaching out to one of these verified resources.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            {/* India */}
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span className="text-xl">🇮🇳</span> India (iCall)
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">Monday-Saturday, 8am-10pm</p>
                                <a href="tel:+919152987821" className="flex items-center gap-2 text-primary dark:text-indigo-400 font-bold hover:underline">
                                    <Phone className="w-4 h-4" /> 9152987821
                                </a>
                            </div>

                            {/* USA */}
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span className="text-xl">🇺🇸</span> USA (Lifeline)
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">Available 24/7, Call or Text</p>
                                <a href="tel:988" className="flex items-center gap-2 text-primary dark:text-indigo-400 font-bold hover:underline">
                                    <Phone className="w-4 h-4" /> 988
                                </a>
                            </div>

                            {/* International */}
                            <div className="md:col-span-2 p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <HeartPulse className="w-5 h-5 text-indigo-500" /> Global Support
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                                        Befrienders Worldwide <ExternalLink className="w-3 h-3" />
                                    </a>
                                    <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                                        Crisis Centres Map <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-center hover:opacity-90 transition-all shadow-xl shadow-slate-500/20"
                            >
                                I understand, continue to results
                            </button>
                            <div className="flex items-center justify-center px-4 text-slate-400 text-xs font-medium gap-2">
                                <ShieldCheck className="w-4 h-4" /> Secure & Private
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SafetyModal;
