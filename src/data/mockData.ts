import { 
  User, UserCar, CommunityPost, Product, Shop, 
  NotificationItem, MessageThread, StoryItem, ReelItem 
} from '../types';
import { INITIAL_CARIX_BADGES } from './badgesData';

export const CURRENT_USER: User = {
  id: 'user-mantra',
  username: 'mantra_tiwari_999',
  displayName: 'Mantra Tiwari',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Founder & Visionary — CARIX. Building the automotive identity and modification ecosystem. “YOUR CAR. YOUR IDENTITY.” 🏎️🇮🇳',
  location: 'Mumbai, India',
  accountType: 'personal',
  isVerified: true,
  role: 'admin',
  carsOwnedCount: 2,
  followersCount: 14800,
  followingCount: 342,
  interests: ['Car Modifications', 'Modified Cars', 'Car Edits', 'Car Reels', 'Performance', 'Wheels', 'Indian Cars'],
  followedBrands: ['Volkswagen', 'Mahindra', 'Skoda', 'Hyundai'],
  followedCars: ['midnight_virtus', 'vajra_thar', 'slavia_vrs_india'],
  badges: INITIAL_CARIX_BADGES,
  featuredBadgeId: 'badge-founder'
};

export const INITIAL_USER_CARS: UserCar[] = [
  {
    id: 'car-virtus-midnight',
    userId: 'user-mantra',
    ownerUsername: 'mantra_tiwari_999',
    carName: 'MIDNIGHT',
    carUsername: 'midnight_virtus',
    make: 'Volkswagen',
    model: 'Virtus',
    variant: 'GT Plus 1.5 TSI DSG',
    year: 2026,
    color: 'Candy White & Obsidian Black',
    fuelType: 'Petrol',
    transmission: 'Automatic (DSG/DCT)',
    stage: 'Stage 2 Exterior & Stance',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
    buildStory: 'Born as a daily cruiser. Transformed with 3-piece front lip, 17" flow-formed alloys, Cobra 30mm progressive springs, and BMC carbon airbox.',
    likesCount: 1890,
    followersCount: 4210,
    postsCount: 18,
    buildProgress: {
      exterior: 85,
      wheels: 100,
      lighting: 60,
      performance: 45,
      interior: 30
    },
    registrationNumber: 'MH 02 ER 9999',
    isRegNumberPublic: false, // Default private!
    purchaseYear: 2024,
    mileage: '18,500 km',
    instagramHandle: '@midnight_virtus',
    isFollowed: true,
    modifications: [
      { id: 'm1', name: 'AeroCraft 3-Piece Gloss Black Front Lip', category: 'Front Lips', shopName: 'Stealth Auto Labs, Mumbai', cost: 16500, stageImpact: '+15% Low Stance' },
      { id: 'm2', name: 'Apex Hyper-Multi Spoke 17x7.5J Alloys', category: 'Alloys', shopName: 'Apex Dynamics, Hyderabad', cost: 68000, stageImpact: '+20% Flush Fitment' },
      { id: 'm3', name: 'CarbonWorks Dry Carbon Ducktail Spoiler', category: 'Spoilers', shopName: 'CarbonWorks India, Pune', cost: 18500, stageImpact: '+10% Rear Aero' },
      { id: 'm4', name: 'Redline Dual Burnt-Tip Valvetronic Catback', category: 'Exhaust', shopName: 'Redline Performance, Bengaluru', cost: 48000, stageImpact: '+12 HP & Tone' },
      { id: 'm5', name: 'Dual-Tone Gloss Black Roof & Mirror Caps', category: 'Wraps', shopName: 'Stealth Auto Labs, Mumbai', cost: 12000, stageImpact: 'Contrast Silhouette' }
    ]
  },
  {
    id: 'car-thar-vajra',
    userId: 'user-mantra',
    ownerUsername: 'mantra_tiwari_999',
    carName: 'VAJRA',
    carUsername: 'vajra_thar',
    make: 'Mahindra',
    model: 'Thar',
    variant: 'LX 4x4 Hard Top mStallion AT',
    year: 2025,
    color: 'Stealth Matte Graphite',
    fuelType: 'Petrol',
    transmission: 'Torque Converter',
    stage: 'Overland & Off-Road Armor',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    buildStory: 'Engineered for extreme trails from Spiti Valley to Sandakphu. Fitted with Prad 4x4 winch bumper, Ironman 2-inch foam cell lift, and 285/70 R17 AT tyres.',
    likesCount: 2450,
    followersCount: 6830,
    postsCount: 24,
    buildProgress: {
      exterior: 90,
      wheels: 100,
      lighting: 80,
      performance: 40,
      interior: 20
    },
    registrationNumber: 'MH 04 KB 0001',
    isRegNumberPublic: false,
    purchaseYear: 2023,
    mileage: '24,200 km',
    instagramHandle: '@vajra_thar',
    isFollowed: true,
    modifications: [
      { id: 'm6', name: 'Prad 4x4 Heavy Duty Steel Winch Bumper', category: 'Body Kits', shopName: 'Redline Performance, Bengaluru', cost: 38000 },
      { id: 'm7', name: '17-inch Bronze Beadlock Trail Alloys', category: 'Alloys', shopName: 'Apex Dynamics, Hyderabad', cost: 72000 },
      { id: 'm8', name: '7-inch Retro Projector LED Headlamps', category: 'Lighting', shopName: 'Stealth Auto Labs, Mumbai', cost: 14500 },
      { id: 'm9', name: 'Aluminium Expedition Roof Platform Rack', category: 'Accessories', shopName: 'TrackDay Garage, Kochi', cost: 26000 }
    ]
  },
  {
    id: 'car-slavia-vrs',
    userId: 'u-rohit',
    ownerUsername: 'rohit_slavia_vrs',
    carName: 'THE PHANTOM',
    carUsername: 'slavia_vrs_india',
    make: 'Skoda',
    model: 'Slavia',
    variant: 'Monte Carlo 1.5 TSI DSG',
    year: 2025,
    color: 'Tornado Red & Black',
    fuelType: 'Petrol',
    transmission: 'Automatic (DSG/DCT)',
    stage: 'Stage 1 OEM+ Sport',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    buildStory: 'Track-day tuned Skoda Slavia. Racing brake pads, custom front aero splitters, and black mirror caps.',
    likesCount: 920,
    followersCount: 1840,
    postsCount: 9,
    buildProgress: {
      exterior: 60,
      wheels: 80,
      lighting: 50,
      performance: 70,
      interior: 40
    },
    isRegNumberPublic: false,
    modifications: [
      { id: 'm10', name: 'Gloss Black 3-Piece Front Splitter', category: 'Front Lips', shopName: 'AeroCraft Customs, Delhi', cost: 16500 }
    ]
  }
];

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    authorId: 'car-virtus-midnight',
    authorUsername: 'midnight_virtus',
    authorAvatar: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=200&q=80',
    isCarProfile: true,
    carUsername: 'midnight_virtus',
    mediaUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    caption: 'Midnight at Bandra Sea Link photoshoot 🌊✨',
    type: 'poll',
    pollData: {
      question: 'Next upgrade for Midnight?',
      optionA: 'Carbon Ducktail Lip',
      optionB: 'Big Brake Kit',
      votesA: 64,
      votesB: 36
    },
    timestamp: '2h ago',
    audioTitle: '1.5 TSI Turbo Spool & Valvetronic Pops',
    audioArtist: 'CARIX Pure Exhaust Audio'
  },
  {
    id: 'story-2',
    authorId: 'car-thar-vajra',
    authorUsername: 'vajra_thar',
    authorAvatar: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80',
    isCarProfile: true,
    carUsername: 'vajra_thar',
    mediaUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    caption: 'Morning water crossing in Chikmagalur trails ⛰️',
    type: 'build_update',
    timestamp: '4h ago',
    audioTitle: 'Daku',
    audioArtist: 'Chani Nattan & Inderpal Moga',
    isDriveExperience: true,
    mentionedCarHandle: '@vajra_thar',
    driverSeatProofUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-3',
    authorId: 'shop-stealth',
    authorUsername: 'stealthautolabs',
    authorAvatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80',
    caption: 'Fresh batch of MQB front splitters arrived in stock today!',
    type: 'photo',
    timestamp: '6h ago',
    audioTitle: 'Baller',
    audioArtist: 'Shubh'
  },
  {
    id: 'story-4',
    authorId: 'user-mantra',
    authorUsername: 'mantra_tiwari_999',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    caption: 'Testing the CARIX V5 Car Identity Network. Give your car a profile! 🚀',
    type: 'photo',
    timestamp: '8h ago',
    audioTitle: 'Tokyo Drift (Phonk Remix)',
    audioArtist: 'Phonk Collective'
  }
];

