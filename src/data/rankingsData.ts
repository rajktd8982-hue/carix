import { LeaderboardRankItem } from '../types';

export interface RegionState {
  name: string;
  districts: string[];
}

export const INDIAN_REGIONS: RegionState[] = [
  {
    name: 'Maharashtra',
    districts: ['All Districts', 'Mumbai Suburban', 'Mumbai City', 'Pune', 'Thane', 'Nagpur', 'Nashik']
  },
  {
    name: 'Delhi NCR',
    districts: ['All Districts', 'New Delhi', 'South Delhi', 'Gurugram', 'Noida', 'North Delhi', 'Faridabad']
  },
  {
    name: 'Karnataka',
    districts: ['All Districts', 'Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Belagavi']
  },
  {
    name: 'Punjab',
    districts: ['All Districts', 'Ludhiana', 'Amritsar', 'Jalandhar', 'SAS Nagar (Mohali)', 'Patiala']
  },
  {
    name: 'Kerala',
    districts: ['All Districts', 'Ernakulam (Kochi)', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Malappuram']
  },
  {
    name: 'Gujarat',
    districts: ['All Districts', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
  },
  {
    name: 'Tamil Nadu',
    districts: ['All Districts', 'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli']
  },
  {
    name: 'Uttar Pradesh',
    districts: ['All Districts', 'Lucknow', 'Kanpur', 'Gautam Buddha Nagar (Noida)', 'Varanasi', 'Agra']
  },
  {
    name: 'Telangana',
    districts: ['All Districts', 'Hyderabad', 'Rangareddy', 'Warangal']
  }
];

export const INITIAL_LEADERBOARD_LIKES: LeaderboardRankItem[] = [
  {
    id: 'rank_l_1',
    rank: 1,
    type: 'car',
    title: 'Volkswagen Virtus GT (Midnight Edition)',
    username: 'midnight_virtus',
    carModel: 'Virtus 1.5 TSI DSG',
    avatar: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    scoreMetric: 28450,
    badge: 'Stage 2 Stance King',
    isCurrentUser: true
  },
  {
    id: 'rank_l_2',
    rank: 2,
    type: 'car',
    title: 'Mahindra Thar 4x4 (Vajra Edition)',
    username: 'vajra_thar',
    carModel: 'Thar LX Hard Top',
    avatar: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    scoreMetric: 22100,
    badge: 'Overland Armor Monster'
  },
  {
    id: 'rank_l_3',
    rank: 3,
    type: 'car',
    title: 'Skoda Slavia 1.5 Monte Carlo',
    username: 'slavia_aero_delhi',
    carModel: 'Slavia 1.5 TSI',
    avatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
    state: 'Delhi NCR',
    district: 'South Delhi',
    scoreMetric: 19800,
    badge: 'Carbon Splitter Track Spec'
  },
  {
    id: 'rank_l_4',
    rank: 4,
    type: 'car',
    title: 'Hyundai Verna 1.5 Turbo N-Line Spec',
    username: 'verna_blackhawk',
    carModel: 'Verna 1.5 Turbo DCT',
    avatar: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    scoreMetric: 17400,
    badge: 'Valvetronic Quad Exhaust'
  },
  {
    id: 'rank_l_5',
    rank: 5,
    type: 'car',
    title: 'Mahindra Scorpio-N Black Edition',
    username: 'beast_scorpio_punjab',
    carModel: 'Scorpio-N Z8L 4x4',
    avatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    state: 'Punjab',
    district: 'Ludhiana',
    scoreMetric: 15900,
    badge: 'Fuel Offroad 20" Alloys'
  },
  {
    id: 'rank_l_6',
    rank: 6,
    type: 'car',
    title: 'Polo GT TSI Stage 3 Pure Track',
    username: 'kerala_polo_club',
    carModel: 'Volkswagen Polo GT',
    avatar: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80',
    state: 'Kerala',
    district: 'Ernakulam (Kochi)',
    scoreMetric: 14200,
    badge: '220 HP Pocket Rocket'
  }
];

export const INITIAL_LEADERBOARD_FOLLOWERS: LeaderboardRankItem[] = [
  {
    id: 'rank_f_1',
    rank: 1,
    type: 'user',
    title: 'Mantra Tiwari (Founder & Creator)',
    username: 'mantra_tiwari_999',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    scoreMetric: 48900,
    badge: 'CARIX Visionary & Virtus Stance',
    isCurrentUser: true
  },
  {
    id: 'rank_f_2',
    rank: 2,
    type: 'user',
    title: 'Kabir Oberoi (Track & Drift)',
    username: 'kabir_drift_delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    state: 'Delhi NCR',
    district: 'Gurugram',
    scoreMetric: 34500,
    badge: 'Buddh International Circuit Regular'
  },
  {
    id: 'rank_f_3',
    rank: 3,
    type: 'car',
    title: 'Midnight Virtus GT Profile',
    username: 'midnight_virtus',
    avatar: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    scoreMetric: 31200,
    badge: 'Most Followed Sedan in India'
  },
  {
    id: 'rank_f_4',
    rank: 4,
    type: 'user',
    title: 'Arjun Das (Bangalore Stance Guild)',
    username: 'arjun_slammed_blr',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    scoreMetric: 27800,
    badge: 'Static Low Life Advocate'
  },
  {
    id: 'rank_f_5',
    rank: 5,
    type: 'user',
    title: 'Gurpreet Singh (Punjab Offroad)',
    username: 'gurpreet_4x4_punjab',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    state: 'Punjab',
    district: 'SAS Nagar (Mohali)',
    scoreMetric: 24100,
    badge: 'Expedition Leader'
  }
];

export const INITIAL_LEADERBOARD_SHOPPING: LeaderboardRankItem[] = [
  {
    id: 'rank_s_1',
    rank: 1,
    type: 'shopper',
    title: 'Mantra Tiwari',
    username: 'mantra_tiwari_999',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    scoreMetric: 485000, // ₹4.85 Lakhs
    shoppingLevel: 'Titanium',
    preferredShops: ['Stealth Auto Labs', 'MaxBHP Performance', 'Prad 4x4'],
    badge: 'Level 5 Titanium Builder',
    isCurrentUser: true,
    isPrivate: false
  },
  {
    id: 'rank_s_2',
    rank: 2,
    type: 'shopper',
    title: 'Vikramaditya Rao',
    username: 'vikram_m3_blr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    scoreMetric: 395000,
    shoppingLevel: 'Titanium',
    preferredShops: ['Speedworks Bangalore', 'Autologue Design'],
    badge: 'Level 5 Titanium Builder',
    isPrivate: false
  },
  {
    id: 'rank_s_3',
    rank: 3,
    type: 'shopper',
    title: 'Private Enthusiast',
    username: 'hidden_modder',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    state: 'Delhi NCR',
    district: 'South Delhi',
    scoreMetric: 280000,
    shoppingLevel: 'Platinum',
    preferredShops: ['Red Rooster Delhi', 'Stealth Auto Labs'],
    badge: 'Level 4 Platinum Builder (Hidden Identity)',
    isPrivate: true
  },
  {
    id: 'rank_s_4',
    rank: 4,
    type: 'shopper',
    title: 'Rohan Deshmukh',
    username: 'rohan_thar_pune',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    district: 'Pune',
    scoreMetric: 210000,
    shoppingLevel: 'Platinum',
    preferredShops: ['Autologue Design', 'Bimbra 4x4'],
    badge: 'Level 4 Platinum Builder',
    isPrivate: false
  },
  {
    id: 'rank_s_5',
    rank: 5,
    type: 'shopper',
    title: 'Amanpreet Chawla',
    username: 'aman_turbo_chd',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    state: 'Punjab',
    district: 'Ludhiana',
    scoreMetric: 145000,
    shoppingLevel: 'Gold',
    preferredShops: ['Stealth Auto Labs', 'Monster Customs'],
    badge: 'Level 3 Gold Builder',
    isPrivate: false
  },
  {
    id: 'rank_s_6',
    rank: 6,
    type: 'shopper',
    title: 'Aditya Nair',
    username: 'aditya_slavia_kochi',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    state: 'Kerala',
    district: 'Ernakulam (Kochi)',
    scoreMetric: 85000,
    shoppingLevel: 'Silver',
    preferredShops: ['Pete’s Tuning Kochi'],
    badge: 'Level 2 Silver Builder',
    isPrivate: false
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep_1',
    reporterId: 'user_102',
    reporterUsername: 'rohit_punjab',
    targetType: 'user' as const,
    targetId: 'bad_user_99',
    targetUsername: 'fake_exhaust_seller',
    targetTitle: 'Selling duplicate Chinese valvetronic mufflers as Akrapovic',
    reason: 'spam_scam' as const,
    details: 'User is DMing members asking for advance GPay payment and not sending tracking details.',
    status: 'pending' as const,
    createdAt: '2026-10-02T14:30:00Z'
  },
  {
    id: 'rep_2',
    reporterId: 'user_105',
    reporterUsername: 'delhi_modder',
    targetType: 'post' as const,
    targetId: 'post_sp_1',
    targetUsername: 'street_reckless_racer',
    targetTitle: 'Reckless stunt video on public highway without safety precautions',
    reason: 'dangerous_driving' as const,
    details: 'Post promotes 190 km/h zig-zagging in city traffic, violating community safety standards.',
    status: 'pending' as const,
    createdAt: '2026-10-03T08:15:00Z'
  }
];
