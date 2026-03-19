import React from 'react';

const Logo = ({ className }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Interlocking Rings - representing balance, self, and reflection */}
    <circle cx="20" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="1" />
    <circle cx="15" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="25" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
  </svg>
);

export default Logo;
