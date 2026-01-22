import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 mb-4">&copy; 2026 Yash Vijay. All rights reserved.</p>
                <div className="flex justify-center space-x-6">
                    <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-medical-600 transition-colors text-xl">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-medical-600 transition-colors text-xl">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-medical-600 transition-colors text-xl">
                        <FaInstagram />
                    </a>
                    <a href="mailto:ktanayash@gmail.com" className="text-gray-400 hover:text-medical-600 transition-colors text-xl">
                        ✉️
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
