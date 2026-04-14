import React from 'react';

const DisclaimerBanner = () => {
    return (
        <div className="bg-forest text-white text-center text-[0.78rem] font-medium tracking-wide py-[10px] px-6 flex items-center justify-center gap-[10px]" role="alert">
            <svg className="flex-shrink-0 w-4 h-4 opacity-85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>
                This tool is for informational purposes only and is <strong>not a substitute for professional medical advice.</strong>
                {' '}
                <a href="https://www.nimh.nih.gov/health/topics/depression" target="_blank" rel="noopener noreferrer" className="text-[#A8D5B5] underline underline-offset-2">
                    Learn more
                </a>
            </span>
        </div>
    );
};

export default DisclaimerBanner;
