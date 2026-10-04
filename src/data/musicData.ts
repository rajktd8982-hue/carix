export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  category: 'car_sounds' | 'punjabi_hiphop' | 'phonk_drift' | 'night_drive';
  duration: string;
  coverImage: string;
  audioUrl?: string; // Audio link or sound generator
  useCount: string;
  isTrending?: boolean;
}

export const CARIX_MUSIC_LIBRARY: SongTrack[] = [
  {
    id: 'track-virtus-spool',
    title: '1.5 TSI Turbo Spool & Valvetronic Pops',
    artist: 'CARIX Pure Exhaust Audio',
    category: 'car_sounds',
    duration: '0:30',
    coverImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80',
    useCount: '18.4K reels',
    isTrending: true
  },
  {
    id: 'track-baller',
    title: 'Baller',
    artist: 'Shubh',
    category: 'punjabi_hiphop',
    duration: '0:45',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    useCount: '94.2K reels',
    isTrending: true
  },
  {
    id: 'track-cheques',
    title: 'Cheques',
    artist: 'Shubh',
    category: 'punjabi_hiphop',
    duration: '0:45',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80',
    useCount: '124K reels',
    isTrending: true
  },
  {
    id: 'track-daku',
    title: 'Daku',
    artist: 'Chani Nattan & Inderpal Moga',
    category: 'punjabi_hiphop',
    duration: '0:35',
    coverImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    useCount: '88.9K reels',
    isTrending: true
  },
  {
    id: 'track-tokyo-drift',
    title: 'Tokyo Drift (Aggressive Phonk Remix)',
    artist: 'Phonk Collective & Drift King',
    category: 'phonk_drift',
    duration: '0:30',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
    useCount: '52.1K reels',
    isTrending: true
  },
  {
    id: 'track-295',
    title: '295',
    artist: 'Sidhu Moose Wala',
    category: 'punjabi_hiphop',
    duration: '0:45',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    useCount: '78.5K reels',
    isTrending: true
  },
  {
    id: 'track-thar-crawling',
    title: '4x4 Trail Low-Range Rumble & Mud Note',
    artist: 'Mahindra Thar V6 Raw Audio',
    category: 'car_sounds',
    duration: '0:30',
    coverImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    useCount: '34.2K reels',
    isTrending: false
  },
  {
    id: 'track-sea-link',
    title: 'Night Drive Synthwave (Mumbai Sea Link 2 AM)',
    artist: 'Midnight Horizon',
    category: 'night_drive',
    duration: '0:40',
    coverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=300&q=80',
    useCount: '29.7K reels',
    isTrending: true
  },
  {
    id: 'track-antilag',
    title: 'Twin-Turbo Anti-Lag 2-Step Backfire Flames',
    artist: 'Supra & GT-R Tuner Note',
    category: 'car_sounds',
    duration: '0:20',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
    useCount: '46.8K reels',
    isTrending: true
  },
  {
    id: 'track-winning-speech',
    title: 'Winning Speech',
    artist: 'Karan Aujla',
    category: 'punjabi_hiphop',
    duration: '0:40',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80',
    useCount: '62.4K reels',
    isTrending: true
  }
];
