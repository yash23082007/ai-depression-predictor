import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-ink-50/80 backdrop-blur-lg sticky top-0 z-40 border-b border-ink-200">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-3 text-ink-900 group">
                    <div className="w-10 h-10 flex items-center justify-center text-ink-900 group-hover:text-brand-600 transition-colors duration-500">
                        <Logo className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-serif font-medium tracking-[0.15em] uppercase mt-0.5">MindCare</h1>
                </Link>
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/') ? 'bg-ink-900 text-ink-50 shadow-crisp' : 'text-ink-500 hover:text-ink-900 hover:bg-ink-100'}`}>Home</Link>
                    <Link to="/assessment" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/assessment') ? 'bg-ink-900 text-ink-50 shadow-crisp' : 'text-ink-500 hover:text-ink-900 hover:bg-ink-100'}`}>Assessment</Link>
                    <Link to="/about" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/about') ? 'bg-ink-900 text-ink-50 shadow-crisp' : 'text-ink-500 hover:text-ink-900 hover:bg-ink-100'}`}>About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;


