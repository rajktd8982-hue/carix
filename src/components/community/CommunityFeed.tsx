import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { 
  Heart, MessageCircle, Share2, Bookmark, Tag, Store, 
  Sparkles, Plus, Filter, Search, UserPlus, Play,
  ShieldCheck, Flag, CheckCircle2, Camera, Car, Eye, ChevronDown, ChevronUp,
  Disc, Music, Film
} from 'lucide-react';
import { CommunityPost } from '../../types';

export const CommunityFeed: React.FC = () => {
  const { 
    posts, 
    stories,
    setActiveStory,
    toggleLikePost, 
    toggleSavePost, 
    setActivePost, 
    setIsCreatePostOpen, 
    openReportModal,
    showToast,
    openEnquiryModal,
    shops,
    products,
    currentUser
  } = useApp();

  const [activeFeedTab, setActiveFeedTab] = useState<'all' | 'builds' | 'edits' | 'questions'>('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [expandedProofPostId, setExpandedProofPostId] = useState<string | null>(null);

  const filteredPosts = posts.filter(p => {
    if (activeFeedTab === 'builds' && p.category !== 'build' && p.category !== 'showcase') return false;
    if (activeFeedTab === 'edits' && p.mediaType !== 'video' && p.category !== 'reel') return false;
    if (activeFeedTab === 'questions' && !p.isAskingSuggestions && p.category !== 'question') return false;
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      return (
        p.carModel.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Feed Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CARIX Automotive Community</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Identity Feed
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Follow builds, see parts tagged to authentic cars, and give modification suggestions.
            </p>
          </div>

          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Car Post</span>
          </button>
        </div>

        {/* 24-Hour Stories Bar (Requested: "story v laga sakta ha") */}
        <div className="py-4 border-b border-[#1c1c1c] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4 min-w-max">
            {/* Create Story Button */}
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full p-[2px] border-2 border-dashed border-[#E50914] group-hover:scale-105 transition-transform flex items-center justify-center">
                <img
                  src={currentUser.avatar}
                  alt="Your Story"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#E50914] rounded-full border-2 border-[#090909] flex items-center justify-center text-white">
                  <Plus className="w-3 h-3" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-neutral-300 group-hover:text-white">Your Story</span>
            </button>

            {/* Active Community Stories */}
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[#E50914] via-orange-500 to-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center shadow-md">
                  <div className="w-full h-full rounded-full p-0.5 bg-[#090909]">
                    <img
                      src={story.authorAvatar}
                      alt={story.authorUsername}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center max-w-[70px]">
                  <span className="text-[11px] font-semibold text-white truncate block">
                    @{story.carUsername || story.authorUsername}
                  </span>
                  {story.isDriveExperience && (
                    <span className="text-[9px] font-mono text-emerald-400 block -mt-0.5">Driven ✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Feed Controls */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 bg-[#141414] p-1 border border-[#222222] rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveFeedTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFeedTab === 'all'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setActiveFeedTab('builds')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFeedTab === 'builds'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Build Updates
            </button>
            <button
              onClick={() => setActiveFeedTab('edits')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFeedTab === 'edits'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Short Videos / Edits
            </button>
            <button
              onClick={() => setActiveFeedTab('questions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFeedTab === 'questions'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Suggestions Needed
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by car or tag..."
              className="w-full bg-[#141414] border border-[#242424] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

        </div>

        {/* Posts Stack */}
        <div className="space-y-6 pt-2">
          {filteredPosts.length === 0 ? (
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-12 text-center text-neutral-400 text-xs">
              <p>No community posts match the current filter.</p>
              <button
                onClick={() => { setFilterQuery(''); setActiveFeedTab('all'); }}
                className="mt-3 text-red-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg transition-colors hover:border-[#303030]"
              >
                {/* Verified Drive Experience Banner (Requested: app verifies driving seat POV and car photo before allowing mention) */}
                {post.isDriveExperienceVerified && (
                  <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-900/50 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-emerald-300">
                          Verified Driver Experience
                        </span>
                        <span className="text-neutral-300 text-[11px] ml-1.5 font-mono">
                          Behind-the-wheel of <strong className="text-white">{post.mentionedCarHandle}</strong>
                        </span>
                        {post.drivingVerdict && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-900/40 border border-emerald-800 px-1.5 py-0.5 rounded ml-2">
                            {post.drivingVerdict}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedProofPostId(expandedProofPostId === post.id ? null : post.id)}
                      className="px-2 py-0.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-neutral-700 text-[10px] font-mono text-neutral-300 flex items-center gap-1 transition-colors shrink-0"
                    >
                      <span>Cockpit Proof</span>
                      {expandedProofPostId === post.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                )}

                {/* Expandable Cockpit & Exterior Proof Drawer */}
                {post.isDriveExperienceVerified && expandedProofPostId === post.id && (
                  <div className="p-3 bg-[#0d0d0d] border-b border-[#222222] space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span className="text-emerald-400 font-bold">CARIX Driver Verification Proof:</span>
                      <span>Verified Driver: @{post.username}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {post.driverSeatProofUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-emerald-900/60 bg-black aspect-video">
                          <img src={post.driverSeatProofUrl} alt="Driver POV" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-black/80 backdrop-blur-xs text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Driver Seat Cockpit POV
                          </span>
                        </div>
                      )}
                      {post.carPhotoProofUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-emerald-900/60 bg-black aspect-video">
                          <img src={post.carPhotoProofUrl} alt="Car Match" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-black/80 backdrop-blur-xs text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Vehicle Match Proof
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Post Creator Header */}
                <div className="p-4 flex items-center justify-between border-b border-[#1c1c1c]">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="w-10 h-10 rounded-full object-cover border border-[#2c2c2c]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">@{post.username}</span>
                        {post.location && (
                          <>
                            <span className="text-neutral-600 text-xs">·</span>
                            <span className="text-[11px] text-neutral-500 truncate">{post.location}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 font-medium truncate mt-0.5">
                        {post.carModel} {post.carName ? `• “${post.carName}”` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-500 font-mono">{post.timestamp}</span>
                    <button
                      onClick={() => showToast(`Following @${post.username}`)}
                      className="px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] rounded-lg transition-colors"
                    >
                      Follow
                    </button>
                    <button
                      onClick={() => openReportModal({
                        targetType: 'post',
                        targetId: post.id,
                        targetUsername: post.username,
                        targetTitle: post.caption
                      })}
                      className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                      title="Report Post"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Media Container */}
                <div 
                  className="cursor-pointer relative overflow-hidden bg-black"
                  onClick={() => setActivePost(post)}
                >
                  <CarVisual
                    src={post.mediaUrl}
                    alt={post.carModel}
                    aspect="16:9"
                    fallbackIcon={post.carModel.includes('Thar') ? 'suv' : 'sedan'}
                  />

                  {post.mediaType === 'video' && (
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1.5 shadow-md">
                      <Film className="w-3 h-3 text-[#E50914]" />
                      <span>Car Reel / Short Video</span>
                    </div>
                  )}

                  {/* Song Audio Tag Overlay (Requested: "song wala option bhi hona chahiye") */}
                  {post.audioTitle && (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] text-white flex items-center gap-2 shadow-lg">
                      <Disc className="w-3.5 h-3.5 text-[#E50914] animate-spin [animation-duration:3s]" />
                      <span className="truncate max-w-[130px] font-medium">{post.audioTitle}</span>
                      <div className="flex items-center gap-0.5">
                        <span className="w-0.5 h-2 bg-[#E50914] animate-pulse rounded-full" />
                        <span className="w-0.5 h-3 bg-amber-400 animate-pulse rounded-full delay-75" />
                        <span className="w-0.5 h-1.5 bg-red-400 animate-pulse rounded-full delay-150" />
                      </div>
                    </div>
                  )}

                  {/* Suggestion Seeking Banner */}
                  {post.isAskingSuggestions && (
                    <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md border border-[#E50914]/50 rounded-xl p-3 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Sparkles className="w-4 h-4 text-[#E50914] shrink-0" />
                        <div className="truncate">
                          <span className="text-red-400 font-semibold block text-[10px] uppercase tracking-wider">
                            Community Feedback Request
                          </span>
                          <span className="text-xs font-medium text-white truncate">
                            {post.suggestionTopic}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-neutral-400 shrink-0 underline">
                        Give Suggestion
                      </span>
                    </div>
                  )}
                </div>

                {/* Content & Tagged Metadata */}
                <div className="p-4 sm:p-5 space-y-4">
                  
                  {/* Caption */}
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
                    {post.caption}
                  </p>

                  {/* Tagged Parts & Workshop Links (Social Shop Tagging) */}
                  {(post.taggedParts.length > 0 || post.taggedShops.length > 0) && (
                    <div className="p-3.5 bg-[#171717] border border-[#242424] rounded-xl space-y-2.5">
                      {post.taggedParts.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-neutral-500 font-mono text-[10px] uppercase">Parts Used:</span>
                          {post.taggedParts.map((part) => (
                            <button
                              key={part.partId}
                              onClick={() => {
                                const found = products.find(p => p.id === part.partId);
                                if (found) openEnquiryModal({ product: found });
                                else showToast(`Inquiry for ${part.partName}`);
                              }}
                              className="px-2.5 py-1 rounded-md bg-[#202020] border border-[#333333] text-neutral-200 hover:text-white hover:border-[#E50914] transition-colors flex items-center gap-1.5"
                            >
                              <Tag className="w-3 h-3 text-[#E50914]" />
                              <span>{part.partName}</span>
                              {part.price && <span className="text-neutral-400 font-mono">(₹{part.price.toLocaleString('en-IN')})</span>}
                            </button>
                          ))}
                        </div>
                      )}

                      {post.taggedShops.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-neutral-500 font-mono text-[10px] uppercase">Purchased From:</span>
                          {post.taggedShops.map((s) => (
                            <button
                              key={s.shopId}
                              onClick={() => {
                                const found = shops.find(sh => sh.id === s.shopId);
                                if (found) openEnquiryModal({ shop: found });
                                else showToast(`Connecting to ${s.shopName}`);
                              }}
                              className="px-2.5 py-1 rounded-md bg-[#162419] border border-[#234529] text-emerald-300 hover:text-emerald-100 transition-colors flex items-center gap-1.5"
                            >
                              <Store className="w-3 h-3 text-emerald-400" />
                              <span>{s.shopName} · {s.location}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Engagement Bar */}
                  <div className="pt-3 border-t border-[#1c1c1c] flex items-center justify-between text-neutral-400 text-xs">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          post.isLiked ? 'text-[#E50914]' : 'hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="font-mono tabular-nums">{post.likesCount}</span>
                      </button>

                      <button
                        onClick={() => setActivePost(post)}
                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-mono tabular-nums">{post.commentsCount} comments</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          showToast('Post link copied to clipboard!');
                        }}
                        className="hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`transition-colors p-1 ${
                        post.isSaved ? 'text-[#E50914]' : 'hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Inline Quick Suggestion / Comment trigger */}
                  <div 
                    onClick={() => setActivePost(post)}
                    className="p-2.5 bg-[#171717] hover:bg-[#1c1c1c] rounded-xl border border-[#242424] text-xs text-neutral-500 cursor-pointer flex items-center justify-between"
                  >
                    <span>{post.isAskingSuggestions ? 'Reply with part or shop recommendation...' : 'Add a comment or question...'}</span>
                    <span className="text-[11px] text-[#E50914] font-medium">Open Thread →</span>
                  </div>

                </div>
              </article>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
