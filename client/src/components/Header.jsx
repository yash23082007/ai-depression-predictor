import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-stone-50/80 backdrop-blur-lg sticky top-0 z-40 border-b border-stone-200">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-2.5 text-stone-900 group">
                    <div className="bg-sage-50 p-1.5 rounded-lg text-sage-600 group-hover:bg-sage-100 transition-colors border border-sage-200">
                        <FaBrain className="text-xl" />
                    </div>
                    <h1 className="text-xl font-serif font-bold tracking-tight">MindCare<span className="text-sage-600">.</span></h1>
                </Link>
                <nav className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/') ? 'bg-stone-900 text-stone-50 shadow-crisp' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'}`}>Home</Link>
                    <Link to="/assessment" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/assessment') ? 'bg-stone-900 text-stone-50 shadow-crisp' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'}`}>Assessment</Link>
                    <Link to="/about" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive('/about') ? 'bg-stone-900 text-stone-50 shadow-crisp' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'}`}>About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
