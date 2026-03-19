import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto py-10 animate-slide-up">
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-subtle border border-zinc-100">
                <h2 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">Our Story</h2>

                <div className="space-y-8 mb-10 text-zinc-600 leading-relaxed">
                    <section className="group">
                        <h3 className="text-xl font-semibold text-zinc-900 mb-3 group-hover:text-sage-600 transition-colors">Why we built this</h3>
                        <p>
                            Mental well-being is deeply personal, yet it often goes unnoticed until we feel completely overwhelmed.
                            Our team created this space to offer a quiet, accessible way to check in with yourself. 
                            By providing a private and gentle reflection tool, we hope to encourage people to pause, 
                            understand their lifestyle habits, and realize that it's okay to ask for support. This isn't a diagnosis—just a helping hand.
                        </p>
                    </section>

                    <section className="group">
                        <h3 className="text-xl font-semibold text-zinc-900 mb-3 group-hover:text-sage-600 transition-colors">How it works</h3>
                        <p className="mb-4">
                            We believe that small, daily habits have a massive impact on how we feel. This tool was crafted using insights from studies observing thousands of everyday routines.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-zinc-500">
                            <li><strong className="text-zinc-700">Looking at the whole picture:</strong> We focus on key factors like academic and financial stress, sleep hygiene, and diet.</li>
                            <li><strong className="text-zinc-700">Finding patterns:</strong> By recognizing combinations of these habits, we can gently guide you toward finding balance.</li>
                            <li><strong className="text-zinc-700">Completely private:</strong> Your check-in responses stay entirely between you and the screen. Nothing is tied to your identity.</li>
                        </ul>
                    </section>

                    <section className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex gap-4">
                        <div className="text-amber-500 mt-0.5">⚠️</div>
                        <div>
                            <h3 className="text-sm font-semibold text-amber-900 mb-1">A gentle reminder</h3>
                            <p className="text-sm text-amber-800/80 leading-relaxed">
                                This space is for <strong>educational and self-reflection purposes only</strong>. It is not a substitute for professional medical care, therapy, or diagnosis.
                                If the weight feels like too much to carry right now, please reach out to a professional or a loved one. Support is always out there.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="border-t border-zinc-100 pt-8">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-6">Say Hello</h3>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-50 text-zinc-600 rounded-xl hover:bg-zinc-100 hover:text-zinc-900 transition-all text-sm font-medium border border-zinc-200/50">
                            <FaGithub className="text-lg" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-50 text-zinc-600 rounded-xl hover:bg-zinc-100 hover:text-[#0a66c2] transition-all text-sm font-medium border border-zinc-200/50">
                            <FaLinkedin className="text-lg" /> LinkedIn
                        </a>
                        <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-50 text-zinc-600 rounded-xl hover:bg-zinc-100 hover:text-[#e1306c] transition-all text-sm font-medium border border-zinc-200/50">
                            <FaInstagram className="text-lg" /> Instagram
                        </a>
                        <a href="mailto:ktanayash@gmail.com" className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-50 text-zinc-600 rounded-xl hover:bg-zinc-100 hover:text-red-500 transition-all text-sm font-medium border border-zinc-200/50">
                            <FaEnvelope className="text-lg" /> Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
