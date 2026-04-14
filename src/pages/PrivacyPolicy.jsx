import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, EyeOff, Database, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto py-20 px-4"
        >
            <Link to="/" className="inline-flex items-center gap-2 text-subtext dark:text-gray-400 hover:text-primary transition-all mb-12 font-semibold">
                <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text dark:text-white mb-8">Data Privacy & Ethics</h1>
            <p className="text-xl text-subtext dark:text-gray-400 mb-16 leading-relaxed">
                We believe mental health technology must be built on a foundation of radical transparency and uncompromising privacy.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border dark:border-slate-800 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-400 flex items-center justify-center mb-6">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text dark:text-white mb-4">Clinical Disclaimer</h3>
                    <p className="text-subtext dark:text-gray-400 text-sm leading-relaxed">
                        This tool is an experimental AI check-in. It does not provide clinical diagnoses. Results are patterns based on synthetic data and should be discussed with a healthcare professional.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border dark:border-slate-800 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/30 text-secondary dark:text-emerald-400 flex items-center justify-center mb-6">
                        <EyeOff className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text dark:text-white mb-4">No Personal Identity</h3>
                    <p className="text-subtext dark:text-gray-400 text-sm leading-relaxed">
                        We do not require your real name, email, or any identifying documents. Your assessment is tied to a session ID that expires once you close your browser.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border dark:border-slate-800 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/30 text-accent dark:text-orange-400 flex items-center justify-center mb-6">
                        <Database className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text dark:text-white mb-4">Ephemeral Processing</h3>
                    <p className="text-subtext dark:text-gray-400 text-sm leading-relaxed">
                        Inputs are processed in real-time. If you chose to log your score for research, it is anonymized and stored securely in an encrypted database.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border dark:border-slate-800 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-primary dark:text-indigo-400 flex items-center justify-center mb-6">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-text dark:text-white mb-4">End-to-End Control</h3>
                    <p className="text-subtext dark:text-gray-400 text-sm leading-relaxed">
                        You can clear your local check-in history at any time through your browser settings. We never sell or share your behavioral patterns with third parties.
                    </p>
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none text-subtext dark:text-gray-400">
                <h2 className="text-white">Ethical Standards</h2>
                <p>
                    Our model is trained on researchers' datasets with a focus on academic and occupational stress. We acknowledge that depression is a complex, multi-factor condition that a single quiz cannot fully capture.
                </p>
                <p>
                    If you are in immediate distress, please do not rely on this tool. Scroll to the footer of any page for international crisis contact information.
                </p>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
