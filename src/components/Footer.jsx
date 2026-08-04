import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-20 border-t border-border bg-white">
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <p className="font-heading text-xl text-forest font-bold">MindCheck</p>
        <p className="text-muted mt-3 leading-relaxed">A private, local-first space for wellbeing reflection and one manageable next step.</p>
      </div>
      <div>
        <p className="font-bold text-ink">Important boundaries</p>
        <p className="text-muted mt-3 leading-relaxed">MindCheck is not diagnosis, treatment, an emergency service, or professional medical advice.</p>
      </div>
      <div>
        <p className="font-bold text-ink">Explore</p>
        <div className="mt-3 space-y-2 text-muted"><Link className="block hover:text-forest" to="/privacy">Privacy model</Link><Link className="block hover:text-forest" to="/about">Method and limits</Link><a className="block hover:text-forest" href="https://www.befrienders.org/" target="_blank" rel="noopener noreferrer">Find crisis support</a></div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-6 py-5 border-t border-border text-xs text-muted">© {new Date().getFullYear()} MindCheck. Your standard check-in answers stay in your browser.</div>
  </footer>
);
export default Footer;
