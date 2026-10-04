import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Star, MapPin, Wrench, ArrowRight, MessageSquare, Phone } from 'lucide-react';

export const FeaturedShopsSection: React.FC = () => {
  const { shops, setActiveShop, openEnquiryModal, setCurrentTab } = useApp();

  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2 block">
              Workshop Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Featured Automobile Workshops & Studios
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Connect directly with verified customizers, detailing studios, and performance tuners across India.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('shops')}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto py-2"
          >
            <span>View All City Workshops</span>
            <ArrowRight className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>

        {/* Grid for Featured Shops */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shops.slice(0, 3).map((shop) => (
            <div
              key={shop.id}
              className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#383838] transition-colors"
            >
              {/* Cover Image & Logo */}
              <div 
                className="relative h-36 bg-[#1a1a1a] cursor-pointer"
                onClick={() => setActiveShop(shop)}
              >
                <img
                  src={shop.coverImage}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                
                {/* Logo Badge */}
                <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-xl bg-[#141414] border-2 border-[#2b2b2b] p-0.5 overflow-hidden shadow-md">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {shop.isVerified && (
                  <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-emerald-400 border border-emerald-900/50 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>CARIX Verified</span>
                  </div>
                )}
              </div>

              {/* Shop Body */}
              <div className="pt-6 p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 
                      onClick={() => setActiveShop(shop)}
                      className="text-sm font-bold text-white hover:text-red-400 cursor-pointer transition-colors truncate"
                    >
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-mono tabular-nums font-semibold">{shop.rating}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-[#E50914] shrink-0" />
                    <span>{shop.city}, {shop.state}</span>
                  </p>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {shop.description}
                  </p>

                  {/* Services pills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {shop.services.slice(0, 3).map((serv) => (
                      <span
                        key={serv}
                        className="px-2 py-0.5 bg-[#181818] border border-[#262626] rounded text-[10px] text-neutral-300"
                      >
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer metrics & direct contact */}
                <div className="pt-3 border-t border-[#1c1c1c] space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>{shop.completedBuildsCount} Completed Builds</span>
                    <span>{shop.reviewsCount} Enthusiast Reviews</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openEnquiryModal({ shop })}
                      className="w-full py-2 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contact Shop</span>
                    </button>

                    <button
                      onClick={() => setActiveShop(shop)}
                      className="w-full py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] text-neutral-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Builds</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
