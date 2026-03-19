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
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(contentRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
            "-=0.4"
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-12 px-4 min-h-[85vh] flex flex-col justify-center">
            <div className="glass-panel p-8 sm:p-14">
                <h2 className="text-4xl font-extrabold text-zinc-900 mb-10 tracking-tight text-center drop-shadow-sm">Our Story</h2>

                <div ref={contentRef} className="space-y-10 mb-12 text-zinc-600 leading-relaxed font-medium">
                    <section className="group p-6 bg-white/40 border border-white/60 rounded-2xl shadow-subtle transition-all hover:-translate-y-1 hover:shadow-md">
                        <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-sage-600 transition-colors tracking-wide">Why we built this</h3>
                        <p className="text-zinc-600">
                            Mental well-being is deeply personal, yet it often goes unnoticed until we feel completely overwhelmed.
                            Our team created this space to offer a quiet, accessible way to check in with yourself. 
                            By providing a private and gentle reflection tool, we hope to encourage people to pause, 
                            understand their lifestyle habits, and realize that it's okay to ask for support. This isn't a diagnosis—just a helping hand.
                        </p>
                    </section>

                    <section className="group p-6 bg-white/40 border border-white/60 rounded-2xl shadow-subtle transition-all hover:-translate-y-1 hover:shadow-md">
                        <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-sage-600 transition-colors tracking-wide">How it works</h3>
                        <p className="mb-4 text-zinc-600">
                            We believe that small, daily habits have a massive impact on how we feel. This tool was crafted using insights from studies observing thousands of everyday routines.
                        </p>
                        <ul className="list-disc pl-5 space-y-3 text-zinc-500 font-medium">
                            <li><strong className="text-zinc-800">Looking at the whole picture:</strong> We focus on key factors like academic and financial stress, sleep hygiene, and diet.</li>
                            <li><strong className="text-zinc-800">Finding patterns:</strong> By recognizing combinations of these habits, we gently guide you toward finding balance.</li>
                            <li><strong className="text-zinc-800">Completely private:</strong> Your check-in responses stay entirely between you and the screen. Nothing is tied to your identity.</li>
                        </ul>
                    </section>

                    <section className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200/60 flex gap-5 shadow-sm">
                        <div className="text-amber-500 mt-0.5 text-2xl">⚠️</div>
                        <div>
                            <h3 className="text-base font-bold text-amber-900 mb-2 tracking-wide">A gentle reminder</h3>
                            <p className="text-sm text-amber-800/90 leading-relaxed font-medium">
                                This space is for <strong>educational and self-reflection purposes only</strong>. It is not a substitute for professional medical care, therapy, or diagnosis.
                                If the weight feels like too much to carry right now, please reach out to a professional or a loved one. Support is always out there.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="border-t border-zinc-200/80 pt-10">
                    <h3 className="text-xl font-bold text-zinc-900 mb-6 tracking-wide text-center">Say Hello</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://github.com/yash23082007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3.5 bg-white/50 text-zinc-700 rounded-xl hover:bg-white hover:text-zinc-900 transition-all text-sm font-bold border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <FaGithub className="text-xl" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/yash-vijay-b0a75937a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3.5 bg-white/50 text-zinc-700 rounded-xl hover:bg-white hover:text-[#0a66c2] transition-all text-sm font-bold border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <FaLinkedin className="text-xl" /> LinkedIn
                        </a>
                        <a href="https://www.instagram.com/yash_vj23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3.5 bg-white/50 text-zinc-700 rounded-xl hover:bg-white hover:text-[#e1306c] transition-all text-sm font-bold border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <FaInstagram className="text-xl" /> Instagram
                        </a>
                        <a href="mailto:ktanayash@gmail.com" className="flex items-center gap-3 px-6 py-3.5 bg-white/50 text-zinc-700 rounded-xl hover:bg-white hover:text-red-500 transition-all text-sm font-bold border border-white shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <FaEnvelope className="text-xl" /> Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
