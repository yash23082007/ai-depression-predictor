import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import DisclaimerBanner from './DisclaimerBanner';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-ivory text-ink selection:bg-forest/20 selection:text-forest">
            <DisclaimerBanner />
            <Header />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="py-12"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
