import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-transparent py-10 mt-12 border-t border-border">
            <div className="container mx-auto px-6 text-center max-w-5xl flex flex-col items-center">
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="text-subtext hover:text-text transition-colors p-2 hover:bg-gray-100 rounded-full">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="text-subtext hover:text-[#0A66C2] transition-colors p-2 hover:bg-blue-50 rounded-full">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="text-subtext hover:text-[#E1306C] transition-colors p-2 hover:bg-pink-50 rounded-full">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="mailto:ktanayash@gmail.com" className="text-subtext hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-subtext font-medium w-full">
                    <p>&copy; {new Date().getFullYear()} Yash Vijay. All rights reserved.</p>
                    <span className="hidden md:inline text-border">•</span>
                    <p className="flex items-center gap-1">Powered by <span className="font-semibold text-primary">MindCare AI Engine</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


