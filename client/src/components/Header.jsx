import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-medical-600 hover:text-medical-800 transition-colors">
                    <FaHeartbeat className="text-3xl" />
                    <h1 className="text-2xl font-bold tracking-tight">AI MindCare</h1>
                </Link>
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-600 hover:text-medical-600 font-medium transition-colors">Home</Link>
                    <Link to="/assessment" className="text-gray-600 hover:text-medical-600 font-medium transition-colors">Assessment</Link>
                    <Link to="/about" className="text-gray-600 hover:text-medical-600 font-medium transition-colors">About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
