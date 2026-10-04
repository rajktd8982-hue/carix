import React, { useState, useRef, useEffect } from 'react';
import { CARIX_MUSIC_LIBRARY, SongTrack } from '../../data/musicData';
import { 
  X, Search, Music, Play, Pause, Flame, 
  Disc, Check, Sparkles, Volume2, VolumeX, Plus 
} from 'lucide-react';

interface SongPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSong: (song: { title: string; artist: string; audioUrl?: string }) => void;
  currentSongTitle?: string;
}

export const SongPickerModal: React.FC<SongPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectSong,
  currentSongTitle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'car_sounds' | 'punjabi_hiphop' | 'phonk_drift' | 'night_drive'>('all');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Audio Context simulation for realistic exhaust revs & beats
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  if (!isOpen) return null;

  const stopAudio = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    } catch {
      // ignore
    }
  };

  const playPreviewSound = (trackId: string, category: string) => {
    if (playingTrackId === trackId) {
      stopAudio();
      setPlayingTrackId(null);
      return;
    }

    stopAudio();
    setPlayingTrackId(trackId);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Configure distinct frequency sounds for car exhaust vs music rhythm
      if (category === 'car_sounds') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.8);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 1.6);
      } else if (category === 'phonk_drift') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.5);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.0);
      }

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;

      // Auto stop preview after 3.2s
      setTimeout(() => {
        if (playingTrackId === trackId) {
          setPlayingTrackId(null);
        }
      }, 3200);
    } catch {
      // Audio fallback
    }
  };

  const filteredTracks = CARIX_MUSIC_LIBRARY.filter(t => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSelect = (track: SongTrack) => {
    stopAudio();
    onSelectSong({
      title: track.title,
      artist: track.artist,
      audioUrl: track.audioUrl
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    stopAudio();
    onSelectSong({
      title: customTitle.trim(),
      artist: customArtist.trim() || 'Original Audio',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-[#141414] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E50914] flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">CARIX Audio & Songs</h3>
              <p className="text-[11px] text-neutral-400">
                Attach trending car songs & raw exhaust notes to your story, post, or reel
              </p>
            </div>
          </div>

          <button
            onClick={() => { stopAudio(); onClose(); }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#1f1f1f] bg-[#111111]">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audio, songs, turbo sounds, phonk..."
              className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 text-[11px] font-mono">
            {[
              { id: 'all', label: '🔥 All Tracks' },
              { id: 'car_sounds', label: '🏎️ Raw Car Sounds' },
              { id: 'punjabi_hiphop', label: '🎵 Punjabi & Hip-Hop' },
              { id: 'phonk_drift', label: '🚗 Phonk & Drift' },
              { id: 'night_drive', label: '🌃 Night Drive' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#E50914] text-white font-bold shadow-xs'
                    : 'bg-[#181818] text-neutral-400 hover:text-white border border-[#282828]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Audio Option Toggle */}
        <div className="px-4 py-2 bg-[#161616] border-b border-[#222222] flex items-center justify-between text-xs">
          <span className="text-neutral-400 font-mono text-[11px]">Cannot find your song?</span>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-[#E50914] hover:underline font-semibold flex items-center gap-1 text-[11px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showCustomInput ? 'Hide Custom Audio' : '+ Enter Custom Audio'}</span>
          </button>
        </div>

        {showCustomInput && (
          <form onSubmit={handleCustomSubmit} className="p-4 bg-[#181818] border-b border-[#222222] space-y-2.5 animate-in fade-in">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">Custom Song or Exhaust Audio</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Song Title (e.g. Bandana)"
                required
                className="bg-[#121212] border border-[#2c2c2c] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
              />
              <input
                type="text"
                value={customArtist}
                onChange={(e) => setCustomArtist(e.target.value)}
                placeholder="Artist or Car Note"
                className="bg-[#121212] border border-[#2c2c2c] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold rounded-xl transition-colors shadow-md"
            >
              Use Custom Audio
            </button>
          </form>
        )}

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredTracks.map(track => {
            const isPlaying = playingTrackId === track.id;
            const isSelected = currentSongTitle === track.title;

            return (
              <div
                key={track.id}
                className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'bg-red-950/30 border-red-800/80 shadow-md'
                    : 'bg-[#181818] border-[#242424] hover:border-neutral-600'
                }`}
              >
                {/* Left: Album cover & Play button */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-black shrink-0 border border-neutral-700">
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => playPreviewSound(track.id, track.category)}
                      className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${
                        isPlaying ? 'opacity-100 text-[#E50914]' : 'opacity-0 group-hover:opacity-100 text-white'
                      }`}
                      title={isPlaying ? 'Pause preview' : 'Play audio preview'}
                    >
                      {isPlaying ? (
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-[#E50914] animate-pulse rounded-full" />
                          <span className="w-1 h-4 bg-[#E50914] animate-pulse rounded-full delay-75" />
                          <span className="w-1 h-2 bg-[#E50914] animate-pulse rounded-full delay-150" />
                        </div>
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white truncate group-hover:text-red-300 transition-colors">
                        {track.title}
                      </p>
                      {track.isTrending && (
                        <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-1.5 py-0.2 rounded-full shrink-0 flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {track.artist} · <span className="font-mono text-[10px] text-neutral-500">{track.useCount}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Select button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => playPreviewSound(track.id, track.category)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Preview sound"
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(track)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-xs'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>Use Song</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
