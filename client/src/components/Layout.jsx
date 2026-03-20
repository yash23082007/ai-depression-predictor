import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;


