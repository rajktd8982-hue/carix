import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { FounderAvatar } from '../common/FounderAvatar';
import { Instagram, Mail, ArrowRight, Quote, Upload, Camera, Check } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const { setCurrentTab, updateFounderPhoto, founderPhoto, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateFounderPhoto(result);
          showToast('Actual Founder Photo (image.png) applied across CARIX!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="py-20 bg-[#090909] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-[#121212] border border-[#222222] rounded-3xl p-8 sm:p-12 shadow-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Founder Visual & Lockup */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div className="relative mb-3">
                <FounderAvatar size="xl" />
              </div>

              <button
                type="button"
                onClick={handleUploadClick}
                className="mb-3 px-3 py-1.5 rounded-lg bg-[#1c1c1c] hover:bg-[#262626] border border-[#333333] text-[11px] font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Upload className="w-3 h-3 text-[#E50914]" />
                <span>{founderPhoto ? 'Change Photo' : 'Upload image.png'}</span>
              </button>

              <h3 className="text-base font-bold text-white font-display">
                Mantra Tiwari
              </h3>
              <p className="text-xs text-[#E50914] font-medium mt-0.5">
                Founder & Visionary — CARIX
              </p>
              <p className="text-[11px] text-neutral-500 mt-1 font-mono">
                Launch Year: 2026
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 mt-3 text-xs">
                <a
                  href="https://instagram.com/mantra_tiwari_999"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#1c1c1c] text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>@mantra_tiwari_999</span>
                </a>
              </div>
            </div>

            {/* Founder Narrative */}
            <div className="md:col-span-8 space-y-4">
              <Quote className="w-8 h-8 text-[#E50914]/40" />

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
                “CARIX was created with the idea of giving cars a separate identity on social media and creating a place where car owners can share their builds, ask for suggestions, discover modifications, find parts and connect with the shops behind those modifications.”
              </p>

              <div className="pt-2 text-xs text-neutral-400 space-y-2">
                <p>
                  Every automobile enthusiast knows the hours, savings, and attention to detail that goes into perfecting a build. Yet on generic social networks, car builds get lost in algorithm clutter.
                </p>
                <p>
                  CARIX creates a dedicated home where every car has its own garage profile, every part can be tagged to the catalog, and every local automobile workshop receives genuine credit for their craftsmanship.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setCurrentTab('about')}
                  className="text-xs font-semibold text-white hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <span>Read Full Brand Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E50914]" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
