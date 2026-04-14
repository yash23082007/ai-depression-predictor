import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-6 h-[60px] flex justify-between items-center max-w-7xl">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                        <svg className="w-5 h-5 fill-none stroke-white" strokeWidth="2" viewBox="0 0 16 16">
                            <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 7c-2 0-3.7-1-4.7-2.5C4.5 8 6.1 7 8 7s3.5 1 4.7 2.5C11.7 11 10.1 12 8 12z"/>
                        </svg>
                    </div>
                    <span className="text-xl font-heading font-bold text-forest tracking-tight">
                        MindCheck
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link 
                        to="/about" 
                        className={`text-sm font-medium transition-colors ${
                            location.pathname === '/about' ? 'text-forest' : 'text-muted hover:text-forest'
                        }`}
                    >
                        About
                    </Link>
                    <Link 
                        to="/assessment" 
                        className={`text-sm font-medium transition-colors ${
                            location.pathname === '/assessment' ? 'text-forest' : 'text-muted hover:text-forest'
                        }`}
                    >
                        Need help?
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
