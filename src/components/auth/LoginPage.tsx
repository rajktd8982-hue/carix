import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Car, Lock, User, Eye, EyeOff, ArrowRight, 
  Sparkles, ShieldCheck, Store, Wrench, CheckCircle2, 
  Instagram, Mail, ChevronRight, HelpCircle
} from 'lucide-react';
import { OnboardingModal } from '../onboarding/OnboardingModal';

export const LoginPage: React.FC = () => {
  const { 
    login, 
    loginWithGoogle, 
    isCloudSynced, 
    setIsOnboardingOpen, 
    isOnboardingOpen, 
    showToast, 
    setLegalModalType 
  } = useApp();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeCarSlide, setActiveCarSlide] = useState<0 | 1 | 2>(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const CAR_SHOWCASES = [
    {
      title: 'Volkswagen Virtus GT',
      handle: '@midnight_virtus',
      owner: 'Mantra Tiwari (@mantra_tiwari_999)',
      stage: 'Stage 2 Exterior & Stance',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      specs: '1.5 TSI DSG · 3-Piece Aero Splitter · 17" Apex Alloys · Cobra Lowering'
    },
    {
      title: 'Mahindra Thar 4x4',
      handle: '@vajra_thar',
      owner: 'Mantra Tiwari (@mantra_tiwari_999)',
      stage: 'Overland & Off-Road Armor',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      specs: 'mStallion Turbo · Prad 4x4 Winch Bumper · 285/70 AT Tyres · Ironman Lift'
    },
    {
      title: 'Stealth Auto Labs Studio',
      handle: '@stealth_mumbai',
      owner: 'Verified Automotive Workshop Partner',
      stage: 'Custom Body Kits & ECU Remaps',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      specs: 'Bandra West, Mumbai · 240+ Builds Completed · In-House 3D Aero Scanning'
    }
  ];

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      const trimmed = usernameInput.trim();

      if (trimmed.toLowerCase().includes('stealth') || trimmed.toLowerCase().includes('shop')) {
        login('shop_owner', trimmed || 'stealth_mumbai');
      } else if (trimmed.toLowerCase().includes('admin')) {
        login('admin', trimmed || 'mantra_admin');
      } else {
        login('enthusiast', trimmed || 'mantra_tiwari_999');
      }
    }, 400);
  };

  const handleQuickLoginMantra = () => {
    login('enthusiast', 'mantra_tiwari_999');
  };

  const handleQuickLoginShop = () => {
    login('shop_owner', 'stealth_mumbai');
  };

  const handleGuestExplore = () => {
    login('enthusiast', 'guest_driver');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-between font-sans selection:bg-[#E50914] selection:text-white">
      
      {/* Top Mini Brand Bar */}
      <header className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center font-display font-black text-white text-lg tracking-tighter">
            C
          </div>
          <span className="text-xl font-display font-black tracking-wider text-white">
            CARIX<span className="text-[#E50914]">.</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <span className="hidden sm:inline">“YOUR CAR. YOUR IDENTITY.”</span>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2b2b2b] text-neutral-200 hover:text-white hover:border-[#E50914] transition-all"
          >
            Create Account
          </button>
        </div>
      </header>

      {/* Main Split Authentication Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-4 sm:py-8 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Automotive Showcase Visual (Desktop) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col space-y-4">
            
            {/* Main Interactive Screen Showcase */}
            <div className="relative rounded-3xl overflow-hidden border border-[#222222] bg-[#121212] aspect-[16/10] shadow-2xl group">
              <img
                src={CAR_SHOWCASES[activeCarSlide].image}
                alt={CAR_SHOWCASES[activeCarSlide].title}
                className="w-full h-full object-cover transition-all duration-700 filter brightness-90 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-black/70 backdrop-blur-md border border-neutral-700/60 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
                  Live Community Identity
                </span>
                <span className="bg-red-950/80 backdrop-blur-md border border-red-900/60 px-2.5 py-1 rounded-full text-[10px] font-mono text-red-300">
                  {CAR_SHOWCASES[activeCarSlide].stage}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white font-display uppercase tracking-wide">
                    {CAR_SHOWCASES[activeCarSlide].title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-red-400 bg-black/60 px-2.5 py-0.5 rounded-lg border border-neutral-800">
                    {CAR_SHOWCASES[activeCarSlide].handle}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-mono">
                  Owner: <span className="text-white font-semibold">{CAR_SHOWCASES[activeCarSlide].owner}</span>
                </p>
                <p className="text-[11px] text-neutral-400 line-clamp-1 pt-0.5">
                  {CAR_SHOWCASES[activeCarSlide].specs}
                </p>
              </div>
            </div>

            {/* Slider Selectors */}
            <div className="grid grid-cols-3 gap-2.5">
              {CAR_SHOWCASES.map((car, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCarSlide(idx as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeCarSlide === idx
                      ? 'bg-[#181818] border-[#E50914] text-white shadow-lg'
                      : 'bg-[#121212] border-[#222222] text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{car.title}</p>
                  <p className="text-[10px] font-mono text-red-400 truncate">{car.handle}</p>
                </button>
              ))}
            </div>

            {/* Platform Feature Highlight Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-neutral-400 font-mono">
              <span className="bg-[#141414] border border-[#222222] px-3 py-1 rounded-full flex items-center gap-1.5">
                <Car className="w-3 h-3 text-[#E50914]" /> Dedicated Car Profiles
              </span>
              <span className="bg-[#141414] border border-[#222222] px-3 py-1 rounded-full flex items-center gap-1.5">
                <Wrench className="w-3 h-3 text-emerald-400" /> Compatible Parts & Tools
              </span>
              <span className="bg-[#141414] border border-[#222222] px-3 py-1 rounded-full flex items-center gap-1.5">
                <Store className="w-3 h-3 text-amber-400" /> Verified Indian Workshops
              </span>
            </div>

          </div>

          {/* RIGHT: Login Box (Instagram-Style Clean Form) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Primary Login Card */}
            <div className="w-full max-w-sm bg-[#121212] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Brand Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#E50914] text-white font-display font-black text-2xl shadow-xl shadow-red-950/40 mb-1">
                  C
                </div>
                <h2 className="text-2xl font-black text-white font-display tracking-wider">
                  CARIX<span className="text-[#E50914]">.</span>
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Log in to your automotive identity & garage
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleStandardLogin} className="space-y-3.5">
                
                {/* Username / Phone / Email */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="Phone number, username, or email"
                      className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 pr-10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Log In Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 bg-[#E50914] hover:bg-[#c90812] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </span>
                  ) : (
                    <span>Log In</span>
                  )}
                </button>

                {/* Google Cloud One-Click Sign In */}
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full py-2.5 px-4 bg-white hover:bg-neutral-100 active:scale-[0.99] text-neutral-900 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google Cloud</span>
                </button>

                {/* Cloud Sync Status Badge */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 py-1 px-2.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Firebase Cloud Firestore & Storage Active</span>
                </div>

              </form>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#262626] w-full" />
                <span className="bg-[#121212] px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest shrink-0">
                  OR DEMO ACCESS
                </span>
                <div className="border-t border-[#262626] w-full" />
              </div>

              {/* Quick Login Options */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleQuickLoginMantra}
                  className="w-full py-2 px-3 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] text-xs font-semibold text-neutral-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                    <span>Mantra Tiwari (Founder)</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-red-400">
                    @mantra_tiwari_999 →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickLoginShop}
                  className="w-full py-2 px-3 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#2a2a2a] text-xs font-semibold text-neutral-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Stealth Auto Labs (Shop)</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-emerald-400">
                    Partner Portal →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleGuestExplore}
                  className="w-full py-1.5 px-3 rounded-xl bg-transparent hover:bg-neutral-900 text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors text-center"
                >
                  ⚡ Explore platform as Guest
                </button>
              </div>

            </div>

            {/* Sign Up Card (Instagram Style) */}
            <div className="w-full max-w-sm mt-3 bg-[#121212] border border-[#262626] rounded-2xl p-4 text-center">
              <p className="text-xs text-neutral-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsOnboardingOpen(true)}
                  className="font-bold text-[#E50914] hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Founder Note */}
            <div className="w-full max-w-sm mt-4 text-center text-[11px] text-neutral-500 font-mono">
              <p>Visionary: Mantra Tiwari (@mantra_tiwari_999)</p>
              <p className="text-[10px] pt-0.5">Official email: carix.modifications@gmail.com</p>
            </div>

          </div>

        </div>
      </div>

      {/* Footer Legal & Links */}
      <footer className="p-4 sm:p-6 border-t border-[#181818] text-center text-xs text-neutral-500 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px]">
          <button onClick={() => setLegalModalType('terms')} className="hover:text-neutral-300">
            Terms of Service
          </button>
          <button onClick={() => setLegalModalType('privacy')} className="hover:text-neutral-300">
            Privacy Policy
          </button>
          <button onClick={() => setLegalModalType('guidelines')} className="hover:text-neutral-300">
            Community Guidelines
          </button>
          <a href="https://instagram.com/carix.in" target="_blank" rel="noreferrer" className="hover:text-red-400">
            Instagram: @carix.in
          </a>
        </div>
        <p className="text-[10px] font-mono text-neutral-600">
          © 2026 CARIX. “YOUR CAR. YOUR IDENTITY.” All rights reserved.
        </p>
      </footer>

      {/* Onboarding Modal for Signup */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

    </div>
  );
};
