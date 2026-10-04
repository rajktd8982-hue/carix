import { CarixBadge } from '../types';

export const INITIAL_CARIX_BADGES: CarixBadge[] = [
  {
    id: 'badge-founder',
    title: 'CARIX Founder & Visionary',
    description: 'Conceived and engineered the CARIX Automotive Identity Network and the legendary MidNight Virtus GT build.',
    category: 'special',
    tier: 'legendary',
    icon: 'Crown',
    unlockedAt: '2026-01-01',
    isUnlocked: true,
    isFeatured: true,
    perk: 'Exclusive Founder Halo Avatar Border & Platform Super Admin Authority'
  },
  {
    id: 'badge-stage2-builder',
    title: 'Stage 2 Master Builder',
    description: 'Engineered a verified Stage 2 tuning setup, performance downpipe, and track stance on a registered car.',
    category: 'builder',
    tier: 'platinum',
    icon: 'Wrench',
    unlockedAt: '2026-02-15',
    isUnlocked: true,
    isFeatured: true,
    progress: { current: 5, max: 5, unit: 'mods installed' },
    perk: 'Custom Stage 2 Builder Tag on all social posts and build logs'
  },
  {
    id: 'badge-discussion-leader',
    title: 'Community Maestro (Discussion Leader)',
    description: 'Active contributor in community discussions, helping other enthusiasts solve fitment issues and build choices.',
    category: 'community',
    tier: 'gold',
    icon: 'MessageSquare',
    unlockedAt: '2026-03-10',
    isUnlocked: true,
    isFeatured: true,
    progress: { current: 34, max: 25, unit: 'helpful suggestions' },
    perk: 'Gold Highlighted Comments in Community Feed suggestion threads'
  },
  {
    id: 'badge-top-ranked',
    title: 'National Top 10 Builder',
    description: 'Ranked in the Top 10 on the All-India CARIX Automotive Leaderboard (#1 in Maharashtra).',
    category: 'builder',
    tier: 'platinum',
    icon: 'Trophy',
    unlockedAt: '2026-03-20',
    isUnlocked: true,
    isFeatured: true,
    perk: 'Golden Trophy Icon beside name on all district and state leaderboards'
  },
  {
    id: 'badge-cockpit-pilot',
    title: 'Verified Cockpit Pilot',
    description: 'Completed verified Drive Experiences with driver seat steering POV and vehicle exterior match proofs.',
    category: 'driver',
    tier: 'gold',
    icon: 'ShieldCheck',
    unlockedAt: '2026-03-25',
    isUnlocked: true,
    isFeatured: false,
    progress: { current: 3, max: 3, unit: 'verified drives' },
    perk: 'Instant Verification on future drive experience stories and reviews'
  },
  {
    id: 'badge-titanium-spender',
    title: 'Level 5 Titanium Spender',
    description: 'Invested ₹4,00,000+ in verified parts, custom wraps, and certified workshop builds.',
    category: 'shopper',
    tier: 'legendary',
    icon: 'Sparkles',
    unlockedAt: '2026-04-01',
    isUnlocked: true,
    isFeatured: false,
    progress: { current: 485000, max: 400000, unit: '₹ spent' },
    perk: 'VIP Priority Service & Direct Workshop Concierge at Partner Garages'
  },
  {
    id: 'badge-diy-pro',
    title: 'DIY Installation Pro',
    description: 'Successfully installed aftermarket tools and aesthetic modifications following step-by-step DIY guides.',
    category: 'builder',
    tier: 'silver',
    icon: 'Hammer',
    unlockedAt: '2026-04-10',
    isUnlocked: true,
    isFeatured: false,
    progress: { current: 4, max: 3, unit: 'DIY parts installed' },
    perk: 'Verified DIY Badge on Marketplace product reviews'
  },
  {
    id: 'badge-viral-build',
    title: 'Viral Build Sensation',
    description: 'Car profile or build reel surpassed 25,000+ community likes across India.',
    category: 'builder',
    tier: 'gold',
    icon: 'Flame',
    unlockedAt: '2026-04-15',
    isUnlocked: true,
    isFeatured: false,
    progress: { current: 28450, max: 25000, unit: 'likes' },
    perk: 'Permanent Feature in Explore Hall of Fame'
  },
  {
    id: 'badge-community-guardian',
    title: 'Community Guardian',
    description: 'Reported fake modification claims or unsafe driving violations to preserve community trust.',
    category: 'community',
    tier: 'silver',
    icon: 'Shield',
    unlockedAt: '2026-05-01',
    isUnlocked: true,
    isFeatured: false,
    progress: { current: 2, max: 2, unit: 'reports resolved' },
    perk: 'Trusted Reporter Badge with immediate admin queue escalation'
  },
  {
    id: 'badge-overland-explorer',
    title: 'Overland Expedition Trailblazer',
    description: 'Logged 4x4 trail expeditions with winch recovery and rock crawling terrain logs.',
    category: 'driver',
    tier: 'bronze',
    icon: 'Compass',
    isUnlocked: false,
    progress: { current: 2, max: 5, unit: 'trails logged' },
    perk: 'Overland Badge on 4x4 offroad posts'
  },
  {
    id: 'badge-dyno-king',
    title: 'Dyno Chart Certified',
    description: 'Uploaded verified dyno sheet showing 200+ Wheel Horsepower on an Indian dynamometer.',
    category: 'builder',
    tier: 'platinum',
    icon: 'Gauge',
    isUnlocked: false,
    progress: { current: 0, max: 1, unit: 'dyno sheet verified' },
    perk: 'Verified Dyno Power stamp on car performance card'
  }
];

export const getBadgeTierStyle = (tier: CarixBadge['tier']) => {
  switch (tier) {
    case 'legendary':
      return {
        border: 'border-amber-400/80',
        bg: 'bg-gradient-to-br from-amber-950/60 via-red-950/40 to-black',
        text: 'text-amber-300',
        glow: 'shadow-lg shadow-amber-500/20',
        badgePill: 'bg-gradient-to-r from-amber-500 to-red-600 text-black font-black'
      };
    case 'platinum':
      return {
        border: 'border-cyan-400/80',
        bg: 'bg-gradient-to-br from-cyan-950/60 via-blue-950/40 to-black',
        text: 'text-cyan-300',
        glow: 'shadow-lg shadow-cyan-500/20',
        badgePill: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black'
      };
    case 'gold':
      return {
        border: 'border-yellow-400/70',
        bg: 'bg-gradient-to-br from-yellow-950/50 via-neutral-900 to-black',
        text: 'text-yellow-300',
        glow: 'shadow-md shadow-yellow-500/15',
        badgePill: 'bg-amber-400 text-black font-bold'
      };
    case 'silver':
      return {
        border: 'border-slate-400/70',
        bg: 'bg-gradient-to-br from-slate-900/60 via-neutral-900 to-black',
        text: 'text-slate-200',
        glow: 'shadow-sm shadow-slate-400/10',
        badgePill: 'bg-slate-300 text-black font-bold'
      };
    default:
      return {
        border: 'border-orange-500/50',
        bg: 'bg-gradient-to-br from-orange-950/40 via-neutral-900 to-black',
        text: 'text-orange-300',
        glow: 'shadow-xs',
        badgePill: 'bg-orange-500 text-white font-semibold'
      };
  }
};
