import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const PremiumButton = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    icon = null, 
    className = '',
    disabled = false,
    ...props 
}) => {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-ink-900 text-ink-50 shadow-premium hover:shadow-card-hover hover:bg-ink-800",
        outline: "bg-white text-ink-700 border border-ink-200 shadow-crisp hover:bg-ink-50 hover:border-ink-300 hover:shadow-card",
        glass: "glass-panel text-ink-900 border-white/40 hover:bg-white/90 hover:shadow-card-hover",
        sage: "bg-brand-600 text-white shadow-premium hover:bg-brand-700 hover:shadow-card-hover",
    };

    const variantStyles = variants[variant] || variants.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles} ${className}`}
            {...props}
        >
            {/* Subtle glow effect on hover */}
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <span className="relative flex items-center gap-3">
                {children}
                {icon === 'arrow' && <FaArrowRight className="text-sm transition-transform duration-500 group-hover:translate-x-1" />}
                {icon && typeof icon !== 'string' && icon}
            </span>
        </button>
    );
};

export default PremiumButton;


