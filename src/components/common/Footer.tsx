import React from 'react';
import { useApp } from '../../context/AppContext';
import { Instagram, Mail, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab, setLegalModalType, switchUserRole } = useApp();

  return (
    <footer className="bg-[#090909] border-t border-[#1a1a1a] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pb-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#1c1c1c]">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#E50914] flex items-center justify-center font-display font-extrabold text-white text-base">
                C
              </div>
              <span className="text-xl font-display font-black tracking-wider text-white">
                CARIX<span className="text-[#E50914]">.</span>
              </span>
            </div>
            
            <p className="text-white font-medium text-sm tracking-wide">
              YOUR CAR. YOUR IDENTITY.
            </p>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              CARIX brings Indian car enthusiasts, custom fabricators, modification parts, and local automotive businesses together into one connected identity ecosystem.
            </p>

            <div className="pt-2 text-neutral-400 space-y-1">
              <p className="text-xs text-neutral-300">
                Founder & Visionary: <span className="text-white font-semibold">Mantra Tiwari</span>
              </p>
              <div className="flex items-center gap-4 text-xs pt-1">
                <a 
                  href="https://instagram.com/carix.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>@carix.in</span>
                </a>
                <a 
                  href="https://instagram.com/mantra_tiwari_999" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400" />
                  <span>@mantra_tiwari_999</span>
                </a>
              </div>
              <p className="pt-1">
                <a 
                  href="mailto:carix.modifications@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <span>carix.modifications@gmail.com</span>
                </a>
              </p>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setCurrentTab('explore')} className="hover:text-white transition-colors">
                  Trending Builds
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('marketplace')} className="hover:text-white transition-colors">
                  Modification Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('build')} className="hover:text-white transition-colors">
                  Build My Car Configurator
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('community')} className="hover:text-white transition-colors">
                  Automotive Community
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('shops')} className="hover:text-white transition-colors">
                  Verified Automobile Shops
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('aigarage')} className="hover:text-white transition-colors">
                  CARIX AI Garage
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Workshops */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Automobile Businesses
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => switchUserRole('shop_owner')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>List Your Shop</span>
                  <ArrowUpRight className="w-3 h-3 text-[#E50914]" />
                </button>
              </li>
              <li>
                <button onClick={() => switchUserRole('shop_owner')} className="hover:text-white transition-colors">
                  Shop Partner Portal
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('partner_terms')} className="hover:text-white transition-colors">
                  Partner Program (₹399/mo)
                </button>
              </li>
              <li>
                <button onClick={() => switchUserRole('admin')} className="hover:text-white transition-colors">
                  Admin Verification Desk
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors">
                  About CARIX & Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Legal & Safety
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setLegalModalType('disclaimer')} className="hover:text-white text-red-400 font-medium transition-colors">
                  Modification Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('guidelines')} className="hover:text-white transition-colors">
                  Community Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('refund')} className="hover:text-white transition-colors">
                  Refund & Cancellation
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Safety Disclaimer Banner */}
        <div className="my-8 p-4 bg-[#121212] border border-[#222222] rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-neutral-400">
            <span className="font-semibold text-neutral-200">Legal & Safety Advisory:</span> CARIX provides discovery, community and marketplace tools. Vehicle modifications should be checked for compatibility, safety, legality and insurance implications by the vehicle owner and qualified professionals. CARIX does not promote illegal street racing or unsafe chassis alterations. Always comply with Central Motor Vehicle Rules (CMVR) and local RTO regulations.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 CARIX Technologies India. All rights reserved. “YOUR CAR. YOUR IDENTITY.”</p>
          <div className="flex items-center gap-6">
            <span>Modify. Discover. Connect.</span>
            <span>·</span>
            <span>Made for Indian Car Culture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
