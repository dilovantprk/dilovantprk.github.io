'use client';

import React from 'react';

export const AradaPayLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
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
        {/* Stylized 'AP' (AradaPay) Interlocking Geometry */}
        <path
          d="M6 25L13 7L20 25M9 18H17"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 12C19 12 22 12 24 14C26 16 26 19 24 21C22 23 19 23 19 23V7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="8" r="2.2" fill="currentColor" />
      </svg>
    </div>
  );
};
