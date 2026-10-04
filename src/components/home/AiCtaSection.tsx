import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const AiCtaSection: React.FC = () => {
  const { setCurrentTab } = useApp();

  return (
    <section className="py-16 bg-[#090909] border-b border-[#1c1c1c] relative overflow-hidden">
      
      {/* Red ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#E50914]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#141414] via-[#161616] to-[#121212] border border-[#2a2a2a] rounded-3xl p-8 sm:p-12 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201515] border border-[#441c1c] text-xs font-semibold text-red-400">
                <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Next-Gen Automotive Intelligence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight uppercase leading-tight">
                Not sure what to do with your car?
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
                Enter your exact vehicle model, budget in Rupees, and aesthetic goal (OEM+, Clean, Sporty, Overland, or Aggressive). CARIX AI generates a structured modification blueprint with price estimates, installer questions, and CMVR legal notes.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Indian RTO & MV Act safety aware
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#E50914]" />
                  Engineered with Google Gemini AI
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => setCurrentTab('aigarage')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E50914] hover:bg-[#c90812] text-white text-base font-display font-bold tracking-wide transition-all shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Ask CARIX AI</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
