import React, { useState } from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  Bell, MessageSquare, Plus, User, 
  Wrench, ShieldCheck, ChevronDown, Compass, Home as HomeIcon,
  Store, Cpu, Info, Sparkles, LogOut, Trophy
} from 'lucide-react';
import { GlobalSearchBar } from './GlobalSearchBar';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    switchUserRole,
    unreadNotificationsCount,
    unreadMessagesCount,
    setIsCreatePostOpen,
    setIsNotificationsOpen,
    setIsMessagesOpen,
    setIsOnboardingOpen,
    logout
  } = useApp();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'rankings', label: 'Rankings' },
    { id: 'build', label: 'Build' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'community', label: 'Community' },
    { id: 'shops', label: 'Shops' },
    { id: 'aigarage', label: 'AI Garage' },
    { id: 'about', label: 'About' },
  ];

  return (
    <>
      {/* Desktop & Tablet Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#090909]/95 backdrop-blur-md border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center font-display font-extrabold text-white text-lg tracking-tighter">
                C
              </div>
              <span className="text-xl font-display font-black tracking-wider text-white">
                CARIX<span className="text-[#E50914]">.</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Global Real-time Search, Notifications, Messages, Create & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Global Real-Time Search Bar */}
            <div className="hidden sm:block">
              <GlobalSearchBar />
            </div>

            {/* Notifications button with count */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              aria-label="Notifications"
              className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full ring-2 ring-[#090909]" />
              )}
            </button>

            {/* Messages button with count */}
            <button
              onClick={() => setIsMessagesOpen(true)}
              aria-label="Messages"
              className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full ring-2 ring-[#090909]" />
              )}
            </button>

            {/* Create Post Button */}
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#c90812] rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create</span>
            </button>

            {/* User Profile / Portal Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-lg border border-[#222222] bg-[#141414] hover:bg-[#1a1a1a] transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                />
                <span className="hidden xl:inline text-xs font-medium text-neutral-200 max-w-[110px] truncate">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isProfileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#141414] border border-[#262626] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#222222]">
                    <p className="text-xs font-semibold text-white truncate">{currentUser.displayName}</p>
                    <p className="text-[11px] text-neutral-400">@{currentUser.username}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-400">
                      <span>{currentUser.followersCount.toLocaleString()} followers</span>
                      <span>·</span>
                      <span className="capitalize text-red-400">{currentUser.role.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => setCurrentTab('profile')}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Automotive Profile & Garage</span>
                    </button>
                    <button
                      onClick={() => setCurrentTab('build')}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Current Build Configurator</span>
                    </button>
                    <button
                      onClick={() => setIsOnboardingOpen(true)}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:text-white hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                      <span>Launch CARIX V5 Onboarding</span>
                    </button>
                  </div>

                  <div className="border-t border-[#222222] pt-1 pb-1">
                    <p className="px-4 py-1 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Switch Environment
                    </p>
                    <button
                      onClick={() => switchUserRole('enthusiast')}
                      className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between ${
                        currentUser.role === 'enthusiast' ? 'text-red-400 bg-neutral-900/50' : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>Enthusiast View (Mantra Tiwari)</span>
                      {currentUser.role === 'enthusiast' && <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />}
                    </button>
                    <button
                      onClick={() => switchUserRole('shop_owner')}
                      className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between ${
                        currentUser.role === 'shop_owner' ? 'text-red-400 bg-neutral-900/50' : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span>Shop Partner Portal (Stealth Auto)</span>
                      {currentUser.role === 'shop_owner' && <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />}
                    </button>
                    <button
                      onClick={() => switchUserRole('admin')}
                      className={`w-full text-left px-4 py-1.5 text-xs flex items-center justify-between ${
                        currentUser.role === 'admin' ? 'text-red-400 bg-neutral-900/50' : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Admin Moderation
                      </span>
                      {currentUser.role === 'admin' && <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />}
                    </button>

                    <div className="border-t border-[#222222] mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-1.5 text-xs text-neutral-400 hover:text-red-400 hover:bg-neutral-800/80 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out of CARIX</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Social App Feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-lg border-t border-[#1f1f1f] px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-0.5 ${currentTab === 'home' ? 'text-[#E50914]' : 'text-neutral-400'}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('explore')}
          className={`flex flex-col items-center gap-0.5 ${currentTab === 'explore' ? 'text-[#E50914]' : 'text-neutral-400'}`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Explore</span>
        </button>

        <button
          onClick={() => setIsCreatePostOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 w-11 h-11 rounded-full bg-[#E50914] text-white shadow-lg active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentTab('community')}
          className={`flex flex-col items-center gap-0.5 ${currentTab === 'community' ? 'text-[#E50914]' : 'text-neutral-400'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium">Community</span>
        </button>

        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center gap-0.5 ${currentTab === 'profile' ? 'text-[#E50914]' : 'text-neutral-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </>
  );
};
