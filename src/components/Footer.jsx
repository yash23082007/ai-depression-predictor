import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-24 pb-12 pt-16 border-t border-border bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div>
                        <Link to="/" className="flex items-center gap-2 group mb-6">
                            <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                                <svg className="w-5 h-5 fill-none stroke-white" strokeWidth="2" viewBox="0 0 16 16">
                                    <path d="M8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 7c-2 0-3.7-1-4.7-2.5C4.5 8 6.1 7 8 7s3.5 1 4.7 2.5C11.7 11 10.1 12 8 12z"/>
                                </svg>
                            </div>
                            <span className="text-xl font-heading font-bold text-forest tracking-tight">
                                MindCheck
                            </span>
                        </Link>
                        <p className="text-muted max-w-md leading-relaxed mb-6 font-medium text-[0.9rem]">
                            A quietly sophisticated space for intentional reflection, leveraging explainable AI to foster mental resilience.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-ink mb-6 uppercase tracking-[0.08em] text-[0.75rem]">Resources</h4>
                        <ul className="space-y-4 text-[0.85rem] font-medium text-muted">
                            <li><a href="https://www.who.int/health-topics/depression" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors">WHO Wellbeing Guide</a></li>
                            <li><a href="https://www.nimh.nih.gov/health/topics/depression" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors">NIMH Resources</a></li>
                            <li><a href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors">International Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-ink mb-6 uppercase tracking-[0.08em] text-[0.75rem]">Platform</h4>
                        <ul className="space-y-4 text-[0.85rem] font-medium text-muted">
                            <li><Link to="/" className="hover:text-forest transition-colors">Home</Link></li>
                            <li><Link to="/assessment" className="hover:text-forest transition-colors">Assessment</Link></li>
                            <li><Link to="/privacy" className="hover:text-forest transition-colors">Privacy & Ethics</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 bg-ivory rounded-2xl border border-border mb-12">
                    <p className="text-[0.75rem] text-muted leading-relaxed italic font-medium">
                        <span className="font-bold uppercase text-forest mr-2">Clinically Responsible:</span>
                        This tool is intended for lifestyle awareness only. It is not a clinical medical diagnosis or professional psychiatric advice. If you are experiencing persistent distress, please consult a qualified healthcare professional.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border text-[0.8rem] text-muted font-medium">
                    <p>&copy; {new Date().getFullYear()} MindCheck. All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Designed with intentionality for <span className="text-forest font-bold">Mental Well-being</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
