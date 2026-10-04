import React from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { Heart, MessageCircle, Share2, Bookmark, Tag, Store, Sparkles, ArrowRight, UserPlus } from 'lucide-react';

export const TrendingBuilds: React.FC = () => {
  const { posts, toggleLikePost, toggleSavePost, setActivePost, setCurrentTab, showToast, openEnquiryModal, shops, products } = useApp();

  return (
    <section className="py-16 bg-[#090909] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Community Garage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Trending Builds & Modifications
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Explore authentic car builds across India, inspect parts used, and ask for tuning suggestions.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('community')}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto py-2"
          >
            <span>View All Community Builds</span>
            <ArrowRight className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>

        {/* 3-Column Grid for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#333333] transition-colors"
            >
              {/* Creator Header */}
              <div className="p-3.5 flex items-center justify-between border-b border-[#1c1c1c]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-8 h-8 rounded-full object-cover border border-[#2c2c2c]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">@{post.username}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{post.carModel}</p>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Following @${post.username}`)}
                  className="px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white bg-[#1c1c1c] hover:bg-neutral-800 border border-[#2d2d2d] rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Follow</span>
                </button>
              </div>

              {/* Media Visual */}
              <div 
                className="cursor-pointer overflow-hidden relative"
                onClick={() => setActivePost(post)}
              >
                <CarVisual
                  src={post.mediaUrl}
                  alt={post.carModel}
                  aspect="16:9"
                  fallbackIcon={post.carModel.includes('Thar') ? 'suv' : 'sedan'}
                />

                {post.isAskingSuggestions && (
                  <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md border border-[#E50914]/40 rounded-lg p-2 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1.5 truncate text-[11px]">
                      <Sparkles className="w-3 h-3 text-[#E50914] shrink-0" />
                      <strong className="text-red-400">Seeking Suggestions:</strong> {post.suggestionTopic}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Caption */}
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>

                {/* Tagged Parts & Workshops */}
                <div className="space-y-2 pt-1 border-t border-[#1a1a1a]">
                  {post.taggedParts.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-neutral-500 font-mono text-[10px]">PARTS:</span>
                      {post.taggedParts.map((part) => (
                        <button
                          key={part.partId}
                          onClick={() => {
                            const p = products.find(item => item.id === part.partId);
                            if (p) openEnquiryModal({ product: p });
                            else showToast(`Enquiring about ${part.partName}`);
                          }}
                          className="px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-neutral-300 hover:text-white hover:border-[#E50914] transition-colors truncate max-w-[200px]"
                        >
                          {part.partName}
                        </button>
                      ))}
                    </div>
                  )}

                  {post.taggedShops.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-neutral-500 font-mono text-[10px]">SHOP:</span>
                      {post.taggedShops.map((s) => (
                        <button
                          key={s.shopId}
                          onClick={() => {
                            const foundShop = shops.find(shop => shop.id === s.shopId);
                            if (foundShop) openEnquiryModal({ shop: foundShop });
                            else showToast(`Direct connection to ${s.shopName}`);
                          }}
                          className="px-2 py-0.5 rounded bg-[#162218] border border-[#234428] text-emerald-300 hover:text-emerald-100 transition-colors flex items-center gap-1"
                        >
                          <Store className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{s.shopName} ({s.location})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Engagement Action Bar */}
                <div className="pt-2 flex items-center justify-between border-t border-[#1a1a1a] text-neutral-400 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        post.isLiked ? 'text-[#E50914]' : 'hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-mono tabular-nums">{post.likesCount}</span>
                    </button>

                    <button
                      onClick={() => setActivePost(post)}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-mono tabular-nums">{post.commentsCount}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        showToast('Post link copied to clipboard!');
                      }}
                      className="hover:text-white transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`transition-colors ${
                      post.isSaved ? 'text-[#E50914]' : 'hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
