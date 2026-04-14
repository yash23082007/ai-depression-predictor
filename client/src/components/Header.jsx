import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 border-b border-border dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-3 text-text dark:text-slate-100 group">
                    <div className="w-10 h-10 flex items-center justify-center text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500">
                        <Logo className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-heading font-semibold tracking-wide">MindCare</h1>
                </Link>
                <div className="flex items-center space-x-6">
                    <nav className="hidden md:flex space-x-2 items-center">
                        <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/') ? 'bg-primary text-white shadow-sm' : 'text-subtext dark:text-slate-400 hover:text-text dark:hover:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-900'}`}>Home</Link>
                        <Link to="/assessment" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/assessment') ? 'bg-primary text-white shadow-sm' : 'text-subtext dark:text-slate-400 hover:text-text dark:hover:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-900'}`}>Assessment</Link>
                        <Link to="/about" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/about') ? 'bg-primary text-white shadow-sm' : 'text-subtext dark:text-slate-400 hover:text-text dark:hover:text-slate-100 hover:bg-indigo-50 dark:hover:bg-slate-900'}`}>About</Link>
                    </nav>
                    <div className="h-6 w-px bg-border dark:bg-slate-800 hidden md:block" />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;


