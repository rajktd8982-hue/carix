import React, { useState } from 'react';

interface CarVisualProps {
  src?: string;
  alt: string;
  aspect?: '16:9' | '4:3' | '1:1' | 'wide';
  className?: string;
  fallbackIcon?: 'sedan' | 'suv' | 'part' | 'shop';
  badge?: string;
}

export const CarVisual: React.FC<CarVisualProps> = ({
  src,
  alt,
  aspect = '16:9',
  className = '',
  fallbackIcon = 'sedan',
  badge
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    'wide': 'aspect-[21/9]'
  }[aspect];

  return (
    <div className={`relative overflow-hidden bg-[#121212] border border-[#222222] rounded-xl ${aspectClass} ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : null}

      {/* Styled Resilient CSS/SVG Automotive Fallback Container */}
      {(!src || hasError || !isLoaded) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#181818] via-[#111111] to-[#0a0a0a] ${isLoaded && !hasError ? 'hidden' : 'flex'}`}>
          {/* Subtle grid and accent line */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E50914_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {fallbackIcon === 'suv' ? (
              <svg className="w-14 h-14 text-neutral-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 17h16M4 17l1.5-6h13l1.5 6M7 11l2-5h6l2 5M7 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            ) : fallbackIcon === 'part' ? (
              <svg className="w-12 h-12 text-[#E50914]/80 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M5.6 18.4l4.3-4.3M14.1 9.9l4.3-4.3" />
              </svg>
            ) : fallbackIcon === 'shop' ? (
              <svg className="w-12 h-12 text-neutral-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path d="M9 22V12h6v10" />
              </svg>
            ) : (
              <svg className="w-14 h-14 text-neutral-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.2 2 11.5V16c0 .6.4 1 1 1h2m14 0a2 2 0 100 4 2 2 0 000-4zm-14 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            )}
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400 max-w-[200px] truncate">
              {alt}
            </span>
            <span className="text-[10px] text-neutral-600 mt-1">
              CARIX Engineered Media
            </span>
          </div>
        </div>
      )}

      {badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-black/85 backdrop-blur-md text-white border border-white/10 rounded-md">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};
