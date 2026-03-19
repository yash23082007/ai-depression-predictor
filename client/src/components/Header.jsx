import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-100/50">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-5xl">
                <Link to="/" className="flex items-center space-x-2.5 text-zinc-900 group">
                    <div className="bg-sage-50 p-1.5 rounded-lg text-sage-600 group-hover:bg-sage-100 transition-colors">
                        <FaBrain className="text-xl" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">MindCare<span className="text-sage-500">.</span></h1>
                </Link>
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}>Home</Link>
                    <Link to="/assessment" className={`text-sm font-medium transition-colors ${isActive('/assessment') ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}>Assessment</Link>
                    <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}>About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
