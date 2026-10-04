import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { FounderAvatar } from '../common/FounderAvatar';
import { Instagram, Mail, ArrowRight, ShieldCheck, Heart, Sparkles, Store, Wrench, Upload } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentTab, setLegalModalType, updateFounderPhoto, founderPhoto, showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-[#090909] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Hero Lockup */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2b2b2b] text-[11px] text-neutral-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span>Founded & Launched 2026 · Mumbai, India</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
            CARIX<span className="text-[#E50914]">.</span>
          </h1>

          <p className="text-lg sm:text-xl font-bold text-white font-display tracking-wide">
            “YOUR CAR. YOUR IDENTITY.”
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Modify. Discover. Connect. The dedicated automotive social community, modification marketplace, AI build assistant, and automobile shop discovery platform.
          </p>
        </div>

        {/* Founder Narrative */}
        <div className="bg-[#121212] border border-[#242424] rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#1f1f1f]">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2 shrink-0">
              <FounderAvatar size="lg" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2f2f2f] text-[10px] text-neutral-300 hover:text-white rounded-lg flex items-center gap-1 transition-colors"
              >
                <Upload className="w-3 h-3 text-[#E50914]" />
                <span>{founderPhoto ? 'Change Photo' : 'Upload image.png'}</span>
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Leadership</span>
              <h2 className="text-xl font-bold text-white font-display">Mantra Tiwari</h2>
              <p className="text-xs text-[#E50914] font-semibold">Founder & Visionary — CARIX</p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-neutral-400">
                <a 
                  href="https://instagram.com/mantra_tiwari_999" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>@mantra_tiwari_999</span>
                </a>
                <a 
                  href="https://instagram.com/carix.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400" />
                  <span>@carix.in</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <h3 className="text-sm font-bold text-white uppercase font-display tracking-wider">
              The Founder Purpose
            </h3>

            <blockquote className="p-4 bg-[#171717] border-l-2 border-[#E50914] rounded-r-xl italic text-neutral-200">
              “CARIX was created with the idea of giving cars a separate identity on social media and creating a place where car owners can share their builds, ask for suggestions, discover modifications, find parts and connect with the shops behind those modifications.”
            </blockquote>

            <p>
              In India, car culture is experiencing an unprecedented renaissance. Enthusiasts are personalizing sedans like the Volkswagen Virtus, Skoda Slavia, and Hyundai Verna, turning Mahindra Thars into off-road conquerors, and dialing in daily track builds on Swifts and Cretas.
            </p>

            <p>
              However, traditional social media platforms fail car builders. There is no structured way to tag the exact aero lip, flow-formed alloy wheels, or valvetronic exhaust used in a build. Nor is there an easy method to find the local custom workshop that fabricated or installed it.
            </p>

            <p>
              CARIX bridges this void. We give every car its own identity card, its own build history, and link every part directly back to verified automotive workshops.
            </p>
          </div>

          <div className="pt-4 border-t border-[#1f1f1f] flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <span>Official Inquiries:</span>
            <a href="mailto:carix.modifications@gmail.com" className="text-white hover:text-red-400 font-mono transition-colors">
              carix.modifications@gmail.com
            </a>
          </div>

        </div>

        {/* The Core Product Philosophy & Loop */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] block">
              Ecosystem Loop
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              How the CARIX Community Cycles
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {[
              { step: '01', title: 'Discover A Build', desc: 'Browse real Indian car setups on the feed' },
              { step: '02', title: 'Ask Suggestions', desc: 'Get advice on spoiler, wheel, and stance options' },
              { step: '03', title: 'See Parts & Shops', desc: 'Inspect exact catalogue parts and workshop tags' },
              { step: '04', title: 'Build & Share', desc: 'Install verified parts, post results, and help others' },
            ].map(item => (
              <div key={item.step} className="p-4 bg-[#121212] border border-[#222222] rounded-2xl space-y-1">
                <span className="text-xs font-mono text-[#E50914] font-bold">{item.step}</span>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-neutral-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Safety Reminder */}
        <div className="p-5 bg-[#121212] border border-[#262626] rounded-2xl flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-neutral-400 leading-relaxed">
            <h4 className="font-semibold text-white">Commitment to Vehicle Safety & Legality</h4>
            <p>
              CARIX exists to celebrate creativity and automotive engineering within safe, road-worthy standards. Vehicle modifications should be checked for compatibility, safety, legality, and insurance implications by the vehicle owner and qualified professionals.
            </p>
            <button
              onClick={() => setLegalModalType('disclaimer')}
              className="text-red-400 hover:underline pt-1 block"
            >
              Read Full Legal Disclaimer →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
