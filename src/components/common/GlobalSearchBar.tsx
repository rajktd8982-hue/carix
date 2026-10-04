import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, X, Car, User as UserIcon, Store, 
  ShieldCheck, ArrowRight, Sparkles, MapPin, 
  ExternalLink, ChevronRight, Wrench, Star, Heart 
} from 'lucide-react';
import { UserCar, Shop, User } from '../../types';

interface GlobalUserItem {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  isVerified?: boolean;
}

const COMMUNITY_USERS_DIRECTORY: GlobalUserItem[] = [
  {
    id: 'user-mantra',
    username: 'mantra_tiwari_999',
    displayName: 'Mantra Tiwari',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'Founder & Visionary',
    bio: 'Founder of CARIX. Driving @midnight_virtus & @vajra_thar.',
    location: 'Mumbai, India',
    isVerified: true
  },
  {
    id: 'u-rohit',
    username: 'rohit_slavia_vrs',
    displayName: 'Rohit Sharma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    role: 'Stage 1 OEM+ Builder',
    bio: 'Track day driver & owner of @slavia_vrs_india.',
    location: 'Pune, Maharashtra',
    isVerified: true
  },
  {
    id: 'u-aarav',
    username: 'aarav_gt_tuner',
    displayName: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'Performance Tuner',
    bio: 'Polo GT TSI enthusiast & hardware dyno tester.',
    location: 'Bengaluru, Karnataka',
    isVerified: false
  },
  {
    id: 'u-vikram',
    username: 'vikram_4x4_expeditions',
    displayName: 'Vikram Singhania',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    role: 'Overland Explorer',
    bio: 'Mahindra Thar Roxx 4x4 trail conqueror. High altitude recoveries.',
    location: 'Shimla, Himachal Pradesh',
    isVerified: true
  },
  {
    id: 'u-pooja',
    username: 'pooja_stance_daily',
    displayName: 'Pooja Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'Automotive Wrap Specialist',
    bio: 'Aero, fitment and satin chrome wraps specialist.',
    location: 'Mumbai, Maharashtra',
    isVerified: true
  }
];

