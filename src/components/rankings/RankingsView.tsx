import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, Heart, Users, ShoppingBag, MapPin, 
  ShieldCheck, Eye, EyeOff, Flag, ArrowUpRight, 
  Sparkles, CheckCircle2, ChevronRight, Award, Flame, Filter
} from 'lucide-react';
import { 
  INDIAN_REGIONS, 
  INITIAL_LEADERBOARD_LIKES, 
  INITIAL_LEADERBOARD_FOLLOWERS, 
  INITIAL_LEADERBOARD_SHOPPING 
} from '../../data/rankingsData';
import { LeaderboardRankItem } from '../../types';

export const RankingsView: React.FC = () => {
  const { 
    currentUser, 
    userShoppingPrivacy, 
    toggleUserShoppingPrivacy, 
    openReportModal, 
    setActiveCarProfile, 
    userCars,
    showToast,
    setCurrentTab 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'likes' | 'followers' | 'shopping'>('likes');
  const [selectedState, setSelectedState] = useState<string>('All India');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');

  // Filter districts based on state
  const availableDistricts = selectedState === 'All India' 
    ? ['All Districts'] 
    : INDIAN_REGIONS.find(r => r.name === selectedState)?.districts || ['All Districts'];

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('All Districts');
  };

  // Select list data
  let currentList: LeaderboardRankItem[] = [];
  if (activeTab === 'likes') currentList = INITIAL_LEADERBOARD_LIKES;
  else if (activeTab === 'followers') currentList = INITIAL_LEADERBOARD_FOLLOWERS;
  else currentList = INITIAL_LEADERBOARD_SHOPPING;

  // Apply State & District filters
  const filteredList = currentList.filter(item => {
    if (selectedState !== 'All India' && item.state !== selectedState) return false;
    if (selectedDistrict !== 'All Districts' && item.district !== selectedDistrict) return false;
    // If shopping privacy is active and it's another user who chose to hide, mask their name
    return true;
  });

  const getShoppingLevelColor = (level?: string) => {
    switch (level) {
      case 'Titanium':
        return 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40';
      case 'Platinum':
        return 'text-purple-300 border-purple-500/50 bg-purple-950/40';
      case 'Gold':
        return 'text-amber-300 border-amber-500/50 bg-amber-950/40';
      case 'Silver':
        return 'text-slate-300 border-slate-500/50 bg-slate-900/60';
      default:
        return 'text-orange-400 border-orange-500/50 bg-orange-950/40';
    }
  };

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/30';
    if (rank === 2) return 'bg-neutral-300 text-black font-black';
    if (rank === 3) return 'bg-amber-700 text-white font-black';
    return 'bg-neutral-800 text-neutral-300 font-mono';
  };

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider bg-red-950/60 border border-red-900/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                CARIX National & Regional Leaderboard
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-900/40 px-2 py-0.5 rounded-full">
                Live Indian Rankings
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
              Automotive Hall of Fame
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Explore the most respected car builds, highest followed creators, and top modification spenders across India, by State and District.
            </p>
          </div>

          {/* Privacy Toggle Box (Required: "jisko hide rakhna ha wo hide v rakh sakta ha") */}
          <div className="bg-[#141414] border border-[#262626] rounded-2xl p-4 flex items-center justify-between gap-4 max-w-md shadow-lg">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                {userShoppingPrivacy ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                <span>Shopping Leaderboard Privacy</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                {userShoppingPrivacy 
                  ? 'Your spend & shopping rank is currently HIDDEN from public view.' 
                  : 'Your spend & level are publicly visible to the community.'}
              </p>
            </div>

            <button
              onClick={toggleUserShoppingPrivacy}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                userShoppingPrivacy
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-[#1f1f1f] text-neutral-300 border border-[#2e2e2e] hover:border-neutral-500'
              }`}
            >
              {userShoppingPrivacy ? 'Unhide' : 'Hide Rank'}
            </button>
          </div>
        </div>

        {/* Filters Bar: Category Tabs & Geographic Selection */}
        <div className="space-y-4">
          
          {/* 3 Main Ranking Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#121212] p-1.5 rounded-2xl border border-[#242424]">
            <button
              onClick={() => setActiveTab('likes')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'likes'
                  ? 'bg-[#E50914] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Most Liked Builds</span>
            </button>

            <button
              onClick={() => setActiveTab('followers')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'followers'
                  ? 'bg-[#E50914] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Most Followed (Cars & Users)</span>
            </button>

            <button
              onClick={() => setActiveTab('shopping')}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'shopping'
                  ? 'bg-[#E50914] text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Top Shoppers & Spenders</span>
            </button>
          </div>

          {/* Geographic Filters: State & District Dropdowns */}
          <div className="bg-[#121212] border border-[#222222] p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              <span className="font-bold uppercase tracking-wider">Region Scope:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* State Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono">State:</span>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                >
                  <option value="All India">🇮🇳 All India (National)</option>
                  {INDIAN_REGIONS.map(reg => (
                    <option key={reg.name} value={reg.name}>{reg.name}</option>
                  ))}
                </select>
              </div>

              {/* District Filter */}
              {selectedState !== 'All India' && (
                <div className="flex items-center gap-2 animate-in fade-in duration-200">
                  <span className="text-xs text-neutral-400 font-mono">District:</span>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                  >
                    {availableDistricts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Tab Description Banner */}
        {activeTab === 'shopping' && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-900 border border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E50914] text-white">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Verified Modification Spenders & Shop Levels</p>
                <p className="text-neutral-400 text-[11px]">
                  Rankings calculated based on verified part purchases, workshop build invoices, and modification fitments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800">
                Titanium (₹4L+)
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
                Platinum (₹2L+)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                Gold (₹1L+)
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                Silver (₹40k+)
              </span>
            </div>
          </div>
        )}

        {/* Leaderboard Table / Cards */}
        <div className="space-y-3">
          {filteredList.length === 0 ? (
            <div className="p-12 text-center bg-[#121212] border border-[#222222] rounded-3xl space-y-3">
              <Trophy className="w-10 h-10 text-neutral-600 mx-auto" />
              <h3 className="text-sm font-bold text-white font-mono">No entries in this district yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Be the first to register a modified car build or workshop purchase in {selectedDistrict}, {selectedState}!
              </p>
            </div>
          ) : (
            filteredList.map((item) => {
              const isHidden = item.isPrivate || (item.isCurrentUser && userShoppingPrivacy && activeTab === 'shopping');
              
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                    item.isCurrentUser
                      ? 'bg-red-950/20 border-red-900/60 shadow-lg'
                      : 'bg-[#121212] border-[#222222] hover:border-neutral-700'
                  }`}
                >
                  {/* Left: Rank + Avatar + Name + Car / Badge */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    
                    {/* Rank Badge */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${getRankBadgeStyle(item.rank)}`}>
                      #{item.rank}
                    </div>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={isHidden ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' : item.avatar}
                        alt={item.title}
                        className="w-12 h-12 rounded-2xl object-cover border border-neutral-700"
                      />
                      {item.isCurrentUser && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E50914] rounded-full border-2 border-[#121212]" />
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors">
                          {isHidden ? 'Private Enthusiast (Hidden)' : item.title}
                        </h4>
                        {item.isCurrentUser && (
                          <span className="text-[10px] font-mono font-bold bg-[#E50914] text-white px-2 py-0.5 rounded-full">
                            YOU
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-400 font-mono">
                        <span className="text-red-400 font-semibold">
                          @{isHidden ? 'masked_modder' : item.username}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          {item.district}, {item.state}
                        </span>
                        {item.carModel && (
                          <>
                            <span>•</span>
                            <span className="text-neutral-300">{item.carModel}</span>
                          </>
                        )}
                      </div>

                      {/* Preferred shops for shopping tab */}
                      {activeTab === 'shopping' && item.preferredShops && !isHidden && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] text-neutral-500 font-mono">Built with:</span>
                          {item.preferredShops.map((shop, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#181818] border border-[#2b2b2b] text-neutral-300"
                            >
                              {shop}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right: Score Metric / Shopping Level & Report Action */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1f1f1f]">
                    
                    {/* Score display */}
                    <div className="text-left sm:text-right">
                      {activeTab === 'likes' && (
                        <div>
                          <div className="flex items-center sm:justify-end gap-1.5 text-red-500 font-black font-mono text-base">
                            <Heart className="w-4 h-4 fill-red-500" />
                            <span>{item.scoreMetric.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10px] font-mono text-neutral-400">Total Build Likes</p>
                        </div>
                      )}

                      {activeTab === 'followers' && (
                        <div>
                          <div className="flex items-center sm:justify-end gap-1.5 text-white font-black font-mono text-base">
                            <Users className="w-4 h-4 text-emerald-400" />
                            <span>{item.scoreMetric.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10px] font-mono text-neutral-400">Community Followers</p>
                        </div>
                      )}

                      {activeTab === 'shopping' && (
                        <div>
                          <div className="flex items-center sm:justify-end gap-1.5 text-white font-black font-mono text-base">
                            <span>₹{item.scoreMetric.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getShoppingLevelColor(item.shoppingLevel)}`}>
                              Level: {item.shoppingLevel}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Report User Action ("aur koi kisi ko report kre toh mere pass option aaye") */}
                    {!item.isCurrentUser && (
                      <button
                        onClick={() => openReportModal({
                          targetType: item.type === 'car' ? 'car' : 'user',
                          targetId: item.id,
                          targetUsername: item.username,
                          targetTitle: item.title
                        })}
                        className="p-2 rounded-xl bg-[#181818] hover:bg-red-950/60 border border-[#2b2b2b] hover:border-red-900/60 text-neutral-400 hover:text-red-400 transition-colors"
                        title="Report suspicious or fake activity"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    )}

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky User Position Banner */}
        <div className="bg-[#121212] border border-[#2b2b2b] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914] text-white flex items-center justify-center font-black font-mono">
              #1
            </div>
            <div>
              <p className="text-xs font-bold text-white">Your Rank: #1 in Maharashtra · Mumbai Suburban</p>
              <p className="text-[11px] text-neutral-400 font-mono">
                {activeTab === 'shopping' 
                  ? 'Titanium Builder Level · ₹4,85,000 Verified Spend across Stealth Auto Labs' 
                  : 'Volkswagen Virtus GT (@midnight_virtus) · 28,450 Likes'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('profile')}
              className="px-4 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2e2e2e] text-xs font-semibold text-white transition-colors"
            >
              View My Garage Profile
            </button>
            <button
              onClick={() => setCurrentTab('build')}
              className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Upgrade Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
