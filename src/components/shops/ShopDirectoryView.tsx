import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShopProfileModal } from './ShopProfileModal';
import { 
  Store, Search, MapPin, Star, ShieldCheck, 
  MessageSquare, ArrowRight, Phone, Filter, Compass 
} from 'lucide-react';
import { Shop } from '../../types';

export const ShopDirectoryView: React.FC = () => {
  const { shops, activeShop, setActiveShop, openEnquiryModal, showToast } = useApp();

  const [cityFilter, setCityFilter] = useState('All Cities');
  const [serviceFilter, setServiceFilter] = useState('All Specializations');
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['All Cities', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Kochi'];
  const servicesList = [
    'All Specializations',
    'Aero Body Kits',
    'Custom Paint & Wraps',
    'Performance Exhausts',
    'ECU Remaps',
    'Forged Wheels',
    'Air Suspension',
    'Offroad Armor',
    'Carbon Fiber Aero'
  ];

  const filteredShops = shops.filter(shop => {
    if (cityFilter !== 'All Cities' && shop.city !== cityFilter) return false;
    if (serviceFilter !== 'All Specializations' && !shop.services.some(s => s.toLowerCase().includes(serviceFilter.toLowerCase()))) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = shop.name.toLowerCase().includes(q);
      const matchCity = shop.city.toLowerCase().includes(q);
      const matchService = shop.services.some(s => s.toLowerCase().includes(q));
      return matchName || matchCity || matchService;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
              <Store className="w-3.5 h-3.5" />
              <span>Workshop Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Verified Automobile Shops & Garages
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Discover certified fabricators, custom body kit installers, tuners, and wrap studios across Indian cities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              {filteredShops.length} Verified Partners Listed
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-[#1a1a1a]">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garage name, service..."
              className="w-full bg-[#131313] border border-[#242424] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          {/* City Filter */}
          <div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-[#131313] border border-[#242424] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
            >
              {cities.map(c => (
                <option key={c} value={c} className="bg-[#141414]">{c}</option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full bg-[#131313] border border-[#242424] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
            >
              {servicesList.map(s => (
                <option key={s} value={s} className="bg-[#141414]">{s}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Shops Grid */}
        <div className="pt-8">
          {filteredShops.length === 0 ? (
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-16 text-center text-neutral-400 text-xs">
              <p>No automobile shops found in this city or category.</p>
              <button
                onClick={() => { setCityFilter('All Cities'); setServiceFilter('All Specializations'); setSearchQuery(''); }}
                className="mt-3 text-red-400 hover:underline"
              >
                Reset city and category filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#383838] transition-colors"
                >
                  {/* Cover */}
                  <div 
                    className="relative h-40 bg-[#1a1a1a] cursor-pointer"
                    onClick={() => setActiveShop(shop)}
                  >
                    <img
                      src={shop.coverImage}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

                    <div className="absolute -bottom-4 left-4 w-12 h-12 rounded-xl bg-[#141414] border-2 border-[#2b2b2b] p-0.5 overflow-hidden shadow-md">
                      <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                    </div>

                    {shop.isVerified && (
                      <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-emerald-400 border border-emerald-900/50 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>CARIX Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
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

                    {/* Footer */}
                    <div className="pt-3 border-t border-[#1c1c1c] space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                        <span>{shop.completedBuildsCount} Completed Builds</span>
                        <span className="text-emerald-400 font-sans">Open Now</span>
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
                          <span>Full Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {activeShop && (
          <ShopProfileModal
            shop={activeShop}
            onClose={() => setActiveShop(null)}
          />
        )}

      </div>
    </div>
  );
};
