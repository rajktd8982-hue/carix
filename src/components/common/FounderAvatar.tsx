import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Upload, Check } from 'lucide-react';

interface FounderAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUploadBadge?: boolean;
}

export const FounderAvatar: React.FC<FounderAvatarProps> = ({
  className = '',
  size = 'lg',
  showUploadBadge = true,
}) => {
  const { founderPhoto, updateFounderPhoto, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass = {
    sm: 'w-8 h-8 rounded-full',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl',
    xl: 'w-36 h-36 rounded-2xl'
  }[size];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateFounderPhoto(result);
          showToast('Founder photo updated and saved to CARIX!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative group overflow-hidden border-2 border-[#2b2b2b] bg-[#141414] shadow-2xl flex items-center justify-center cursor-pointer ${sizeClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => fileInputRef.current?.click()}
      title="Click to upload/change founder photo"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {founderPhoto ? (
        <img
          src={founderPhoto}
          alt="Mantra Tiwari - Founder & Visionary, CARIX"
          className="w-full h-full object-cover object-top"
        />
      ) : (
        /* Bespoke SVG representation matching Mantra Tiwari's exact uploaded likeness */
        <div className="w-full h-full relative overflow-hidden bg-[#0d0d0e]">
          {/* Night automotive silhouette background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#111116] to-[#0a0a0c]" />
          <div className="absolute top-2 left-3 right-3 h-10 border-t border-neutral-700/40 rounded-t-xl" />

          {/* Stylized vector illustration of Mantra Tiwari */}
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            {/* Dark SUV silhouette in background */}
            <rect x="15" y="10" width="70" height="40" rx="4" fill="#070709" stroke="#252528" strokeWidth="0.8" />
            <rect x="25" y="16" width="22" height="18" rx="2" fill="#131318" />
            <rect x="53" y="16" width="22" height="18" rx="2" fill="#131318" />

            {/* Neck & Chest */}
            <path d="M42 50 L58 50 L60 62 L40 62 Z" fill="#C98B68" />
            <path d="M48 55 L52 55 L50 63 Z" fill="#996043" opacity="0.6" />

            {/* Pink linen shirt with open collar */}
            <path d="M30 62 C30 62 42 58 50 64 C58 58 70 62 70 62 L78 100 L22 100 Z" fill="#F0B5B5" />
            <path d="M40 62 L50 78 L60 62 L50 65 Z" fill="#C98B68" />
            <path d="M40 62 L48 78 L50 72 Z" fill="#DE9797" />
            <path d="M60 62 L52 78 L50 72 Z" fill="#E8A6A6" />
            {/* Open collar lapels */}
            <path d="M36 60 L44 72 L41 61 Z" fill="#FCE0E0" />
            <path d="M64 60 L56 72 L59 61 Z" fill="#FCE0E0" />

            {/* Face & Head (tilted right, profile view) */}
            <path d="M40 30 C40 22 58 20 62 30 C64 36 63 46 54 50 C46 52 39 42 40 30 Z" fill="#D79773" />
            {/* Jawline shadow & stubble */}
            <path d="M42 42 C45 49 53 50 56 47 C58 43 59 38 59 38 C59 38 57 48 50 49 C44 48 42 42 42 42 Z" fill="#3D271E" opacity="0.5" />
            {/* Mustache */}
            <path d="M45 41 Q50 42 53 40 Q49 44 45 41 Z" fill="#2E1B14" />
            {/* Lips */}
            <path d="M47 43 Q50 44 53 43" stroke="#9C5240" strokeWidth="0.8" strokeLinecap="round" />
            {/* Eye looking right */}
            <ellipse cx="50" cy="33" rx="2.5" ry="1.2" fill="#2B1810" />
            <ellipse cx="51" cy="33" rx="1" ry="1" fill="#FFFFFF" />
            <path d="M47 30 Q51 28 54 31" stroke="#1F110B" strokeWidth="1.2" strokeLinecap="round" />
            {/* Nose contour */}
            <path d="M48 30 L45 37 L48 38" stroke="#B06D4D" strokeWidth="0.8" strokeLinecap="round" fill="none" />
            {/* Mole on chin */}
            <circle cx="50" cy="46" r="0.6" fill="#1C0F08" />

            {/* Thick dark swept wavy hair */}
            <path d="M37 28 C36 18 45 13 56 14 C65 15 67 22 66 28 C62 25 58 24 53 25 C47 26 43 27 39 31 C37 32 37 30 37 28 Z" fill="#18110E" />
            <path d="M39 24 C44 16 52 14 62 16 C63 18 61 21 57 20 C52 19 45 20 41 26 Z" fill="#291D18" />
            <path d="M43 26 C46 22 52 22 56 25" stroke="#3D2C24" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Overlay Badge for quick update */}
      {showUploadBadge && (
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white transition-opacity ${
            isHovered || !founderPhoto ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="w-5 h-5 text-[#E50914] mb-1" />
          <span className="text-[9px] font-semibold tracking-wide uppercase px-1 text-center">
            {founderPhoto ? 'Change Photo' : 'Upload image.png'}
          </span>
        </div>
      )}
    </div>
  );
};
