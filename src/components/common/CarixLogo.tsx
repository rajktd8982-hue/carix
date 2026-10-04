import React from 'react';

interface CarixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'white';
}

export const CarixLogo: React.FC<CarixLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark' // in dark mode, 'dark' renders white CAR + red IX
}) => {
  const heightClass = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12',
    xl: 'h-16'
  }[size];

  // In dark theme: CAR is white, IX is electric CARIX Red (#E50914)
  const carColor = variant === 'light' ? '#090909' : '#FFFFFF';
  const redColor = '#E50914';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        className={`${heightClass} w-auto`}
        viewBox="0 0 460 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === 'C' === */}
        <path
          d="M102 36.5C96 23.5 83 14 62 14C30 14 10 33 10 60C10 87 30 106 62 106C83 106 96 96.5 102 83.5H74C69.5 89 61 92 50 92C32 92 24 79 24 60C24 41 32 28 50 28C61 28 69.5 31 74 36.5H102Z"
          fill={carColor}
        />

        {/* === 'A' === */}
        <path
          d="M136 106H114L152 14H182L220 106H198L190 84H144L136 106ZM151 66H183L167 28L151 66Z"
          fill={carColor}
        />

        {/* === 'R' === */}
        <path
          d="M228 14H280C299 14 314 24 314 43C314 56.5 304.5 66.5 291 70L317 106H292L269 74H250V106H228V14ZM250 30V58H277C286 58 292 53 292 44C292 35 286 30 277 30H250Z"
          fill={carColor}
        />

        {/* Negative space speed slit on 'R' */}
        <path
          d="M250 48H295"
          stroke="#090909"
          strokeWidth="3.5"
        />

        {/* === 'I' in CARIX Red === */}
        <path
          d="M328 14H348V106H328V14Z"
          fill={redColor}
        />

        {/* === 'X' in CARIX Red === */}
        <path
          d="M360 14H384L409 56L434 14H458L422 66L460 106H435L409 76L383 106H358L396 66L360 14Z"
          fill={redColor}
        />
      </svg>
    </div>
  );
};
