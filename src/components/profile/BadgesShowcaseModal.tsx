import React from 'react';
import { CarixBadge } from '../../types';
import { getBadgeTierStyle } from '../../data/badgesData';
import { 
  X, Award, CheckCircle2, Lock, Sparkles, 
  Wrench, Trophy, MessageSquare, ShieldCheck, 
  Flame, Hammer, Crown, Compass, Gauge, Shield 
} from 'lucide-react';

interface BadgesShowcaseModalProps {
  badge: CarixBadge | null;
  onClose: () => void;
  onTogglePin?: (badgeId: string) => void;
}

export const BadgesShowcaseModal: React.FC<BadgesShowcaseModalProps> = ({
  badge,
  onClose,
  onTogglePin
}) => {
  if (!badge) return null;

  const style = getBadgeTierStyle(badge.tier);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-8 h-8" />;
      case 'Wrench': return <Wrench className="w-8 h-8" />;
      case 'MessageSquare': return <MessageSquare className="w-8 h-8" />;
      case 'Trophy': return <Trophy className="w-8 h-8" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Flame': return <Flame className="w-8 h-8" />;
      case 'Hammer': return <Hammer className="w-8 h-8" />;
      case 'Compass': return <Compass className="w-8 h-8" />;
      case 'Gauge': return <Gauge className="w-8 h-8" />;
      default: return <Award className="w-8 h-8" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md bg-[#121212] border ${style.border} rounded-3xl p-6 shadow-2xl text-white space-y-6 relative overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${style.bg}`} />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full ${style.badgePill}`}>
            {badge.tier.toUpperCase()} TIER
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badge Hero Icon */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10 pt-2">
          <div className={`w-20 h-20 rounded-3xl border-2 ${style.border} ${style.bg} ${style.glow} flex items-center justify-center ${style.text}`}>
            {getBadgeIcon(badge.icon)}
          </div>

          <div>
            <h3 className="text-xl font-bold font-display text-white">{badge.title}</h3>
            <p className="text-xs text-neutral-400 font-mono mt-0.5 uppercase tracking-wider">
              Category: {badge.category.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#181818] border border-[#262626] rounded-2xl p-4 text-xs text-neutral-300 leading-relaxed space-y-2 relative z-10">
          <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">ACHIEVEMENT CRITERIA</span>
          <p>{badge.description}</p>
        </div>

        {/* Progress or Unlock Status */}
        <div className="relative z-10 space-y-2">
          {badge.isUnlocked ? (
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 flex items-center justify-between text-xs text-emerald-300 font-mono">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>UNLOCKED & EARNED</span>
              </span>
              <span className="text-[11px] text-neutral-400">
                {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : 'Active'}
              </span>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>PROGRESS TO UNLOCK</span>
                </span>
                {badge.progress && (
                  <span className="text-white font-bold">
                    {badge.progress.current} / {badge.progress.max} {badge.progress.unit}
                  </span>
                )}
              </div>

              {badge.progress && (
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#E50914] h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (badge.progress.current / badge.progress.max) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Exclusive Perk */}
        {badge.perk && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/30 to-[#191919] border border-red-900/40 text-xs text-neutral-300 space-y-1 relative z-10">
            <span className="text-[10px] font-mono text-[#E50914] uppercase tracking-wider block font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              DIGITAL BADGE PRIVILEGE
            </span>
            <p className="text-[11px] text-neutral-200">{badge.perk}</p>
          </div>
        )}

        {/* Pin button */}
        {badge.isUnlocked && onTogglePin && (
          <div className="pt-2 relative z-10">
            <button
              onClick={() => onTogglePin(badge.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-md ${
                badge.isFeatured
                  ? 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:text-white'
                  : 'bg-[#E50914] hover:bg-[#c90812] text-white'
              }`}
            >
              {badge.isFeatured ? '★ Pinned to Profile Header' : '☆ Pin Badge to Profile Header'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
