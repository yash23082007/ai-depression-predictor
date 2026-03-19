import React, { useRef } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const About = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(containerRef.current.querySelector('h2'),
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(contentRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-12 px-4 min-h-[85vh] flex flex-col justify-center">
            <div className="premium-card p-8 sm:p-14 bg-white mt-10">
                <h2 className="text-4xl font-serif font-medium text-stone-900 mb-10 tracking-tight text-center">
                    Our Story
                </h2>

                <div ref={contentRef} className="space-y-8 mb-16 text-stone-600 leading-relaxed font-medium">
                    <section className="group p-8 bg-stone-50 border border-stone-100 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-crisp">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-sage-500"></div>
                            <h3 className="text-lg font-semibold text-stone-900 tracking-wide uppercase text-sm">Why we built this</h3>
                        </div>
                        <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                            Mental well-being is deeply personal, yet it often goes unnoticed until we feel completely overwhelmed.
                            Our team created this space to offer a quiet, accessible way to check in with yourself. 
                            By providing a private and gentle reflection tool, we hope to encourage people to pause, 
                            understand their lifestyle habits, and realize that it's okay to ask for support. This isn't a diagnosis—just a helping hand.
                        </p>
                    </section>

                    <section className="group p-8 bg-stone-50 border border-stone-100 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-crisp">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <h3 className="text-lg font-semibold text-stone-900 tracking-wide uppercase text-sm">How it works</h3>
                        </div>
                        <p className="mb-4 text-stone-500 text-sm md:text-base leading-relaxed">
                            We believe that small, daily habits have a massive impact on how we feel. This tool was crafted using insights from studies observing thousands of everyday routines.
                        </p>
                        <ul className="list-disc pl-5 space-y-3 text-stone-500 text-sm md:text-base">
                            <li><strong className="text-stone-800">Looking at the whole picture:</strong> We focus on key factors like academic and financial stress, sleep hygiene, and diet.</li>
                            <li><strong className="text-stone-800">Finding patterns:</strong> By recognizing combinations of these habits, we gently guide you toward finding balance.</li>
                            <li><strong className="text-stone-800">Completely private:</strong> Your check-in responses stay entirely between you and the screen. Nothing is tied to your identity.</li>
                        </ul>
                    </section>

                    <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex gap-5 shadow-crisp">
                        <div className="text-amber-500 mt-0.5 text-xl">⚠️</div>
                        <div>
                            <h3 className="text-sm font-bold text-amber-900 mb-1.5 tracking-widest uppercase">A gentle reminder</h3>
                            <p className="text-sm text-amber-800/90 leading-relaxed font-medium">
                                This space is for <strong>educational and self-reflection purposes only</strong>. It is not a substitute for professional medical care, therapy, or diagnosis.
                                If the weight feels like too much to carry right now, please reach out to a professional or a loved one. Support is always out there.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="border-t border-stone-200 pt-10">
                    <h3 className="text-xs font-bold text-stone-400 mb-6 tracking-widest uppercase text-center">Say Hello</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-900 hover:text-white transition-all shadow-sm border border-stone-200 hover:-translate-y-1">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-stone-100 text-stone-600 rounded-xl hover:bg-[#0a66c2] hover:text-white transition-all shadow-sm border border-stone-200 hover:-translate-y-1">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-stone-100 text-stone-600 rounded-xl hover:bg-[#e1306c] hover:text-white transition-all shadow-sm border border-stone-200 hover:-translate-y-1">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="mailto:ktanayash@gmail.com" className="flex items-center justify-center w-12 h-12 bg-stone-100 text-stone-600 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-stone-200 hover:-translate-y-1">
                            <FaEnvelope className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
