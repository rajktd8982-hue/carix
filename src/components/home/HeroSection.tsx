import React from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { ArrowRight, Sparkles, Wrench, ShieldCheck, Flame, Tag, Store } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCurrentTab, setActivePost, posts } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#090909] via-[#0e0e0e] to-[#090909] pt-8 pb-16 border-b border-[#1c1c1c]">
      
      {/* Subtle atmospheric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#E50914]/8 blur-[140px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#2b2b2b] text-[11px] text-neutral-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span>Launch 2026 · India’s Automotive Identity Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
              YOUR CAR.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#E50914]">
                YOUR IDENTITY.
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-neutral-300">
              Discover. Modify. Share. Connect.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
              CARIX brings car enthusiasts, modification parts, custom builds and automobile businesses together in one connected automotive platform. Build your garage, find verified parts, and tag local workshops.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('explore')}
                className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-red-600/20 flex items-center gap-2 active:scale-98"
              >
                <span>Explore Builds</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('build')}
                className="px-6 py-3 rounded-xl bg-[#1a1a1a] hover:bg-[#242424] text-white border border-[#333333] text-sm font-semibold tracking-wide transition-all flex items-center gap-2 active:scale-98"
              >
                <Wrench className="w-4 h-4 text-neutral-400" />
                <span>Build Your Car</span>
              </button>

              <button
                onClick={() => setCurrentTab('aigarage')}
                className="px-4 py-3 rounded-xl text-neutral-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#E50914]" />
                <span>Ask CARIX AI</span>
              </button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 border-t border-[#1c1c1c] flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <div>
                <span className="block text-base font-bold text-white font-mono tabular-nums">500+</span>
                <span className="text-[11px] text-neutral-500">Indian Car Builds</span>
              </div>
              <div className="w-px h-7 bg-neutral-800" />
              <div>
                <span className="block text-base font-bold text-white font-mono tabular-nums">100%</span>
                <span className="text-[11px] text-neutral-500">Verified Workshop Network</span>
              </div>
              <div className="w-px h-7 bg-neutral-800" />
              <div>
                <span className="block text-base font-bold text-white font-mono tabular-nums">₹0</span>
                <span className="text-[11px] text-neutral-500">Free Enthusiast Profiles</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual - Realistic Modified Indian Car Build */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-[#141414] border border-[#242424] p-3 shadow-2xl overflow-hidden group">
              
              <CarVisual
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
                alt="Modified Volkswagen Virtus GT 1.5 TSI on 17-inch flow formed wheels"
                aspect="16:9"
                badge="Build of the Week"
              />

              {/* Interactive Tagged Overlay Elements */}
              <div className="mt-4 p-3 bg-[#0d0d0d] rounded-xl border border-[#1f1f1f] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400">Featured Identity</span>
                    <h3 className="text-sm font-bold text-white">“Midnight” — Volkswagen Virtus GT</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-red-950/60 border border-red-900/50 text-red-300 rounded-md font-medium">
                    Stage 2 Exterior
                  </span>
                </div>

                {/* Mod and Shop Tag Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg text-xs text-neutral-200">
                    <Tag className="w-3 h-3 text-[#E50914]" />
                    <span>3-Piece Aero Front Splitter</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg text-xs text-neutral-200">
                    <Tag className="w-3 h-3 text-[#E50914]" />
                    <span>17" Flow-Formed Alloys</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg text-xs text-neutral-200">
                    <Store className="w-3 h-3 text-emerald-400" />
                    <span>Fitted by Stealth Auto Labs, Mumbai</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-[#1a1a1a]">
                  <span className="flex items-center gap-1">
                    Owner: <strong className="text-neutral-200">@mantra_tiwari_999</strong>
                  </span>
                  <button
                    onClick={() => setActivePost(posts[0])}
                    className="text-xs text-[#E50914] hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View Build Story</span>
                    <ArrowRight className="w-3 h-3" />
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
