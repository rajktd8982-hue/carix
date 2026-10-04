import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { CarProfileModal } from './CarProfileModal';
import { AddCarModal } from './AddCarModal';
import { OnboardingModal } from '../onboarding/OnboardingModal';
import { FounderAvatar } from '../common/FounderAvatar';
import { 
  User, MapPin, Wrench, ShieldCheck, Heart, 
  MessageCircle, MessageSquare, Settings, Plus, Share2, MoreHorizontal, 
  Bookmark, Tag, Flag, Ban, Upload, Grid, Film, 
  Car, Instagram, Mail, Sparkles, ExternalLink, Play, LogOut,
  Award, Trophy, Lock, CheckCircle2, Flame, Crown, Hammer, Compass, Gauge, Shield
} from 'lucide-react';
import { UserCar, CommunityPost, CarixBadge } from '../../types';
import { BadgesShowcaseModal } from '../profile/BadgesShowcaseModal';
import { INITIAL_CARIX_BADGES, getBadgeTierStyle } from '../../data/badgesData';

export const UserProfileView: React.FC = () => {
  const { 
    currentUser, 
    userCars, 
    posts, 
    savedBuilds, 
    setActivePost, 
    setIsCreatePostOpen, 
    setCurrentTab,
    showToast,
    setIsMessagesOpen,
    updateFounderPhoto,
    founderPhoto,
    logout
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'cars' | 'builds' | 'saved' | 'badges'>('posts');
  const [selectedCarForModal, setSelectedCarForModal] = useState<UserCar | null>(null);
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(currentUser.followersCount || 14800);
  const [showActionMenu, setShowActionMenu] = useState(false);

  // Digital Badges & Achievements State
  const [userBadges, setUserBadges] = useState<CarixBadge[]>(() => {
    return currentUser.badges || INITIAL_CARIX_BADGES;
  });
  const [selectedBadgeForModal, setSelectedBadgeForModal] = useState<CarixBadge | null>(null);
  const [badgeCategoryFilter, setBadgeCategoryFilter] = useState<'all' | 'builder' | 'community' | 'driver' | 'shopper'>('all');

  const handleTogglePinBadge = (badgeId: string) => {
    setUserBadges(prev => prev.map(b => {
      if (b.id === badgeId) {
        const nextState = !b.isFeatured;
        showToast(nextState ? `Pinned "${b.title}" to profile header!` : `Unpinned "${b.title}" from profile header.`);
        return { ...b, isFeatured: nextState };
      }
      return b;
    }));
  };

  const featuredBadges = userBadges.filter(b => b.isFeatured && b.isUnlocked);

  const userPosts = posts.filter(p => p.userId === currentUser.id);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateFounderPhoto(result);
          showToast('Actual Founder Photo (image.png) applied across CARIX!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const STORY_HIGHLIGHTS = [
    {
      id: 'hl-1',
      title: 'Virtus GT',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80',
      tag: '@midnight_virtus'
    },
    {
      id: 'hl-2',
      title: 'Thar 4x4',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
      tag: '@vajra_thar'
    },
    {
      id: 'hl-3',
      title: 'Stage 2 Mods',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
      tag: 'AeroCraft Lip'
    },
    {
      id: 'hl-4',
      title: 'Valvetronic',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
      tag: 'SS304 Exhaust'
    },
    {
      id: 'hl-5',
      title: 'Night Meets',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
      tag: 'Bandra BKC'
    },
    {
      id: 'hl-6',
      title: 'CARIX 2026',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
      tag: 'Launch V5'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090909] py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hidden File Input for Avatar Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* INSTAGRAM PROFILE HEADER */}
        <div className="pb-8 border-b border-[#1f1f1f]">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            
            {/* Left: Avatar with Instagram Story Gradient Ring */}
            <div className="relative group shrink-0">
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#E50914] via-amber-500 to-purple-600 shadow-xl">
                <div className="p-1 rounded-full bg-[#090909]">
                  {currentUser.username === 'mantra_tiwari_999' ? (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
                      <FounderAvatar size="xl" className="w-full h-full rounded-full" />
                    </div>
                  ) : (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.displayName}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Upload Badge overlay */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#E50914] text-white shadow-lg hover:scale-110 transition-transform"
                title="Upload custom founder profile picture"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Username, Bio & Metrics */}
            <div className="flex-1 space-y-4 text-center sm:text-left">
              
              {/* Row 1: Username & Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {currentUser.username}
                  </h1>
                  {currentUser.isVerified && (
                    <div className="p-1 rounded-full bg-[#E50914] text-white" title="Verified CARIX Founder & Automotive Creator">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (isFollowing) {
                        setIsFollowing(false);
                        setFollowerCount(prev => prev - 1);
                        showToast(`Unfollowed @${currentUser.username}`);
                      } else {
                        setIsFollowing(true);
                        setFollowerCount(prev => prev + 1);
                        showToast(`Following @${currentUser.username}!`);
                      }
                    }}
                    className={`px-5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isFollowing
                        ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                        : 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-md'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>

                  <button
                    onClick={() => setIsMessagesOpen(true)}
                    className="px-4 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2e2e2e] text-xs font-semibold text-neutral-200 transition-colors"
                  >
                    Message
                  </button>

                  <button
                    onClick={() => setIsAddCarOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2e2e2e] text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
                    title="Add a new car to your garage"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E50914]" />
                    <span className="hidden sm:inline">Add Car</span>
                  </button>

                  <button
                    onClick={() => setIsOnboardingOpen(true)}
                    className="p-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2e2e2e] text-neutral-400 hover:text-white transition-colors"
                    title="Open CARIX V5 Onboarding & Role Switcher"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  <button
                    onClick={logout}
                    className="p-2 rounded-xl bg-[#1c1c1c] hover:bg-[#252525] border border-[#2e2e2e] text-neutral-400 hover:text-red-400 transition-colors"
                    title="Log Out of CARIX"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Row 2: Metrics Counters (Posts, Cars, Followers, Following) */}
              <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8 text-sm">
                <div>
                  <span className="font-bold text-white font-mono">{userPosts.length}</span>{' '}
                  <span className="text-neutral-400 text-xs">posts</span>
                </div>
                <div 
                  className="cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => setActiveTab('cars')}
                >
                  <span className="font-bold text-white font-mono">{userCars.length}</span>{' '}
                  <span className="text-neutral-400 text-xs">garage cars</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono">{followerCount.toLocaleString()}</span>{' '}
                  <span className="text-neutral-400 text-xs">followers</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono">{currentUser.followingCount.toLocaleString()}</span>{' '}
                  <span className="text-neutral-400 text-xs">following</span>
                </div>
              </div>

              {/* Row 3: Name, Bio & Automotive Identity */}
              <div className="space-y-1.5 text-xs sm:text-sm text-neutral-200">
                <div className="font-bold text-white font-display text-base">
                  {currentUser.displayName}
                </div>
                <p className="text-neutral-300 leading-relaxed max-w-xl">
                  {currentUser.bio}
                </p>

                {/* Cars owned chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className="text-[11px] text-neutral-500 font-mono">Drives:</span>
                  {userCars.map(car => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCarForModal(car)}
                      className="px-2.5 py-0.5 rounded-lg bg-[#181818] border border-[#2c2c2c] hover:border-[#E50914] text-[11px] text-neutral-200 font-mono transition-colors flex items-center gap-1"
                    >
                      <Car className="w-3 h-3 text-[#E50914]" />
                      <span>@{car.carUsername}</span>
                    </button>
                  ))}
                </div>

                {/* Official Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                  <a
                    href="https://instagram.com/mantra_tiwari_999"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E50914] hover:underline flex items-center gap-1 font-mono font-medium"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>@mantra_tiwari_999</span>
                  </a>

                  <a
                    href="https://instagram.com/carix.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <span>@carix.in</span>
                  </a>

                  <span className="text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{currentUser.location}</span>
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* CARIX Digital Badges Shelf */}
          <div className="pt-6 border-t border-[#202020]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E50914]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Featured CARIX Badges
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/60 border border-red-900/60 text-red-300 font-bold">
                  {userBadges.filter(b => b.isUnlocked).length} Unlocked
                </span>
              </div>

              <button
                onClick={() => setActiveTab('badges')}
                className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View Trophy Room</span>
                <ExternalLink className="w-3 h-3 text-[#E50914]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {featuredBadges.map(b => {
                const style = getBadgeTierStyle(b.tier);
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBadgeForModal(b)}
                    className={`p-3 rounded-2xl border ${style.border} ${style.bg} ${style.glow} hover:scale-[1.02] transition-all flex items-center gap-3 text-left group cursor-pointer`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 ${style.text}`}>
                      {b.icon === 'Crown' && <Crown className="w-4 h-4" />}
                      {b.icon === 'Wrench' && <Wrench className="w-4 h-4" />}
                      {b.icon === 'MessageSquare' && <MessageSquare className="w-4 h-4" />}
                      {b.icon === 'Trophy' && <Trophy className="w-4 h-4" />}
                      {b.icon === 'ShieldCheck' && <ShieldCheck className="w-4 h-4" />}
                      {b.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                      {b.icon === 'Flame' && <Flame className="w-4 h-4" />}
                      {b.icon === 'Hammer' && <Hammer className="w-4 h-4" />}
                      {b.icon === 'Compass' && <Compass className="w-4 h-4" />}
                      {b.icon === 'Gauge' && <Gauge className="w-4 h-4" />}
                      {b.icon === 'Shield' && <Shield className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate group-hover:text-red-300 transition-colors">
                          {b.title}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded mt-0.5 inline-block ${style.badgePill}`}>
                        {b.tier}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INSTAGRAM STORY HIGHLIGHTS */}
          <div className="pt-8 flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2">
            
            {/* Highlight items */}
            {STORY_HIGHLIGHTS.map(hl => (
              <div
                key={hl.id}
                onClick={() => {
                  showToast(`Opening story reel: ${hl.title}`);
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
              >
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#E50914] via-amber-500 to-purple-600 group-hover:scale-105 transition-transform">
                  <div className="p-0.5 rounded-full bg-[#090909]">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-black">
                      <img
                        src={hl.image}
                        alt={hl.title}
                        className="w-full h-full object-cover filter brightness-90 group-hover:brightness-105 transition-all"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-300 font-medium group-hover:text-white">
                  {hl.title}
                </span>
              </div>
            ))}

            {/* Add New Highlight / Add Car button */}
            <div
              onClick={() => setIsAddCarOpen(true)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-dashed border-neutral-600 hover:border-white bg-[#141414] flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-neutral-400 group-hover:text-white" />
              </div>
              <span className="text-[11px] text-neutral-400 font-medium">Add Car</span>
            </div>

          </div>

        </div>

        {/* PROFILE TABS NAVIGATION (Instagram Icons & Labels) */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 border-b border-[#202020] text-xs font-bold uppercase tracking-wider font-mono">
          
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'posts'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Posts</span>
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'reels'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Reels</span>
          </button>

          <button
            onClick={() => setActiveTab('cars')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'cars'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Car className="w-4 h-4 text-[#E50914]" />
            <span>Garage ({userCars.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('builds')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'builds'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Builds</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'saved'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3.5 flex items-center gap-2 border-t-2 -mt-[1px] transition-colors ${
              activeTab === 'badges'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Award className="w-4 h-4 text-[#E50914]" />
            <span>Badges & Trophies ({userBadges.filter(b => b.isUnlocked).length})</span>
          </button>

        </div>

        {/* TAB 1: INSTAGRAM PHOTO GRID (3 COLUMNS) */}
        {activeTab === 'posts' && (
          <div className="pt-4">
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {userPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="aspect-square bg-black overflow-hidden relative cursor-pointer group"
                >
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Car tag badge */}
                  {post.carName && (
                    <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white px-2 py-0.5 rounded shadow-sm opacity-90">
                      @{post.authorCarUsername || 'midnight_virtus'}
                    </span>
                  )}

                  {/* Instagram Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-current text-[#E50914]" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Create Post CTA */}
            <div className="pt-6 text-center">
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="px-6 py-2.5 bg-[#181818] hover:bg-[#222222] border border-[#2b2b2b] text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-[#E50914]" />
                <span>Upload New Car Photo or Edit</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: REELS (SHORT AUTOMOTIVE VIDEOS) */}
        {activeTab === 'reels' && (
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {userPosts.map(post => (
              <div
                key={post.id}
                onClick={() => {
                  setActivePost(post);
                }}
                className="aspect-[9/16] bg-[#141414] rounded-2xl overflow-hidden relative cursor-pointer group border border-[#252525]"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between">
                  <span className="self-end bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current text-[#E50914]" />
                    <span>0:30</span>
                  </span>

                  <div>
                    <span className="text-[10px] text-red-400 font-mono font-semibold block">
                      @{post.authorCarUsername || 'midnight_virtus'}
                    </span>
                    <p className="text-xs font-bold text-white line-clamp-2 mt-0.5">
                      {post.caption}
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-1 font-mono">
                      {post.likesCount * 12} plays · ♫ Original Automotive Audio
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: GARAGE CARS (AUTOMOTIVE IDENTITY) */}
        {activeTab === 'cars' && (
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Automotive Identity Garage
                </h3>
                <p className="text-xs text-neutral-400">
                  Each vehicle has its own distinct profile, modification breakdown, and build story.
                </p>
              </div>

              <button
                onClick={() => setIsAddCarOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Car to Garage</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#383838] transition-colors"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => setSelectedCarForModal(car)}
                  >
                    <CarVisual
                      src={car.image}
                      alt={car.carName}
                      aspect="16:9"
                      badge={car.stage}
                      fallbackIcon={car.make === 'Mahindra' ? 'suv' : 'sedan'}
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 
                          onClick={() => setSelectedCarForModal(car)}
                          className="text-base font-bold text-white hover:text-red-400 cursor-pointer transition-colors"
                        >
                          “{car.carName}”
                        </h4>
                        <span className="text-xs font-mono text-red-400 bg-red-950/60 border border-red-900/60 px-2 py-0.5 rounded">
                          @{car.carUsername}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">{car.year} {car.make} {car.model} · {car.variant}</p>
                      
                      {/* Modifications list */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {car.modifications.slice(0, 3).map(m => (
                          <span
                            key={m.id}
                            className="px-2 py-0.5 bg-[#181818] border border-[#2a2a2a] rounded text-[10px] text-neutral-300"
                          >
                            {m.name}
                          </span>
                        ))}
                        {car.modifications.length > 3 && (
                          <span className="text-[10px] text-neutral-500 self-center">
                            +{car.modifications.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#1c1c1c] flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                        <Heart className="w-3.5 h-3.5 text-[#E50914] fill-current" />
                        <span>{car.followersCount || car.likesCount} Enthusiasts Following</span>
                      </span>

                      <button
                        onClick={() => setSelectedCarForModal(car)}
                        className="text-xs text-[#E50914] hover:text-white font-semibold transition-colors flex items-center gap-1"
                      >
                        <span>Open Car Profile</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVE BUILDS */}
        {activeTab === 'builds' && (
          <div className="pt-6 space-y-4">
            {savedBuilds.map((build) => (
              <div
                key={build.id}
                className="p-5 bg-[#121212] border border-[#222222] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{build.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {build.carYear} {build.carMake} {build.carModel} · {build.selectedParts.length} parts included
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-white font-mono">
                      ₹{build.estimatedTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-neutral-500">estimated total</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setCurrentTab('build')}
                    className="px-4 py-2 bg-[#E50914] text-white text-xs font-semibold rounded-xl shadow-md"
                  >
                    Open in Configurator
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: SAVED INSPIRATION */}
        {activeTab === 'saved' && (
          <div className="text-center py-16 text-neutral-400 text-xs space-y-2">
            <Bookmark className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="font-semibold text-neutral-300">Saved Automotive Inspiration</p>
            <p className="text-neutral-500 max-w-sm mx-auto">
              Any post or modification you bookmark while exploring the community feed appears here for quick reference.
            </p>
          </div>
        )}

        {/* TAB 6: CARIX DIGITAL BADGES & TROPHIES ROOM */}
        {activeTab === 'badges' && (
          <div className="pt-6 space-y-6 animate-in fade-in">
            {/* Header Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-black border border-red-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-[#E50914]" />
                  <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider">
                    CARIX Digital Achievements Network
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
                  Trophy & Badge Room
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                  Badges are unlocked through active participation in technical discussions, community build suggestions, and high-ranking verified automotive builds.
                </p>
              </div>

              {/* Stats Box */}
              <div className="flex items-center gap-3 bg-[#141414] border border-[#2b2b2b] p-3 rounded-2xl shrink-0">
                <div className="text-center px-2">
                  <span className="text-xl font-black text-white font-mono">{userBadges.filter(b => b.isUnlocked).length}</span>
                  <span className="text-[10px] font-mono text-neutral-500 block">EARNED</span>
                </div>
                <div className="w-[1px] h-8 bg-neutral-800" />
                <div className="text-center px-2">
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {userBadges.filter(b => b.tier === 'legendary').length}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 block">LEGENDARY</span>
                </div>
                <div className="w-[1px] h-8 bg-neutral-800" />
                <div className="text-center px-2">
                  <span className="text-xl font-black text-cyan-400 font-mono">
                    {userBadges.filter(b => b.tier === 'platinum').length}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 block">PLATINUM</span>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All Badges' },
                { id: 'builder', label: '🔧 Builder & Tuning' },
                { id: 'community', label: '💬 Discussions & Community' },
                { id: 'driver', label: '🏁 Driver & Pilots' },
                { id: 'shopper', label: '🛒 Modification Spenders' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setBadgeCategoryFilter(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                    badgeCategoryFilter === cat.id
                      ? 'bg-[#E50914] text-white font-bold shadow-md'
                      : 'bg-[#161616] text-neutral-400 hover:text-white border border-[#282828]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userBadges
                .filter(b => badgeCategoryFilter === 'all' || b.category === badgeCategoryFilter || (badgeCategoryFilter === 'builder' && b.category === 'special'))
                .map(badge => {
                  const style = getBadgeTierStyle(badge.tier);
                  return (
                    <div
                      key={badge.id}
                      onClick={() => setSelectedBadgeForModal(badge)}
                      className={`p-5 rounded-2xl border ${style.border} ${style.bg} ${badge.isUnlocked ? style.glow : 'opacity-60'} hover:scale-[1.01] transition-all flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden group`}
                    >
                      <div className="space-y-3">
                        {/* Top Tier & Pin Status */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${style.badgePill}`}>
                            {badge.tier}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {badge.isFeatured && (
                              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                ★ Pinned
                              </span>
                            )}
                            {badge.isUnlocked ? (
                              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Unlocked
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Icon */}
                        <div className="flex items-start gap-3 pt-1">
                          <div className={`w-11 h-11 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center shrink-0 ${style.text}`}>
                            {badge.icon === 'Crown' && <Crown className="w-5 h-5" />}
                            {badge.icon === 'Wrench' && <Wrench className="w-5 h-5" />}
                            {badge.icon === 'MessageSquare' && <MessageSquare className="w-5 h-5" />}
                            {badge.icon === 'Trophy' && <Trophy className="w-5 h-5" />}
                            {badge.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                            {badge.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                            {badge.icon === 'Flame' && <Flame className="w-5 h-5" />}
                            {badge.icon === 'Hammer' && <Hammer className="w-5 h-5" />}
                            {badge.icon === 'Compass' && <Compass className="w-5 h-5" />}
                            {badge.icon === 'Gauge' && <Gauge className="w-5 h-5" />}
                            {badge.icon === 'Shield' && <Shield className="w-5 h-5" />}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">
                              {badge.title}
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed mt-1 line-clamp-2">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Progress or Perk */}
                      <div className="pt-3 border-t border-white/5 space-y-2">
                        {badge.isUnlocked ? (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-neutral-500 font-mono">
                              {badge.unlockedAt ? `Earned ${new Date(badge.unlockedAt).toLocaleDateString()}` : 'Active'}
                            </span>
                            <span className="text-[#E50914] font-semibold text-[10px] uppercase font-mono group-hover:underline">
                              Inspect Perk →
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                              <span>Progress</span>
                              {badge.progress && <span>{badge.progress.current} / {badge.progress.max} {badge.progress.unit}</span>}
                            </div>
                            {badge.progress && (
                              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#E50914] h-full rounded-full"
                                  style={{ width: `${Math.min(100, (badge.progress.current / badge.progress.max) * 100)}%` }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Modals */}
        <BadgesShowcaseModal
          badge={selectedBadgeForModal}
          onClose={() => setSelectedBadgeForModal(null)}
          onTogglePin={handleTogglePinBadge}
        />
        {selectedCarForModal && (
          <CarProfileModal
            car={selectedCarForModal}
            onClose={() => setSelectedCarForModal(null)}
          />
        )}

        <AddCarModal
          isOpen={isAddCarOpen}
          onClose={() => setIsAddCarOpen(false)}
        />

        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />

      </div>
    </div>
  );
};