export const GlobalSearchBar: React.FC = () => {
  const { 
    userCars, 
    shops, 
    currentUser, 
    setActiveCarProfile, 
    setActiveShop, 
    setCurrentTab,
    showToast
  } = useApp();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'cars' | 'users' | 'shops'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time filtering logic
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { cars: [], users: [], shops: [], total: 0 };
    }

    const matchedCars = userCars.filter(car => 
      car.carName.toLowerCase().includes(q) ||
      car.carUsername.toLowerCase().includes(q) ||
      car.make.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      (car.variant && car.variant.toLowerCase().includes(q)) ||
      (car.stage && car.stage.toLowerCase().includes(q))
    );

    const matchedUsers = COMMUNITY_USERS_DIRECTORY.filter(user => 
      user.displayName.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.bio.toLowerCase().includes(q) ||
      user.location.toLowerCase().includes(q)
    );

    const matchedShops = shops.filter(shop => 
      shop.name.toLowerCase().includes(q) ||
      shop.city.toLowerCase().includes(q) ||
      shop.businessType.toLowerCase().includes(q) ||
      shop.services.some(s => s.toLowerCase().includes(q)) ||
      shop.description.toLowerCase().includes(q)
    );

    return {
      cars: matchedCars,
      users: matchedUsers,
      shops: matchedShops,
      total: matchedCars.length + matchedUsers.length + matchedShops.length
    };
  }, [query, userCars, shops]);

  const handleSelectCar = (car: UserCar) => {
    setActiveCarProfile(car);
    setIsOpen(false);
    setQuery('');
    showToast(`Viewing @${car.carUsername} car identity profile`);
  };

  const handleSelectShop = (shop: Shop) => {
    setActiveShop(shop);
    setIsOpen(false);
    setQuery('');
    showToast(`Opening ${shop.name} workshop profile`);
  };

  const handleSelectUser = (user: GlobalUserItem) => {
    if (user.id === currentUser.id) {
      setCurrentTab('profile');
    } else {
      setCurrentTab('community');
      showToast(`Viewing @${user.username} in community`);
    }
    setIsOpen(false);
    setQuery('');
  };

  const POPULAR_SUGGESTIONS = [
    { label: 'Virtus GT', type: 'car', query: 'virtus' },
    { label: '@midnight_virtus', type: 'car', query: 'midnight_virtus' },
    { label: 'Mahindra Thar', type: 'car', query: 'thar' },
    { label: 'Stealth Auto Labs', type: 'shop', query: 'stealth' },
    { label: 'Redline Performance', type: 'shop', query: 'redline' },
    { label: 'Mantra Tiwari', type: 'user', query: 'mantra' }
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Search Input Bar */}
      <div 
        className={`flex items-center bg-[#151515] border rounded-xl px-3 py-1.5 transition-all ${
          isOpen
            ? 'border-[#E50914] ring-2 ring-red-950/40 bg-[#181818]'
            : 'border-[#292929] hover:border-neutral-600'
        }`}
      >
        <Search className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-[#E50914]' : 'text-neutral-400'}`} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search cars, builders, shops..."
          className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none px-2"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono text-neutral-500 bg-[#222222] px-1.5 py-0.5 rounded border border-neutral-700 shrink-0">
            <span>⌘</span>K
          </kbd>
        )}
      </div>

      {/* Real-time Filtered Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#121212] border border-[#2b2b2b] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-150 max-h-[75vh] flex flex-col">
          
          {/* Quick Filter Categories Bar */}
          <div className="p-2 border-b border-[#202020] bg-[#161616] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#E50914] text-white font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              All {filteredResults.total > 0 && `(${filteredResults.total})`}
            </button>
            <button
              onClick={() => setActiveFilter('cars')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activeFilter === 'cars'
                  ? 'bg-[#E50914] text-white font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Cars ({filteredResults.cars.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('users')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activeFilter === 'users'
                  ? 'bg-[#E50914] text-white font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Users ({filteredResults.users.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('shops')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activeFilter === 'shops'
                  ? 'bg-[#E50914] text-white font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Shops ({filteredResults.shops.length})</span>
            </button>
          </div>

          {/* Results Container */}
          <div className="flex-1 overflow-y-auto p-2 space-y-3">
            
            {/* When Empty Query: Trending Suggestions */}
            {!query.trim() && (
              <div className="p-3 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold block flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E50914]" />
                  TRENDING AUTOMOTIVE SEARCHES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item.query);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2d2d2d] text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      {item.type === 'car' && <Car className="w-3 h-3 text-[#E50914]" />}
                      {item.type === 'shop' && <Store className="w-3 h-3 text-cyan-400" />}
                      {item.type === 'user' && <UserIcon className="w-3 h-3 text-amber-400" />}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* When Search Query Typed and No Results */}
            {query.trim() && filteredResults.total === 0 && (
              <div className="text-center py-8 text-neutral-400 space-y-1">
                <Search className="w-6 h-6 text-neutral-600 mx-auto" />
                <p className="text-xs font-semibold text-neutral-300">No matches found for "{query}"</p>
                <p className="text-[11px] text-neutral-500">
                  Try searching by car model (Virtus, Thar), builder username, or workshop name.
                </p>
              </div>
            )}

            {/* SECTION 1: MATCHING CARS */}
            {(activeFilter === 'all' || activeFilter === 'cars') && filteredResults.cars.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-2 pt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <Car className="w-3 h-3 text-[#E50914]" />
                    CARS ({filteredResults.cars.length})
                  </span>
                </div>

                {filteredResults.cars.map(car => (
                  <button
                    key={car.id}
                    onClick={() => handleSelectCar(car)}
                    className="w-full p-2 rounded-xl hover:bg-[#1a1a1a] transition-all flex items-center justify-between gap-3 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-black shrink-0 border border-neutral-800 group-hover:border-[#E50914] transition-colors">
                        <img
                          src={car.image}
                          alt={car.carName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                            {car.carName}
                          </span>
                          <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-900/60 px-1.5 py-0.2 rounded">
                            @{car.carUsername}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {car.make} {car.model} · {car.stage || `${car.year} Model`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono shrink-0">
                      <Heart className="w-3 h-3 text-[#E50914] fill-current" />
                      <span>{car.followersCount || car.likesCount}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white ml-1 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* SECTION 2: MATCHING BUILDERS & USERS */}
            {(activeFilter === 'all' || activeFilter === 'users') && filteredResults.users.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#1d1d1d]">
                <div className="flex items-center justify-between px-2 pt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <UserIcon className="w-3 h-3 text-amber-400" />
                    BUILDERS & USERS ({filteredResults.users.length})
                  </span>
                </div>

                {filteredResults.users.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="w-full p-2 rounded-xl hover:bg-[#1a1a1a] transition-all flex items-center justify-between gap-3 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                        />
                        {user.isVerified && (
                          <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-[#E50914] rounded-full text-white">
                            <ShieldCheck className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            {user.displayName}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            @{user.username}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {user.role} · <span className="text-neutral-500">{user.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-neutral-500 group-hover:text-white transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* SECTION 3: MATCHING MODIFICATION SHOPS */}
            {(activeFilter === 'all' || activeFilter === 'shops') && filteredResults.shops.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#1d1d1d]">
                <div className="flex items-center justify-between px-2 pt-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Store className="w-3 h-3 text-cyan-400" />
                    CERTIFIED MODIFICATION SHOPS ({filteredResults.shops.length})
                  </span>
                </div>

                {filteredResults.shops.map(shop => (
                  <button
                    key={shop.id}
                    onClick={() => handleSelectShop(shop)}
                    className="w-full p-2 rounded-xl hover:bg-[#1a1a1a] transition-all flex items-center justify-between gap-3 text-left group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-black shrink-0 border border-neutral-800 group-hover:border-cyan-500 transition-colors">
                        <img
                          src={shop.logo}
                          alt={shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {shop.name}
                          </span>
                          {shop.isVerified && (
                            <span className="text-[9px] font-mono bg-cyan-950/70 border border-cyan-800 text-cyan-300 px-1 py-0.2 rounded shrink-0">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {shop.city} · <span className="text-neutral-500">{shop.services.slice(0, 2).join(', ')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono shrink-0">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{shop.rating}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white ml-1 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="p-2 border-t border-[#1f1f1f] bg-[#0f0f0f] text-[10px] font-mono text-neutral-500 flex items-center justify-between px-3">
            <span>Use ↑↓ to navigate · Esc to close</span>
            <span className="text-[#E50914] font-semibold">CARIX Global Directory</span>
          </div>

        </div>
      )}
    </div>
  );
};
