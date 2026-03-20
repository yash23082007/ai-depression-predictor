import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-transparent py-10 mt-12">
            <div className="container mx-auto px-6 text-center max-w-5xl">
                <div className="flex justify-center space-x-8 mb-6">
                    <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-ink-900 transition-colors text-xl hover:-translate-y-0.5 transform">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-[#0a66c2] transition-colors text-xl hover:-translate-y-0.5 transform">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="text-ink-400 hover:text-[#e1306c] transition-colors text-xl hover:-translate-y-0.5 transform">
                        <FaInstagram />
                    </a>
                    <a href="mailto:ktanayash@gmail.com" className="text-ink-400 hover:text-red-500 transition-colors text-xl hover:-translate-y-0.5 transform">
                        <FaEnvelope />
                    </a>
                </div>
                <p className="text-ink-400 text-sm font-medium tracking-wide">&copy; {new Date().getFullYear()} Yash Vijay. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;