export const INITIAL_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    authorId: 'user-mantra',
    authorUsername: 'mantra_tiwari_999',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isCarProfile: false,
    carUsername: 'midnight_virtus',
    carModel: 'Volkswagen Virtus GT (2026)',
    videoUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    posterImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    caption: 'Midnight rolling through the Mumbai Sea Link at 2 AM. That front splitter low stance hits differently. #CARIX #VirtusBuild #MidnightVirtus',
    audioTitle: 'Original Audio · 1.5 TSI Turbo Spool & Valvetronic',
    likesCount: 2840,
    commentsCount: 194,
    sharesCount: 312,
    isLiked: false,
    isSaved: false,
    taggedCar: { carId: 'car-virtus-midnight', carUsername: 'midnight_virtus', carName: 'MIDNIGHT' },
    taggedShop: { shopId: 'shop-stealth', shopName: 'Stealth Auto Labs' },
    taggedPart: { partId: 'prod-virtus-front-lip', partName: 'AeroCraft 3-Piece Front Lip', price: 16500 },
    hashtags: ['#CARIX', '#VirtusBuild', '#ModifiedCars', '#CARIXIndia']
  },
  {
    id: 'reel-2',
    authorId: 'car-thar-vajra',
    authorUsername: 'vajra_thar',
    authorAvatar: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80',
    isCarProfile: true,
    carUsername: 'vajra_thar',
    carModel: 'Mahindra Thar 4x4 (2025)',
    videoUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    posterImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    caption: 'Climbing rocky inclines in Western Ghats. Winch bumper tested and proven. #TharDiaries #OverlandIndia #CARIXBuild',
    audioTitle: '4x4 Trail Audio · Low Range Crawl Note',
    likesCount: 4120,
    commentsCount: 280,
    sharesCount: 540,
    isLiked: true,
    isSaved: true,
    taggedCar: { carId: 'car-thar-vajra', carUsername: 'vajra_thar', carName: 'VAJRA' },
    taggedShop: { shopId: 'shop-redline', shopName: 'Redline Performance' },
    hashtags: ['#TharDiaries', '#CARIXBuild', '#4x4India', '#OffRoad']
  }
];

