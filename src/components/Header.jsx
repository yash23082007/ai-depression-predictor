import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
    <div className="max-w-6xl mx-auto h-16 px-5 flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 font-heading text-xl text-forest font-bold">
        <span className="w-8 h-8 bg-forest text-white rounded-lg grid place-items-center" aria-hidden="true">M</span>
        MindCheck
      </Link>
      <nav aria-label="Primary navigation" className="flex gap-4 text-sm font-semibold text-muted">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-forest' : 'hover:text-forest'}>Home</NavLink>
        <NavLink to="/check-in" className={({ isActive }) => isActive ? 'text-forest' : 'hover:text-forest'}>Check-in</NavLink>
        <NavLink to="/my-data" className={({ isActive }) => isActive ? 'text-forest' : 'hover:text-forest'}>My data</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-forest' : 'hover:text-forest'}>Limits</NavLink>
      </nav>
    </div>
  </header>
);
export default Header;
