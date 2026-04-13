import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/70 backdrop-blur-md sticky top-0 z-40 border-b border-border">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-3 text-text group">
                    <div className="w-10 h-10 flex items-center justify-center text-primary group-hover:text-indigo-600 transition-colors duration-500">
                        <Logo className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-heading font-semibold tracking-wide">MindCare</h1>
                </Link>
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/') ? 'bg-[#6366F1] text-white shadow-sm' : 'text-subtext hover:text-text hover:bg-indigo-50'}`}>Home</Link>
                    <Link to="/assessment" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/assessment') ? 'bg-[#6366F1] text-white shadow-sm' : 'text-subtext hover:text-text hover:bg-indigo-50'}`}>Assessment</Link>
                    <Link to="/about" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/about') ? 'bg-[#6366F1] text-white shadow-sm' : 'text-subtext hover:text-text hover:bg-indigo-50'}`}>About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;


