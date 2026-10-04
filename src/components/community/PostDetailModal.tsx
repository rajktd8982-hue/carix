import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { 
  X, Heart, MessageCircle, Share2, Bookmark, Tag, Store, 
  Sparkles, Send, UserPlus, Check, Lightbulb, ShieldCheck, Flag
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { 
    activePost, 
    setActivePost, 
    toggleLikePost, 
    toggleSavePost, 
    addCommentToPost,
    showToast,
    openEnquiryModal,
    openReportModal,
    products,
    shops,
    currentUser
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [suggestedPartName, setSuggestedPartName] = useState('');
  const [suggestedShopName, setSuggestedShopName] = useState('');
  const [showSuggestionFields, setShowSuggestionFields] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!activePost) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addCommentToPost(
      activePost.id,
      commentText,
      suggestedPartName.trim() || undefined,
      suggestedShopName.trim() || undefined
    );

    setCommentText('');
    setSuggestedPartName('');
    setSuggestedShopName('');
    setShowSuggestionFields(false);
  };

  const handleAiSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      if (activePost.comments.length === 0) {
        setAiSummary("No community suggestions yet. Be the first enthusiast to recommend a styling direction!");
      } else {
        const parts = activePost.comments.map(c => c.suggestedPart).filter(Boolean);
        const textSummary = `Community Consensus: 78% of builders favor the Carbon Fiber Ducktail over the standard gloss black lip, noting the contrast with the candy white paint. Recommendation is to consult CarbonWorks India for factory clip mounting without drilling.`;
        setAiSummary(textSummary);
      }
      setIsSummarizing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button Mobile/Desktop */}
        <button
          onClick={() => setActivePost(null)}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 text-neutral-300 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Visual Media & Tagged Items */}
        <div className="md:w-7/12 bg-black flex flex-col justify-between overflow-y-auto">
          <div className="relative flex-1 flex items-center justify-center bg-[#090909]">
            <img
              src={activePost.mediaUrl}
              alt={activePost.carModel}
              className="max-h-[55vh] md:max-h-[75vh] w-full object-contain"
            />
          </div>

          {/* Social Tagging Bar under Media */}
          <div className="p-4 bg-[#141414] border-t border-[#202020] space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-semibold text-white">Tagged Build Components</span>
              <span className="text-[11px] text-neutral-500 font-mono">Tap part to inspect & enquire</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {activePost.taggedParts.map((part) => (
                <button
                  key={part.partId}
                  onClick={() => {
                    const p = products.find(prod => prod.id === part.partId);
                    if (p) openEnquiryModal({ product: p });
                    else showToast(`Opening part details for ${part.partName}`);
                  }}
                  className="px-2.5 py-1 bg-[#1e1e1e] hover:bg-[#252525] border border-[#333333] hover:border-[#E50914] rounded-lg text-xs text-neutral-200 transition-colors flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-[#E50914]" />
                  <span>{part.partName}</span>
                </button>
              ))}

              {activePost.taggedShops.map((shop) => (
                <button
                  key={shop.shopId}
                  onClick={() => {
                    const s = shops.find(sh => sh.id === shop.shopId);
                    if (s) openEnquiryModal({ shop: s });
                    else showToast(`Opening workshop profile for ${shop.shopName}`);
                  }}
                  className="px-2.5 py-1 bg-[#162519] hover:bg-[#1f3523] border border-[#254629] rounded-lg text-xs text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <Store className="w-3 h-3 text-emerald-400" />
                  <span>{shop.shopName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Discussion & Suggestions Thread */}
        <div className="md:w-5/12 flex flex-col h-[50vh] md:h-auto bg-[#141414] border-t md:border-t-0 md:border-l border-[#222222]">
          
          {/* Creator Profile Header */}
          <div className="p-4 border-b border-[#202020] flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={activePost.userAvatar}
                alt={activePost.username}
                className="w-9 h-9 rounded-full object-cover border border-[#2e2e2e]"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white truncate">@{activePost.username}</p>
                  {activePost.username === currentUser.username ? (
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-black">
                      👑 Founder
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300">
                      🏎️ Master Builder
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 truncate">{activePost.carModel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast(`Following @${activePost.username}`)}
                className="px-2.5 py-1 text-xs font-medium text-neutral-300 hover:text-white bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg"
              >
                Follow
              </button>

              <button
                onClick={() => openReportModal({
                  targetType: 'post',
                  targetId: activePost.id,
                  targetUsername: activePost.username,
                  targetTitle: activePost.caption
                })}
                className="p-1.5 text-neutral-400 hover:text-red-400 bg-[#1c1c1c] hover:bg-red-950/40 border border-[#2d2d2d] hover:border-red-900/50 rounded-lg transition-colors"
                title="Report Post or Content"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Suggestion Summarizer Banner */}
          {activePost.isAskingSuggestions && (
            <div className="p-3 bg-[#1d1515] border-b border-[#3d1e1e] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-red-300 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Topic: {activePost.suggestionTopic}</span>
                </span>
                <button
                  onClick={handleAiSummarize}
                  disabled={isSummarizing}
                  className="px-2 py-0.5 rounded bg-[#2e1717] hover:bg-[#3d1e1e] border border-red-900/50 text-[10px] text-red-200 font-medium transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{isSummarizing ? 'Analyzing...' : 'AI Summary'}</span>
                </button>
              </div>

              {aiSummary && (
                <div className="p-2.5 bg-black/60 rounded-lg border border-red-950 text-[11px] text-neutral-300 leading-relaxed animate-in fade-in">
                  <span className="font-semibold text-[#E50914] block text-[10px] uppercase">CARIX AI Consensus</span>
                  {aiSummary}
                </div>
              )}
            </div>
          )}

          {/* Comments & Suggestions Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Original Post Caption */}
            <div className="text-xs text-neutral-300 leading-relaxed pb-3 border-b border-[#202020]">
              <span className="font-bold text-white mr-1.5">@{activePost.username}</span>
              {activePost.caption}
            </div>

            {/* List of User Comments */}
            {activePost.comments.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No replies yet. Be the first to share suggestions on this build!
              </div>
            ) : (
              activePost.comments.map((comment) => (
                <div key={comment.id} className="space-y-1.5">
                  <div className="flex items-start gap-2.5">
                    <img
                      src={comment.userAvatar}
                      alt={comment.username}
                      className="w-7 h-7 rounded-full object-cover border border-[#2a2a2a] shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white">@{comment.username}</span>
                        {comment.username === currentUser.username ? (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-red-600 text-black">
                            👑 Founder
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-950/70 border border-blue-800 text-blue-300">
                            💬 Discussion Maestro
                          </span>
                        )}
                        <span className="text-[10px] text-neutral-500">{comment.timestamp}</span>
                      </div>
                      
                      <p className="text-xs text-neutral-300 leading-relaxed mt-0.5">
                        {comment.text}
                      </p>

                      {/* Attached recommendation badge */}
                      {(comment.suggestedPart || comment.suggestedShop) && (
                        <div className="mt-1.5 p-2 bg-[#1b1b1b] border border-[#2c2c2c] rounded-lg text-[11px] flex flex-wrap items-center gap-2">
                          {comment.suggestedPart && (
                            <span className="text-red-400 font-medium flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              Rec: {comment.suggestedPart}
                            </span>
                          )}
                          {comment.suggestedShop && (
                            <span className="text-emerald-400 font-medium flex items-center gap-1">
                              <Store className="w-3 h-3" />
                              Via: {comment.suggestedShop}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>

          {/* Comment & Suggestion Submission Form */}
          <form onSubmit={handleSubmitComment} className="p-3 border-t border-[#202020] bg-[#161616] space-y-2">
            
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span>Reply to @{activePost.username}</span>
              <button
                type="button"
                onClick={() => setShowSuggestionFields(!showSuggestionFields)}
                className="text-[11px] text-[#E50914] hover:underline flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                <span>{showSuggestionFields ? 'Hide Tag Fields' : '+ Recommend Part / Shop'}</span>
              </button>
            </div>

            {showSuggestionFields && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  value={suggestedPartName}
                  onChange={(e) => setSuggestedPartName(e.target.value)}
                  placeholder="Part name (e.g. BBS LM 18)"
                  className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-[#E50914]"
                />
                <input
                  type="text"
                  value={suggestedShopName}
                  onChange={(e) => setSuggestedShopName(e.target.value)}
                  placeholder="Shop name (e.g. Redline)"
                  className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Give advice, feedback or ask a question..."
                className="flex-1 bg-[#1f1f1f] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-3.5 py-2 bg-[#E50914] text-white rounded-xl text-xs font-semibold disabled:opacity-40 hover:bg-[#c90812] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
