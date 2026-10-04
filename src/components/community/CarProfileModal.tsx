import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { 
  X, Tag, Store, Wrench, ShieldCheck, Heart, 
  MessageCircle, Share2, Sparkles, Check, 
  Lock, Eye, Award, ExternalLink, Play, Film,
  Layers, Sliders, ChevronRight
} from 'lucide-react';
import { UserCar } from '../../types';

interface CarProfileModalProps {
  car: UserCar;
  onClose: () => void;
}

export const CarProfileModal: React.FC<CarProfileModalProps> = ({ car, onClose }) => {
  const { 
    showToast, 
    openEnquiryModal, 
    posts,
    setCurrentTab, 
    setBuildVehicle,
    setActivePost 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'mods' | 'build' | 'specs'>('mods');
  const [isFollowed, setIsFollowed] = useState(car.isFollowed || false);
  const [followerCount, setFollowerCount] = useState(car.followersCount || 4210);

  const carPosts = posts.filter(p => p.authorCarId === car.id || p.carModel.toLowerCase().includes(car.model.toLowerCase()));

  const handleToggleFollow = () => {
    if (isFollowed) {
      setIsFollowed(false);
      setFollowerCount(prev => prev - 1);
      showToast(`Unfollowed @${car.carUsername}`);
    } else {
      setIsFollowed(true);
      setFollowerCount(prev => prev + 1);
      showToast(`Following @${car.carUsername}! Car updates will appear in your feed.`);
    }
  };

  const handleReplicateBuild = () => {
    setBuildVehicle(car.make, car.model, car.year, car.variant);
    setCurrentTab('build');
    onClose();
    showToast(`Loaded ${car.carName} configuration into Build Configurator!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-4 bg-[#141414] border-b border-[#202020] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#E50914] bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded">
              CAR PROFILE
            </span>
            <span className="text-xs font-mono text-neutral-300">
              @{car.carUsername || car.carName.toLowerCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto">

          {/* Cover Photo / Hero Header Banner */}
          <div className="relative h-44 sm:h-56 bg-neutral-900 overflow-hidden">
            <img
              src={car.coverImage || car.image}
              alt={car.carName}
              className="w-full h-full object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30" />
            
            {/* Quick Car Hashtag */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-700/60 text-[11px] font-mono text-white">
              #{car.carUsername}
            </div>
          </div>

          {/* Profile Identity Bar (Instagram Style) */}
          <div className="px-5 sm:px-8 -mt-16 sm:-mt-20 relative z-10 pb-6 border-b border-[#202020]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              
              <div className="flex items-end gap-4">
                {/* Car Avatar */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-[#111111] shadow-2xl bg-black shrink-0 relative group">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>

                <div className="space-y-1 mb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-wide uppercase">
                      {car.carName}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                      {car.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                    {car.make} {car.model} · {car.variant}
                  </p>
                  <p className="text-xs text-neutral-400 flex items-center gap-1.5 pt-0.5">
                    <span>Built & Driven by</span>
                    <span className="text-white font-mono hover:text-[#E50914] cursor-pointer">
                      @{car.ownerUsername}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span className="text-neutral-500">{car.color}</span>
                  </p>
                </div>
              </div>

              {/* Follow & Replicate Actions */}
              <div className="flex items-center gap-2.5 self-stretch sm:self-auto pt-2 sm:pt-0">
                <button
                  onClick={handleToggleFollow}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    isFollowed
                      ? 'bg-[#1e1e1e] text-neutral-300 border border-[#333]'
                      : 'bg-[#E50914] hover:bg-[#c90812] text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFollowed ? 'fill-current text-[#E50914]' : ''}`} />
                  <span>{isFollowed ? 'Following Car' : 'Follow Car'}</span>
                </button>

                <button
                  onClick={handleReplicateBuild}
                  className="px-4 py-2.5 bg-[#1d1d1d] hover:bg-[#282828] border border-[#2f2f2f] text-neutral-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Replicate Build</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast(`Copied identity link for @${car.carUsername}!`);
                  }}
                  className="p-2.5 bg-[#1d1d1d] hover:bg-[#282828] border border-[#2f2f2f] text-neutral-400 hover:text-white rounded-xl transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Build Story / Bio */}
            {car.buildStory && (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-4 bg-[#161616] p-3.5 rounded-xl border border-[#242424]">
                “{car.buildStory}”
              </p>
            )}

            {/* Social Stats Counters */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center mt-4">
              <div className="p-2.5 bg-[#161616] rounded-xl border border-[#222222]">
                <span className="block text-base sm:text-lg font-bold text-white font-mono">
                  {followerCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Followers</span>
              </div>
              <div className="p-2.5 bg-[#161616] rounded-xl border border-[#222222]">
                <span className="block text-base sm:text-lg font-bold text-white font-mono">
                  {car.modifications.length}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Mods Done</span>
              </div>
              <div className="p-2.5 bg-[#161616] rounded-xl border border-[#222222]">
                <span className="block text-base sm:text-lg font-bold text-white font-mono">
                  {car.postsCount || carPosts.length || 18}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Posts & Reels</span>
              </div>
              <div className="p-2.5 bg-[#161616] rounded-xl border border-[#222222]">
                <span className="block text-base sm:text-lg font-bold text-white font-mono">
                  {car.likesCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Community Saves</span>
              </div>
            </div>

            {/* Build Progress Meters (Instagram Car Identity Requirement) */}
            {car.buildProgress && (
              <div className="mt-5 p-4 bg-[#161616] border border-[#242424] rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#E50914]" />
                    Build Completion Status
                  </span>
                  <span className="text-red-400">{car.stage}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">Exterior</span>
                      <span className="font-mono text-white font-bold">{car.buildProgress.exterior}%</span>
                    </div>
                    <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E50914] rounded-full" style={{ width: `${car.buildProgress.exterior}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">Wheels</span>
                      <span className="font-mono text-white font-bold">{car.buildProgress.wheels}%</span>
                    </div>
                    <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${car.buildProgress.wheels}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">Lighting</span>
                      <span className="font-mono text-white font-bold">{car.buildProgress.lighting}%</span>
                    </div>
                    <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${car.buildProgress.lighting}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">Performance</span>
                      <span className="font-mono text-white font-bold">{car.buildProgress.performance || 45}%</span>
                    </div>
                    <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${car.buildProgress.performance || 45}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-400">Interior</span>
                      <span className="font-mono text-white font-bold">{car.buildProgress.interior || 30}%</span>
                    </div>
                    <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${car.buildProgress.interior || 30}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Section Tabs */}
          <div className="px-5 sm:px-8 pt-2">
            <div className="flex items-center gap-6 border-b border-[#202020] text-xs font-semibold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('mods')}
                className={`py-3 relative transition-colors whitespace-nowrap ${
                  activeTab === 'mods' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Modifications ({car.modifications.length})
                {activeTab === 'mods' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />}
              </button>

              <button
                onClick={() => setActiveTab('posts')}
                className={`py-3 relative transition-colors whitespace-nowrap ${
                  activeTab === 'posts' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Posts & Photos
                {activeTab === 'posts' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />}
              </button>

              <button
                onClick={() => setActiveTab('reels')}
                className={`py-3 relative transition-colors whitespace-nowrap ${
                  activeTab === 'reels' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Reels & Sound
                {activeTab === 'reels' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />}
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3 relative transition-colors whitespace-nowrap ${
                  activeTab === 'specs' ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Specs & Registration
                {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5 sm:p-8">

            {/* TAB: MODIFICATIONS LIST */}
            {activeTab === 'mods' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Installed Parts & Verified Workshops
                  </h4>
                  <span className="text-[11px] text-neutral-400">
                    Total Mod Value: ₹{car.modifications.reduce((acc, m) => acc + (m.cost || 0), 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {car.modifications.map((mod) => (
                    <div
                      key={mod.id}
                      className="p-4 bg-[#161616] border border-[#242424] rounded-2xl flex flex-col justify-between hover:border-[#383838] transition-colors group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-mono text-[10px] text-[#E50914] uppercase font-bold">
                            {mod.category}
                          </span>
                          {mod.cost && (
                            <span className="font-mono text-white font-bold">
                              ₹{mod.cost.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <h5 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          {mod.name}
                        </h5>
                        {mod.stageImpact && (
                          <p className="text-[11px] text-emerald-400 font-mono mt-0.5">{mod.stageImpact}</p>
                        )}
                      </div>

                      {mod.shopName && (
                        <div className="pt-3 mt-3 border-t border-[#202020] flex items-center justify-between text-xs">
                          <span className="text-neutral-400 flex items-center gap-1.5 truncate">
                            <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{mod.shopName}</span>
                          </span>
                          <button
                            onClick={() => showToast(`Opening fitment specs for ${mod.name}`)}
                            className="text-[11px] text-[#E50914] hover:underline shrink-0"
                          >
                            Inspect Part
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: POSTS */}
            {activeTab === 'posts' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {carPosts.map(post => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setActivePost(post);
                      onClose();
                    }}
                    className="aspect-square bg-black rounded-xl overflow-hidden relative group cursor-pointer border border-[#222222]"
                  >
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white text-xs font-mono font-bold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-current text-[#E50914]" />
                        <span>{post.likesCount}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>{post.commentsCount}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: REELS */}
            {activeTab === 'reels' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => showToast('Playing Virtus GT launch control & valvetronic sound!')}
                  className="aspect-[9/16] bg-[#161616] rounded-2xl overflow-hidden relative cursor-pointer group border border-[#262626]"
                >
                  <img
                    src={car.image}
                    alt="Reel preview"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between">
                    <span className="self-end bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current text-[#E50914]" /> 0:24
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Dyno Run & Pops 🏁</p>
                      <p className="text-[10px] text-neutral-300 mt-0.5 font-mono">14.2k views</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => showToast('Playing 4K Night Rolling Shots!')}
                  className="aspect-[9/16] bg-[#161616] rounded-2xl overflow-hidden relative cursor-pointer group border border-[#262626]"
                >
                  <img
                    src={car.coverImage || car.image}
                    alt="Reel preview"
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between">
                    <span className="self-end bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current text-[#E50914]" /> 0:31
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Bandra Sea Link Midnight Roll ⚡</p>
                      <p className="text-[10px] text-neutral-300 mt-0.5 font-mono">22.8k views</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SPECS & REGISTRATION */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#161616] border border-[#262626] rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Factory & Build Specifications
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Make</span>
                      <p className="font-semibold text-white">{car.make}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Model</span>
                      <p className="font-semibold text-white">{car.model}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Variant</span>
                      <p className="font-semibold text-white">{car.variant}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Year of Manufacture</span>
                      <p className="font-semibold text-white">{car.year}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Fuel Type</span>
                      <p className="font-semibold text-white">{car.fuelType || 'Petrol'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Transmission</span>
                      <p className="font-semibold text-white">{car.transmission || 'Automatic'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Mileage</span>
                      <p className="font-semibold text-white">{car.mileage || '18,500 km'}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Color Shade</span>
                      <p className="font-semibold text-white">{car.color}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-neutral-500">Instagram Handle</span>
                      <p className="font-semibold text-red-400 font-mono">{car.instagramHandle || `@${car.carUsername}`}</p>
                    </div>
                  </div>
                </div>

                {/* Registration Privacy Shield Requirement */}
                <div className="p-4 bg-[#141814] border border-[#203322] rounded-2xl flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">CARIX Privacy Shield: Registration Number</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-mono">
                        {car.isRegNumberPublic ? 'Public' : 'Protected / Private by Default'}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      {car.isRegNumberPublic 
                        ? `Displayed as: ${car.registrationNumber || 'MH 02 ER 9999'}`
                        : 'Registration numbers are never displayed publicly without owner confirmation to prevent clone plates and protect owner privacy.'
                      }
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
