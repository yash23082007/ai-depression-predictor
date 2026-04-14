import React from 'react';

const Logo = ({ className }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Abstract Leaf/Eye - representing growth and perception */}
    <path 
      d="M20 5C11 15 11 25 20 35C29 25 29 15 20 5Z" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
    <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export default Logo;