export const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop-stealth',
    name: 'Stealth Auto Labs',
    slug: 'stealth-auto-labs',
    username: 'stealthautolabs',
    logo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80',
    businessType: 'Modification Shop & Detailing Studio',
    isVerified: true,
    verificationStatus: 'verified',
    rating: 4.9,
    reviewsCount: 184,
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Plot 18, Linking Road Extension, Bandra West, Mumbai 400050',
    phone: '+91 98200 44123',
    email: 'info@stealthautolabs.in',
    website: 'https://stealthautolabs.in',
    instagram: '@stealthautolabs',
    services: ['Aero Body Kits', 'Custom Paint & Wraps', 'Performance Exhausts', 'Suspension Tuning', 'Interior Trims'],
    description: 'Premier automotive styling house in Mumbai. Specializing in European sedans, custom splitters, forged wheels, and OEM+ performance fitments.',
    openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
    completedBuildsCount: 240,
    subscriptionPlan: 'partner_active',
    gallery: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'
    ],
    ourBuilds: [
      {
        id: 'build-1',
        carName: 'Virtus GT Midnight Edition',
        carModel: 'Volkswagen Virtus GT (2026)',
        customerName: 'Mantra Tiwari',
        beforeImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
        afterImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
        modifications: ['3-Piece Aero Splitter', 'Cobra Lowering Springs', '17" Flow Formed Wheels'],
        partsUsed: ['AeroCraft 3-Piece Front Lip', 'Apex Hyper-Multi Alloys'],
        costRange: '₹95,000 - ₹1,20,000',
        date: 'March 2026'
      }
    ],
    analytics: {
      profileViews: 3420,
      productViews: 8190,
      postReach: 14200,
      reelViews: 26400,
      websiteClicks: 420,
      callClicks: 185,
      messageEnquiries: 48
    }
  },
  {
    id: 'shop-redline',
    name: 'Redline Performance',
    slug: 'redline-performance',
    username: 'redlineindia',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    businessType: 'Performance Shop & 4x4 Armor',
    isVerified: true,
    verificationStatus: 'verified',
    rating: 4.8,
    reviewsCount: 142,
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    phone: '+91 98450 77210',
    email: 'builds@redlineindia.com',
    instagram: '@redline_blr',
    services: ['ECU Remaps', 'Offroad Armor', 'Big Brake Kits', 'High-Flow Intakes', 'Valvetronic Exhausts'],
    description: 'Bengaluru’s leading powertrain and suspension tuning garage. Dyno-tested calibrations and rally-grade modifications for Indian roads.',
    openingHours: 'Tue - Sun: 10:30 AM - 7:30 PM',
    completedBuildsCount: 310,
    subscriptionPlan: 'partner_active',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'shop-aerocraft',
    name: 'AeroCraft Customs',
    slug: 'aerocraft-customs',
    username: 'aerocraftcustoms',
    logo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    businessType: 'Body Shop & Aero Manufacturer',
    isVerified: true,
    verificationStatus: 'verified',
    rating: 4.9,
    reviewsCount: 96,
    city: 'Delhi NCR',
    state: 'Delhi',
    address: 'Okhla Industrial Area Phase II, New Delhi 110020',
    phone: '+91 98110 33890',
    email: 'hello@aerocraftcustoms.com',
    instagram: '@aerocraft_delhi',
    services: ['ABS Plastic Body Kits', 'Carbon Fiber Aero', 'Custom Diffusers', 'Widebody Fabrication'],
    description: 'High precision 3D scanned aero components manufactured for Indian vehicle geometries including Virtus, Slavia, Verna and Thar.',
    openingHours: 'Mon - Sat: 11:00 AM - 8:30 PM',
    completedBuildsCount: 165,
    subscriptionPlan: 'partner_active',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80'
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-virtus-front-lip',
    name: 'AeroCraft Gloss Black 3-Piece Front Lip Splitter',
    category: 'Front Lips',
    productType: 'part',
    price: 16500,
    originalPrice: 19000,
    shopId: 'shop-aerocraft',
    shopName: 'AeroCraft Customs',
    shopLocation: 'Delhi NCR',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 42,
    compatibleCars: ['Volkswagen Virtus GT', 'Volkswagen Virtus Highline', 'Skoda Slavia 1.5 TSI', 'Skoda Slavia 1.0 TSI'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'Precision molded high-impact ABS splitter designed specifically for the MQB-A0-IN platform. Lowers visual front fascia by 22mm without decreasing critical approach angle.',
    installationNotes: 'Estimated installation time: 45 minutes. Direct bolt-on. No bumper removal required.',
    installationAvailable: true,
    warrantyInfo: '1 Year Material Warranty against Cracking',
    variants: ['Piano Gloss Black', 'Matte Carbon Texture'],
    toolsRequired: ['10mm Socket Wrench', 'Phillips Screwdriver', 'Automotive Masking Tape', 'Rubbing Alcohol Pad'],
    difficulty: 'Beginner DIY',
    estimatedInstallMinutes: 45,
    instructions: [
      'Clean underside of OEM front bumper with isopropyl alcohol pads to remove road grime and grease.',
      'Test fit all 3 pieces dry using masking tape to align edge contours with factory bumper lines.',
      'Peel 3M acrylic foam tape backing on the center section and press firmly along the center apron for 30 seconds.',
      'Fasten OEM underbody screws through the pre-drilled slotted holes using a 10mm socket wrench.',
      'Align left and right winglets with the center piece interlocking tabs, insert stainless self-tapping screws from underneath, and torque to 4.5 Nm.'
    ]
  },
  {
    id: 'prod-vag-obd-scanner',
    name: 'VAG-Scan Pro Bluetooth OBD2 Diagnostic & Coding Tool',
    category: 'Tools & Diagnostics',
    productType: 'tool',
    price: 6499,
    originalPrice: 8999,
    shopId: 'shop-redline',
    shopName: 'Redline Performance',
    shopLocation: 'Bengaluru',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 89,
    compatibleCars: ['Volkswagen Virtus GT', 'Skoda Slavia', 'Volkswagen Taigun', 'Skoda Kushaq', 'Volkswagen Polo GT', 'Audi A4'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'Automotive diagnostic and feature coding scanner built for Indian VAG MQB-A0-IN platforms. Unlock needle sweep, wireless CarPlay, acoustic lock chime, 5-blink indicators, throttle sensitivity mod, and clear fault codes.',
    installationNotes: '100% plug & play via OBD2 port located under driver steering knee bolster.',
    installationAvailable: false,
    warrantyInfo: '2 Years Replacement Guarantee',
    variants: ['Bluetooth iOS & Android', 'USB-C PC Edition'],
    toolsRequired: ['Smartphone (iOS/Android)', 'CARIX App or VAG Code Connect'],
    difficulty: 'Beginner DIY',
    estimatedInstallMinutes: 10,
    instructions: [
      'Locate 16-pin purple OBD2 diagnostic port beneath steering column on the driver side.',
      'Turn car ignition ON (press start button twice without pressing brake pedal, do NOT crank engine).',
      'Plug VAG-Scan Pro firmly into OBD2 port until blue LED pulses.',
      'Open CARIX or companion app, connect via Bluetooth (PIN: 1234), and run Auto-Scan for ECU fault codes.',
      'Go to "One-Click Adaptations" to enable: Gauge Needle Sweep, Off-Road Display on Digital Cockpit, and Acoustic Horn Chirp on Lock. Save configuration backup before flashing.'
    ]
  },
  {
    id: 'prod-trim-removal-kit',
    name: 'AutoPro 12-Piece Scratch-Free Interior & Exterior Trim Tool Set',
    category: 'Tools & Diagnostics',
    productType: 'tool',
    price: 1299,
    originalPrice: 1899,
    shopId: 'shop-stealth',
    shopName: 'Stealth Auto Labs',
    shopLocation: 'Mumbai',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 114,
    compatibleCars: ['Universal - All Indian Cars', 'Volkswagen Virtus', 'Mahindra Thar', 'Hyundai Creta', 'Tata Nexon', 'Skoda Slavia', 'Maruti Suzuki Swift'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'Impact-resistant nylon fiber pry tool set for safely disassembling interior dashboards, door panels, A/C vent trims, LED mirror caps, and emblem removal without scratching leather, paint, or piano-black trims.',
    installationNotes: 'Universal workshop tool used daily by Stealth Auto Labs technicians.',
    installationAvailable: false,
    warrantyInfo: 'Lifetime Tool Integrity Warranty',
    toolsRequired: ['Hands & Safety Gloves'],
    difficulty: 'Beginner DIY',
    estimatedInstallMinutes: 5,
    instructions: [
      'Choose the pry tool with the wedge thickness matching your panel seam (e.g. narrow curved wedge for A/C vents).',
      'Gently insert tool tip at a 45-degree angle between plastic trim and dashboard frame.',
      'Lever gently toward yourself until the internal nylon retainer clip snaps free with an audible pop.',
      'Slide second pry tool 3 inches along the seam to release subsequent clips consecutively without warping plastic.',
      'Store tools in canvas roll pouch to protect chisel edges from nicking.'
    ]
  },
  {
    id: 'prod-forged-alloys-17',
    name: 'Apex Hyper-Multi Spoke 17x7.5J Flow-Formed Alloys',
    category: 'Alloys',
    productType: 'part',
    price: 68000,
    originalPrice: 75000,
    shopId: 'shop-stealth',
    shopName: 'Stealth Auto Labs',
    shopLocation: 'Mumbai',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 38,
    compatibleCars: ['Volkswagen Virtus GT', 'Skoda Slavia', 'Hyundai Verna', 'Honda City', 'Maruti Suzuki Swift'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'Ultra-lightweight flow-formed wheels weighing only 7.8 kg each. 5x100 and 5x114.3 dual drill configurations available.',
    installationNotes: 'Includes hub-centric aluminium rings and tuner spline lug nuts.',
    installationAvailable: true,
    warrantyInfo: '3 Years Structural Warranty',
    variants: ['Satin Obsidian Black', 'Gloss Gunmetal', 'Bronze Satin'],
    toolsRequired: ['17mm/19mm Spline Socket', 'Hydraulic Floor Jack', 'Torque Wrench (set to 120 Nm)'],
    difficulty: 'Intermediate',
    estimatedInstallMinutes: 60,
    instructions: [
      'Loosen lug bolts half a turn while car is firmly parked in gear on level concrete.',
      'Position hydraulic jack on reinforced factory chassis jacking points, lift vehicle, and secure on jack stands.',
      'Remove OEM wheels and clean wheel hub surface with wire brush to ensure zero rust or debris.',
      'Install supplied 57.1mm hub-centric aluminium centering ring snugly over the hub lip.',
      'Mount Apex alloy, hand-thread all 5 tuner spline bolts in a star pattern, then lower vehicle and torque to 120 Nm with calibrated torque wrench.'
    ]
  },
  {
    id: 'prod-virtus-ducktail',
    name: 'CarbonWorks Dry Carbon Ducktail Trunk Spoiler',
    category: 'Spoilers',
    productType: 'part',
    price: 18500,
    originalPrice: 21000,
    shopId: 'shop-stealth',
    shopName: 'Stealth Auto Labs',
    shopLocation: 'Mumbai',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 29,
    compatibleCars: ['Volkswagen Virtus GT', 'Skoda Slavia'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'High-vacuum pre-preg 3K twill carbon fiber trunk spoiler with UV-resistant clear coat. Perfectly contours coupe trunk arch.',
    installationNotes: 'Mounts in 15 minutes using included 3M VHB primer and double-sided structural tape.',
    installationAvailable: true,
    warrantyInfo: '2 Years Clearcoat UV Warranty',
    variants: ['3K Twill Gloss', 'Forged Marble Carbon'],
    toolsRequired: ['Masking Tape', 'Rubbing Alcohol', '3M Adhesion Promoter Sponge (included)'],
    difficulty: 'Beginner DIY',
    estimatedInstallMinutes: 20,
    instructions: [
      'Wash trunk lid thoroughly and degrease surface using isopropyl alcohol.',
      'Position carbon ducktail dry on trunk lid, ensuring 4mm equal clearance on left and right quarter panels. Mark perimeter with painter tape.',
      'Apply 3M adhesion promoter sponge wipe along the contact boundary on trunk lid.',
      'Peel 2 inches of red backing plastic from both ends of the pre-applied 3M VHB tape.',
      'Align spoiler with tape marks, press firmly into position, pull remaining red backing completely out, and apply 20 kg downward pressure across entire edge for 2 minutes.'
    ]
  },
  {
    id: 'prod-thar-bumper',
    name: 'Prad 4x4 Heavy Duty Steel Off-Road Winch Bumper',
    category: 'Body Kits',
    productType: 'part',
    price: 38000,
    shopId: 'shop-redline',
    shopName: 'Redline Performance',
    shopLocation: 'Bengaluru',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 56,
    compatibleCars: ['Mahindra Thar 4x4 (2020-2026)', 'Mahindra Thar Roxx 4x4'],
    isFitmentVerified: true,
    stockStatus: 'in_stock',
    description: 'Cold-rolled 4mm carbon steel bumper with integrated 9500 lbs winch plate mount and twin forged recovery shackles.',
    installationNotes: 'Chassis mounted using 6 high-tensile Grade 8.8 bolts. Requires 2 technicians.',
    installationAvailable: true,
    warrantyInfo: 'Lifetime Weld Warranty',
    toolsRequired: ['17mm & 19mm Deep Sockets', 'Torque Wrench', 'Chassis Floor Crane or Assistant'],
    difficulty: 'Professional Workshop',
    estimatedInstallMinutes: 120,
    instructions: [
      'Disconnect negative terminal of battery to disable front fog light wiring circuits safely.',
      'Unbolt factory plastic bumper cover (8 push pins on radiator shroud and 6 lower subframe bolts).',
      'Unplug OEM fog light wiring harnesses and transfer fog lamps into Prad 4x4 internal steel housing.',
      'With an assistant supporting the bumper weight, hoist steel winch bumper against Thar chassis horn brackets.',
      'Thread 6 Grade 8.8 high-tensile bolts with spring lock washers through chassis sleeves and torque in cross pattern to 85 Nm.'
    ]
  },
  {
    id: 'prod-valvetronic-exhaust',
    name: 'Redline Valvetronic Dual Burnt-Tip Catback Exhaust',
    category: 'Exhaust',
    productType: 'part',
    price: 48000,
    shopId: 'shop-redline',
    shopName: 'Redline Performance',
    shopLocation: 'Bengaluru',
    shopVerified: true,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 31,
    compatibleCars: ['Volkswagen Virtus GT 1.5 TSI', 'Skoda Slavia 1.5 TSI', 'Hyundai Verna 1.5 Turbo'],
    isFitmentVerified: true,
    stockStatus: 'made_to_order',
    description: 'SS304 stainless steel exhaust system with dual wireless remote valves. Silent OEM cruising or aggressive sport pops.',
    installationNotes: 'Complete bolt-on replacement to factory flange. Vacuum valve line taps into engine vacuum circuit.',
    installationAvailable: true,
    variants: ['Titanium Burnt Blue Tips', 'Gloss Carbon Tips', 'Brushed Steel Tips'],
    toolsRequired: ['Vehicle Lift', '13mm & 15mm Exhaust Clamping Wrenches', 'Exhaust Hanger Pliers'],
    difficulty: 'Professional Workshop',
    estimatedInstallMinutes: 90,
    instructions: [
      'Raise vehicle on hydraulic lift and allow exhaust system to cool completely.',
      'Spray penetrant oil on OEM cat-back slip-joint clamp and rubber exhaust isolator hangers.',
      'Unbolt factory clamp and gently pry exhaust hangers off chassis pins using exhaust hanger pliers.',
      'Hang new Redline SS304 catback into factory rubber mounts starting from the rear resonator to midpipe.',
      'Route vacuum pneumatic line through spare tire grommet up to engine bay solenoid, plug 12V wireless receiver into trunk accessory socket, and test open/close valve remote.'
    ]
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    userId: 'user-mantra',
    username: 'mantra_tiwari_999',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    postAs: 'car',
    authorCarId: 'car-virtus-midnight',
    authorCarUsername: 'midnight_virtus',
    carModel: 'Volkswagen Virtus GT (2026)',
    carName: 'MIDNIGHT',
    mediaUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    caption: '“YOUR CAR. YOUR IDENTITY.” Stage 2 exterior build dialed in for @midnight_virtus. Installed the new 3-piece front lip and 17" flow-formed alloys this weekend at @stealthautolabs. Which design of spoiler suits this build better: carbon ducktail or low-profile lip? #CARIX #VirtusBuild #MidnightVirtus #CARIXIndia',
    location: 'Bandra-Worli Sea Link, Mumbai',
    timestamp: '2h ago',
    likesCount: 512,
    isLiked: false,
    isSaved: false,
    commentsCount: 38,
    sharesCount: 45,
    isAskingSuggestions: true,
    suggestionTopic: 'Trunk spoiler choice: Gloss Black vs Carbon Fiber Ducktail',
    category: 'build',
    audioTitle: '1.5 TSI Turbo Spool & Valvetronic Pops',
    audioArtist: 'CARIX Pure Exhaust Audio',
    hashtags: ['#CARIX', '#VirtusBuild', '#MidnightVirtus', '#ModifiedCars', '#CARIXIndia'],
    taggedCar: { carId: 'car-virtus-midnight', carUsername: 'midnight_virtus', carName: 'MIDNIGHT' },
    taggedParts: [
      { partId: 'prod-virtus-front-lip', partName: 'AeroCraft 3-Piece Front Lip', category: 'Front Lips', price: 16500 },
      { partId: 'prod-forged-alloys-17', partName: 'Apex Hyper-Multi Spoke 17" Alloys', category: 'Alloys', price: 68000 }
    ],
    taggedShops: [
      { shopId: 'shop-stealth', shopName: 'Stealth Auto Labs', location: 'Mumbai', isVerified: true },
      { shopId: 'shop-aerocraft', shopName: 'AeroCraft Customs', location: 'Delhi NCR', isVerified: true }
    ],
    comments: [
      {
        id: 'c1',
        userId: 'u-rohit',
        username: 'rohit_slavia_vrs',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        text: 'Go with the Carbon Ducktail from @stealthautolabs! It complements the candy white and gloss black roof perfectly. Stance is sitting immaculate.',
        timestamp: '1h ago',
        likes: 14,
        suggestedPart: 'CarbonWorks Dry Carbon Ducktail',
        suggestedShop: 'Stealth Auto Labs'
      }
    ]
  },
  {
    id: 'post-2',
    userId: 'user-mantra',
    username: 'mantra_tiwari_999',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    postAs: 'car',
    authorCarId: 'car-thar-vajra',
    authorCarUsername: 'vajra_thar',
    carModel: 'Mahindra Thar 4x4 (2025)',
    carName: 'VAJRA',
    mediaUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'image',
    caption: 'Deep in the Western Ghats fog with @vajra_thar. Fitted the steel winch bumper from @redlineindia and auxiliary rally pods. Ready for the monsoon trails. #TharDiaries #OverlandIndia #CARIX',
    location: 'Chikmagalur, Karnataka',
    timestamp: '5h ago',
    likesCount: 843,
    isLiked: true,
    isSaved: true,
    commentsCount: 62,
    sharesCount: 71,
    category: 'showcase',
    audioTitle: 'Daku',
    audioArtist: 'Chani Nattan & Inderpal Moga',
    hashtags: ['#TharDiaries', '#OverlandIndia', '#CARIX', '#4x4India'],
    taggedCar: { carId: 'car-thar-vajra', carUsername: 'vajra_thar', carName: 'VAJRA' },
    taggedParts: [
      { partId: 'prod-thar-bumper', partName: 'Prad 4x4 Heavy Duty Steel Winch Bumper', category: 'Body Kits', price: 38000 }
    ],
    taggedShops: [
      { shopId: 'shop-redline', shopName: 'Redline Performance', location: 'Bengaluru', isVerified: true }
    ],
    comments: []
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'car_tag',
    title: 'Your car was tagged',
    description: '@stealthautolabs tagged your car @midnight_virtus in a new build showcase!',
    timestamp: '15m ago',
    isRead: false,
    targetCarUsername: 'midnight_virtus'
  },
  {
    id: 'n2',
    type: 'follow',
    title: 'New Car Follower',
    description: '@rohit_slavia_vrs started following @midnight_virtus',
    timestamp: '1h ago',
    isRead: false,
    targetCarUsername: 'midnight_virtus'
  },
  {
    id: 'n3',
    type: 'suggestion',
    title: 'New suggestion on your build',
    description: '@rohit_slavia_vrs suggested CarbonWorks Dry Carbon Ducktail for @midnight_virtus',
    timestamp: '2h ago',
    isRead: false,
    actionUrl: 'post-1'
  }
];

export const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: 'msg-1',
    participantId: 'shop-stealth',
    participantName: 'Stealth Auto Labs',
    participantAvatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
    participantType: 'shop',
    lastMessage: 'Yes Mantra! The new MQB front splitters arrived in stock today. We can book your installation slot for Saturday.',
    lastTimestamp: '10:45 AM',
    unreadCount: 1,
    contextProduct: 'AeroCraft 3-Piece Front Lip Splitter',
    contextCar: 'Volkswagen Virtus GT (@midnight_virtus)',
    messages: [
      { id: 'm1', senderId: 'user-mantra', text: 'Hey guys! Is the 3-piece front lip for Virtus in stock at the Bandra workshop?', timestamp: 'Yesterday, 6:30 PM' },
      { id: 'm2', senderId: 'shop-stealth', text: 'Yes Mantra! The new MQB front splitters arrived in stock today. We can book your installation slot for Saturday.', timestamp: '10:45 AM', isShop: true }
    ]
  }
];

export const POPULAR_HASHTAGS = [
  { tag: '#CARIX', count: '14.2K posts', trending: true },
  { tag: '#CARIXBuild', count: '9.8K posts', trending: true },
  { tag: '#VirtusBuild', count: '6.4K posts', trending: true },
  { tag: '#ModifiedVirtus', count: '5.1K posts', trending: false },
  { tag: '#CARIXIndia', count: '8.2K posts', trending: true },
  { tag: '#CarModification', count: '22.5K posts', trending: true },
  { tag: '#MyCARIX', count: '3.9K posts', trending: false },
  { tag: '#TharDiaries', count: '11.3K posts', trending: true },
  { tag: '#IndianCars', count: '18.1K posts', trending: false }
];

export const INDIAN_CAR_DATABASE = [
  {
    make: 'Volkswagen',
    models: [
      { name: 'Virtus', variants: ['GT Plus 1.5 TSI DSG', 'GT Plus 1.5 TSI MT', 'GT Edge Carbon Steel', 'Topline 1.0 TSI', 'Highline 1.0 TSI'], years: [2026, 2025, 2024, 2023, 2022] },
      { name: 'Taigun', variants: ['GT Plus 1.5 TSI', 'Topline 1.0 TSI', 'Trail Edition'], years: [2026, 2025, 2024, 2023, 2022] },
      { name: 'Polo', variants: ['GT TSI 1.2', 'GT TSI 1.0', 'TDI 1.5 Highline Plus'], years: [2022, 2021, 2020, 2019, 2018] }
    ]
  },
  {
    make: 'Skoda',
    models: [
      { name: 'Slavia', variants: ['Style 1.5 TSI DSG', 'Monte Carlo Edition', 'Ambition 1.0 TSI'], years: [2026, 2025, 2024, 2023, 2022] },
      { name: 'Kushaq', variants: ['Monte Carlo 1.5 TSI', 'Style 1.5 TSI', 'Onyx Edition'], years: [2026, 2025, 2024, 2023, 2022] },
      { name: 'Octavia', variants: ['vRS 245', 'L&K 2.0 TSI', 'Style 2.0 TSI'], years: [2023, 2022, 2021, 2020] }
    ]
  },
  {
    make: 'Mahindra',
    models: [
      { name: 'Thar', variants: ['LX 4x4 Hard Top Diesel AT', 'LX 4x4 Petrol AT', 'Earth Edition 4x4'], years: [2026, 2025, 2024, 2023, 2022, 2021] },
      { name: 'Thar Roxx', variants: ['AX7L 4x4 Diesel', 'AX5L 4x4', 'MX5'], years: [2026, 2025, 2024] },
      { name: 'Scorpio-N', variants: ['Z8L 4x4 Diesel AT', 'Z8 Petrol AT', 'Z4 Diesel'], years: [2026, 2025, 2024, 2023] }
    ]
  },
  {
    make: 'Hyundai',
    models: [
      { name: 'Verna', variants: ['SX(O) 1.5 Turbo DCT', 'SX 1.5 Turbo MT', 'SX(O) 1.5 NA IVT'], years: [2026, 2025, 2024, 2023] },
      { name: 'Creta', variants: ['N Line N8 Turbo DCT', 'SX(O) Diesel AT', 'SX(O) 1.5 Turbo'], years: [2026, 2025, 2024, 2023] },
      { name: 'i20 N Line', variants: ['N8 1.0 Turbo DCT', 'N6 1.0 Turbo MT'], years: [2026, 2025, 2024, 2023, 2022] }
    ]
  },
  {
    make: 'Honda',
    models: [
      { name: 'City', variants: ['ZX e:HEV Hybrid', 'ZX 1.5 i-VTEC MT', 'VX 1.5 CVT'], years: [2026, 2025, 2024, 2023, 2022, 2021] },
      { name: 'Elevate', variants: ['ZX 1.5 CVT', 'ZX 1.5 MT'], years: [2026, 2025, 2024] }
    ]
  },
  {
    make: 'Tata',
    models: [
      { name: 'Nexon', variants: ['Fearless Plus S #DARK', 'Creative Plus 1.2 Turbo', 'Fearless Diesel AMT'], years: [2026, 2025, 2024, 2023] },
      { name: 'Harrier', variants: ['Fearless Plus #DARK AT', 'Adventure Plus'], years: [2026, 2025, 2024, 2023] },
      { name: 'Curvv', variants: ['Accomplished Plus 1.2 GDi', 'Creative Plus'], years: [2026, 2025, 2024] }
    ]
  },
  {
    make: 'Maruti Suzuki',
    models: [
      { name: 'Swift', variants: ['ZXi Plus AMT', 'ZXi MT', 'VXi DualJet'], years: [2026, 2025, 2024, 2023, 2022] },
      { name: 'Fronx', variants: ['Alpha 1.0 Turbo 6AT', 'Zeta 1.0 Turbo MT'], years: [2026, 2025, 2024, 2023] },
      { name: 'Jimny', variants: ['Alpha 4x4 AT', 'Zeta 4x4 MT'], years: [2026, 2025, 2024, 2023] }
    ]
  }
];

export const MODIFICATION_CATEGORIES = [
  { id: 'exterior', name: 'Exterior', icon: 'Car', description: 'Body panels, aero lips, diffusers & splitters' },
  { id: 'bodykits', name: 'Body Kits', icon: 'Shield', description: 'Widebody packages & complete bumper kits' },
  { id: 'frontlips', name: 'Front Lips', icon: 'ArrowDownToLine', description: 'Aero splitters & bumper spoiler extensions' },
  { id: 'sideskirts', name: 'Side Skirts', icon: 'ChevronsDown', description: 'Rocker panel aero blades with winglets' },
  { id: 'spoilers', name: 'Spoilers', icon: 'Wind', description: 'Ducktail lips, trunk spoilers & GT wings' },
  { id: 'hoodvents', name: 'Hood Vents', icon: 'Flame', description: 'Functional heat extractors & dual cowls' },
  { id: 'alloys', name: 'Alloys & Wheels', icon: 'Disc', description: 'Flow-formed & forged custom offset wheels' },
  { id: 'tyres', name: 'Tyres', icon: 'CircleDot', description: 'UHP track compound & All-Terrain 4x4 rubber' },
  { id: 'lighting', name: 'Lighting', icon: 'Zap', description: 'Matrix projectors, smoked DRLs & tail clusters' },
  { id: 'exhaust', name: 'Exhaust Systems', icon: 'Volume2', description: 'Valvetronic catbacks & burnt titanium tips' },
  { id: 'performance', name: 'Performance', icon: 'Gauge', description: 'Intake filters, remaps, intercoolers & brakes' },
  { id: 'wraps', name: 'Wraps & Chrome Delete', icon: 'Layers', description: 'Dual-tone roof blackouts & satin wraps' },
  { id: 'interior', name: 'Interior & Trim', icon: 'Sliders', description: 'Alcantara wheels, carbon trims & bucket seats' },
  { id: 'audio', name: 'Audio & Damping', icon: 'Music', description: 'Component speakers, DSPs & sound damping' },
  { id: 'detailing', name: 'Detailing & PPF', icon: 'Sparkles', description: 'Paint protection films & 9H ceramic coats' },
  { id: 'accessories', name: 'Accessories', icon: 'Compass', description: 'Roof racks, skid plates & tow hooks' }
];
