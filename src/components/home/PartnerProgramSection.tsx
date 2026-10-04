import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ShieldCheck, AlertCircle, ArrowRight, Store, Sparkles } from 'lucide-react';

export const PartnerProgramSection: React.FC = () => {
  const { switchUserRole, setLegalModalType } = useApp();

  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#121212] border border-[#222222] rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] block">
                Automobile Business Growth
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">
                CARIX Shop Partner Program
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Connect your garage, custom fabrication studio, or detailing shop with thousands of verified automotive enthusiasts across India. Showcase your past builds, list parts with certified fitment, and receive high-intent customer inquiries directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Business Profile & Dedicated URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Unlimited Product Catalog Uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Car Build Showcase Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Direct Customer WhatsApp Enquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Product & Workshop Tagging in Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>2–4 Editorial Spotlight Opportunities/Mo</span>
                </div>
              </div>

              {/* Crucial Verification Transparency Banner */}
              <div className="mt-4 p-3.5 bg-[#181818] border border-[#2a2a2a] rounded-xl flex items-start gap-3 text-xs text-neutral-400">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-neutral-200">Strict Trust Standard:</strong> ₹399 payment does <span className="underline">NOT</span> automatically award the Verified Badge. Shop verification is a separate, manual review process requiring address proof, GST/registration verification, and physical garage photos.
                </p>
              </div>

            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#171717] border border-[#2d2d2d] rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative">
                <div className="inline-block px-3 py-1 bg-red-950/60 border border-red-900/60 text-red-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                  Partner Subscription
                </div>

                <div>
                  <span className="text-4xl sm:text-5xl font-mono font-black text-white">
                    ₹399
                  </span>
                  <span className="text-neutral-400 text-sm ml-1 font-sans">
                    / month
                  </span>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Billed monthly · Cancel anytime without penalties
                  </p>
                </div>

                <button
                  onClick={() => switchUserRole('shop_owner')}
                  className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Access Shop Partner Portal</span>
                </button>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setLegalModalType('partner_terms')}
                    className="text-xs text-neutral-400 hover:text-white underline transition-colors"
                  >
                    Read Partner Program Terms & Rules
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
