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
                <nav className="hidden md:flex space-x-10 items-center">
                    <Link to="/" className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/') ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 opacity-80 hover:opacity-100'}`}>Home</Link>
                    <Link to="/assessment" className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/assessment') ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 opacity-80 hover:opacity-100'}`}>Assessment</Link>
                    <Link to="/about" className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isActive('/about') ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 opacity-80 hover:opacity-100'}`}>About</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
