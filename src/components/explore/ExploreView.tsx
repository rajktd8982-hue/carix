import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { 
  Compass, Search, Filter, Play, Heart, 
  MessageCircle, Tag, Store, Sparkles, User 
} from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { 
    posts, 
    products, 
    shops, 
    setActivePost, 
    setActiveProduct, 
    setActiveShop, 
    setCurrentTab 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'cars' | 'builds' | 'edits' | 'parts' | 'shops' | 'questions'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Discovery' },
    { id: 'cars', label: 'Cars & Garage' },
    { id: 'builds', label: 'Build Updates' },
    { id: 'edits', label: 'Short Edits / Reels' },
    { id: 'parts', label: 'Catalog Parts' },
    { id: 'shops', label: 'Verified Shops' },
    { id: 'questions', label: 'Build Questions' },
  ];

  const filteredPosts = posts.filter(p => {
    if (activeFilter === 'builds' && p.category !== 'build') return false;
    if (activeFilter === 'edits' && p.mediaType !== 'video' && p.category !== 'reel') return false;
    if (activeFilter === 'questions' && !p.isAskingSuggestions) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        p.carModel.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        (p.location && p.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredParts = products.filter(p => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.compatibleCars.some(c => c.toLowerCase().includes(q));
    }
    return true;
  });

  const filteredShops = shops.filter(s => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Global Automotive Discovery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Explore CARIX
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Search by builder username, car model, modification component, or city location.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user, car, part, shop, city..."
              className="w-full bg-[#131313] border border-[#262626] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {filterTabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveFilter(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === t.id
                  ? 'bg-white text-black'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-[#242424]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid Feed: Instagram / Pinterest style automotive masonry */}
        {(activeFilter === 'all' || activeFilter === 'builds' || activeFilter === 'edits' || activeFilter === 'questions') && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Community Builds & Reel Edits ({filteredPosts.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden cursor-pointer hover:border-[#383838] transition-colors group flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-black">
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.mediaType === 'video' && (
                      <div className="absolute top-2.5 left-2.5 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                        <Play className="w-3 h-3 text-[#E50914] fill-current" />
                        <span>Car Edit</span>
                      </div>
                    )}
                    {post.isAskingSuggestions && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-md p-2 rounded-lg text-[10px] text-red-300 border border-red-900/50 truncate flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#E50914] shrink-0" />
                        <span className="truncate">{post.suggestionTopic}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white truncate">@{post.username}</span>
                      <span className="text-[11px] text-neutral-500 font-mono">{post.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-300 font-medium truncate">{post.carModel}</p>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{post.caption}</p>

                    <div className="pt-2 border-t border-[#1c1c1c] flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>{post.likesCount}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.commentsCount}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Parts Section in Explore */}
        {(activeFilter === 'all' || activeFilter === 'parts') && (
          <div className="pt-8 border-t border-[#1c1c1c] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Matching Modification Components ({filteredParts.length})
              </h3>
              <button
                onClick={() => setCurrentTab('marketplace')}
                className="text-xs text-[#E50914] hover:underline"
              >
                Go to Marketplace →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredParts.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  onClick={() => setActiveProduct(p)}
                  className="p-3 bg-[#141414] border border-[#222222] rounded-xl flex items-center gap-3 cursor-pointer hover:border-[#383838] transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover border border-[#2b2b2b] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-red-400 font-mono uppercase">{p.category}</span>
                    <h4 className="text-xs font-semibold text-white truncate">{p.name}</h4>
                    <p className="text-xs font-bold text-white font-mono mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shops Section in Explore */}
        {(activeFilter === 'all' || activeFilter === 'shops') && (
          <div className="pt-8 border-t border-[#1c1c1c] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                Matching Automobile Workshops ({filteredShops.length})
              </h3>
              <button
                onClick={() => setCurrentTab('shops')}
                className="text-xs text-[#E50914] hover:underline"
              >
                Open Shop Directory →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {filteredShops.slice(0, 3).map(s => (
                <div
                  key={s.id}
                  onClick={() => setActiveShop(s)}
                  className="p-4 bg-[#141414] border border-[#222222] rounded-xl flex items-center gap-3.5 cursor-pointer hover:border-[#383838] transition-colors"
                >
                  <img src={s.logo} alt={s.name} className="w-12 h-12 rounded-xl object-cover border border-[#2b2b2b] shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{s.name}</h4>
                    <p className="text-[11px] text-neutral-400">{s.city}, {s.state}</p>
                    <span className="text-[10px] text-amber-400 font-mono">★ {s.rating} · {s.completedBuildsCount} builds</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
