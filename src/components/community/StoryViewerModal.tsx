import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ChevronLeft, ChevronRight, Heart, Send, 
  ShieldCheck, Car, Gauge, CheckCircle2, Music, Disc, Volume2, VolumeX 
} from 'lucide-react';

export const StoryViewerModal: React.FC = () => {
  const { activeStory, setActiveStory, stories, showToast } = useApp();
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!activeStory) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory?.id]);

  if (!activeStory) return null;

  const currentIndex = stories.findIndex(s => s.id === activeStory.id);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setActiveStory(stories[currentIndex + 1]);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveStory(stories[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container simulating phone view */}
      <div 
        className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[850px] bg-[#121212] rounded-3xl overflow-hidden border border-[#262626] shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image / Video */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeStory.mediaUrl}
            alt={activeStory.caption || 'CARIX Story'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70" />
        </div>

        {/* Top Header & Progress */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#E50914] h-full transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Author Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={activeStory.authorAvatar}
                alt={activeStory.authorUsername}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#E50914]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">
                    @{activeStory.carUsername || activeStory.authorUsername}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {activeStory.timestamp}
                  </span>
                </div>
                {activeStory.isDriveExperience && (
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Verified Drive Experience
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveStory(null)}
              className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drive Experience Proof Tag banner if present */}
          {activeStory.isDriveExperience && activeStory.mentionedCarHandle && (
            <div className="p-2.5 bg-black/75 backdrop-blur-md rounded-2xl border border-emerald-900/60 flex items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">DRIVEN VEHICLE</span>
                  <p className="text-xs font-bold text-emerald-300 font-mono">{activeStory.mentionedCarHandle}</p>
                </div>
              </div>

              {activeStory.driverSeatProofUrl && (
                <div className="flex items-center gap-1.5 bg-[#181818] p-1 px-2 rounded-xl border border-neutral-700">
                  <img
                    src={activeStory.driverSeatProofUrl}
                    alt="Cockpit Proof"
                    className="w-5 h-5 rounded-md object-cover"
                  />
                  <span className="text-[9px] font-mono text-emerald-400">Driver Seat Proof ✓</span>
                </div>
              )}
            </div>
          )}

          {/* Attached Audio Track Badge (Requested: "taaki story m log song laga sake") */}
          {activeStory.audioTitle && (
            <div className="flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs shadow-lg">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-full bg-[#E50914] flex items-center justify-center text-white shrink-0">
                  <Disc className="w-3 h-3 animate-spin [animation-duration:3s]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-white truncate block">
                    {activeStory.audioTitle}
                  </span>
                  {activeStory.audioArtist && (
                    <span className="text-[9px] text-neutral-400 font-mono block -mt-0.5 truncate">
                      {activeStory.audioArtist}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-2.5 bg-[#E50914] animate-pulse rounded-full" />
                  <span className="w-1 h-3.5 bg-amber-400 animate-pulse rounded-full delay-75" />
                  <span className="w-1 h-2 bg-red-400 animate-pulse rounded-full delay-150" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-neutral-200" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tap areas for previous/next */}
        <div className="absolute inset-y-20 inset-x-0 z-0 flex">
          <div className="w-1/2 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-1/2 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Content & Reactions */}
        <div className="relative z-10 p-5 space-y-3">
          {activeStory.caption && (
            <p className="text-xs text-white leading-relaxed bg-black/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
              {activeStory.caption}
            </p>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Send message to driver..."
              className="flex-1 bg-black/60 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#E50914]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  showToast('Reply sent to driver!');
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
            <button
              onClick={() => showToast('Liked story!')}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:text-red-500 transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows for Desktop */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/20 items-center justify-center text-white hover:bg-black"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/20 items-center justify-center text-white hover:bg-black"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

      </div>
    </div>
  );
};
