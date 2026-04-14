import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-transparent py-10 mt-12 border-t border-border dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-6 text-center max-w-5xl flex flex-col items-center">
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="text-subtext dark:text-slate-400 hover:text-text dark:hover:text-slate-100 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="text-subtext dark:text-slate-400 hover:text-[#0A66C2] transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="text-subtext dark:text-slate-400 hover:text-[#E1306C] transition-colors p-2 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-full">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="mailto:ktanayash@gmail.com" className="text-subtext dark:text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
                
                <div className="mb-8 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-3xl border border-border dark:border-slate-800">
                    <p className="text-xs text-subtext dark:text-slate-400 leading-relaxed italic font-medium">
                        <span className="font-bold uppercase text-accent dark:text-amber-500 mr-2">Disclaimer:</span>
                        This tool is intended for lifestyle awareness and educational purposes only. It is not a clinical medical diagnosis, professional psychiatric advice, or a substitute for expert treatment. If you are experiencing persistent distress or crisis, please consult a qualified healthcare professional or contact emergency services immediately.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-subtext dark:text-slate-500 font-medium w-full">
                    <p>&copy; {new Date().getFullYear()} Yash Vijay. All rights reserved.</p>
                    <span className="hidden md:inline text-border dark:text-slate-800">•</span>
                    <p className="flex items-center gap-1">Powered by <span className="font-semibold text-primary">MindCare AI Engine</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


