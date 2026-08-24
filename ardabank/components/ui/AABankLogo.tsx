'use client';

import React from 'react';

export const AABankLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md',
  className = '' 
}) => {
  const dimensions = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-12 h-12' : 'w-9 h-9';
  const svgSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div 
      className={`${dimensions} rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 border border-white/25 shrink-0 transition-transform apple-press ${className}`}
    >
      <svg
        className={`${svgSize} text-black font-extrabold`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Interlocking Double 'A' Monogram with Fintech Growth Arrow */}
        <path
          d="M6 24L12 8L18 24M8.5 18H15.5"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 24L21 11L26 24M18 19H24"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <circle cx="25" cy="8" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
};
