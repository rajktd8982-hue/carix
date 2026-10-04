export type AccountType = 'personal' | 'business';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  accountType: AccountType;
  isVerified?: boolean;
  role: 'enthusiast' | 'shop_owner' | 'admin';
  carsOwnedCount: number;
  followersCount: number;
  followingCount: number;
  shopId?: string;
  interests?: string[];
  followedBrands?: string[];
  followedCars?: string[];
  isPrivate?: boolean;
  state?: string;
  district?: string;
  hideShoppingRanking?: boolean;
  badges?: CarixBadge[];
  featuredBadgeId?: string;
}

export interface CarixBadge {
  id: string;
  title: string;
  description: string;
  category: 'builder' | 'community' | 'driver' | 'shopper' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  progress?: { current: number; max: number; unit: string };
  isFeatured?: boolean;
  perk?: string;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  reporterUsername: string;
  targetType: 'user' | 'post' | 'car' | 'shop';
  targetId: string;
  targetUsername: string;
  targetTitle?: string;
  reason: 'inappropriate_content' | 'spam_scam' | 'fake_mod_claims' | 'harassment' | 'dangerous_driving' | 'hate_speech' | 'other';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  actionTaken?: 'blocked_user' | 'removed_content' | 'warned' | 'none';
}

export interface BlockedUser {
  id: string;
  userId: string;
  username: string;
  reason: string;
  blockedAt: string;
  blockedBy: string;
}

export interface LeaderboardRankItem {
  id: string;
  rank: number;
  type: 'car' | 'user' | 'shopper';
  title: string;
  username: string;
  avatar: string;
  state: string;
  district: string;
  scoreMetric: number;
  badge?: string;
  shoppingLevel?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Titanium';
  preferredShops?: string[];
  carModel?: string;
  isCurrentUser?: boolean;
  isPrivate?: boolean;
}

export interface CarModification {
  id: string;
  name: string;
  category: string;
  brand?: string;
  cost?: number;
  partId?: string;
  shopId?: string;
  shopName?: string;
  installedDate?: string;
  stageImpact?: string;
}

export interface UserCar {
  id: string;
  userId: string;
  ownerUsername: string;
  carName: string;          // e.g. "MIDNIGHT"
  carUsername: string;      // e.g. "midnight_virtus" (Instagram account for the car)
  make: string;             // e.g. "Volkswagen"
  model: string;            // e.g. "Virtus"
  variant: string;          // e.g. "GT Plus 1.5 TSI"
  year: number;
  color: string;
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid' | 'EV' | 'CNG';
  transmission?: 'Manual' | 'Automatic (DSG/DCT)' | 'Torque Converter' | 'CVT';
  stage: string;            // e.g. "Stage 2 Exterior + Stance"
  image: string;            // Profile photo of car
  coverImage?: string;      // Banner/Cover photo of car
  modifications: CarModification[];
  buildStory: string;
  likesCount: number;
  followersCount: number;
  postsCount: number;
  buildProgress: {
    exterior: number;       // e.g. 70
    wheels: number;         // e.g. 100
    lighting: number;       // e.g. 40
    performance: number;    // e.g. 60
    interior: number;       // e.g. 50
  };
  registrationNumber?: string;
  isRegNumberPublic: boolean; // default = false (private)
  purchaseYear?: number;
  mileage?: string;
  instagramHandle?: string;
  isFollowed?: boolean;
}

export interface StoryItem {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatar: string;
  isCarProfile?: boolean;
  carUsername?: string;
  mediaUrl: string;
  caption?: string;
  type: 'photo' | 'video' | 'poll' | 'question' | 'build_update' | 'before_after';
  pollData?: { question: string; optionA: string; optionB: string; votesA: number; votesB: number };
  timestamp: string;
  hasViewed?: boolean;
  isDriveExperience?: boolean;
  driverSeatProofUrl?: string;
  mentionedCarHandle?: string;
  audioTitle?: string;
  audioArtist?: string;
  audioUrl?: string;
}

export interface ReelItem {
  id: string;
  authorId: string;
  authorUsername: string;
  authorAvatar: string;
  isCarProfile?: boolean;
  carUsername?: string;
  carModel: string;
  videoUrl: string;
  posterImage: string;
  caption: string;
  audioTitle: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  taggedCar?: { carId: string; carUsername: string; carName: string };
  taggedShop?: { shopId: string; shopName: string };
  taggedPart?: { partId: string; partName: string; price: number };
  hashtags: string[];
}

export interface PostTagPart {
  partId: string;
  partName: string;
  category: string;
  price?: number;
}

export interface PostTagShop {
  shopId: string;
  shopName: string;
  location: string;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replyTo?: string;
  suggestedPart?: string;
  suggestedShop?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  postAs: 'user' | 'car';
  authorCarId?: string;
  authorCarUsername?: string;
  carModel: string;
  carName?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  beforeImage?: string;     // For before/after posts
  afterImage?: string;
  caption: string;
  location?: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  commentsCount: number;
  sharesCount: number;
  taggedParts: PostTagPart[];
  taggedShops: PostTagShop[];
  taggedCar?: { carId: string; carUsername: string; carName: string };
  taggedUser?: { userId: string; username: string };
  isAskingSuggestions?: boolean;
  suggestionTopic?: string;
  comments: Comment[];
  category: 'post' | 'reel' | 'build' | 'question' | 'showcase' | 'before_after';
  hashtags: string[];
  isDriveExperience?: boolean;
  isDriveExperienceVerified?: boolean;
  driverSeatProofUrl?: string; // Driver cockpit / Behind-the-wheel POV
  carPhotoProofUrl?: string;   // Vehicle exterior photo
  mentionedCarHandle?: string; // Tagged car handle e.g. @midnight_virtus
  drivingVerdict?: 'Exhilarating' | 'Surprising Power' | 'Aggressive Exhaust' | 'Planted Handling' | 'Great Cruiser';
  audioTitle?: string;
  audioArtist?: string;
  audioUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  productType?: 'part' | 'tool' | 'accessory' | 'kit';
  shopId: string;
  shopName: string;
  shopLocation: string;
  shopVerified: boolean;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  compatibleCars: string[];
  isFitmentVerified: boolean;
  stockStatus: 'in_stock' | 'made_to_order' | 'low_stock' | 'out_of_stock';
  description: string;
  installationNotes?: string;
  installationAvailable?: boolean;
  warrantyInfo?: string;
  variants?: string[];
  toolsRequired?: string[];
  difficulty?: 'Beginner DIY' | 'Intermediate' | 'Professional Workshop';
  estimatedInstallMinutes?: number;
  instructions?: string[];
}

export interface ShopBuildShowcase {
  id: string;
  carName: string;
  carModel: string;
  customerName?: string;
  beforeImage: string;
  afterImage: string;
  modifications: string[];
  partsUsed: string[];
  costRange?: string;
  date: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  username: string; // @username
  logo: string;
  coverImage: string;
  businessType: string;
  isVerified: boolean;
  verificationStatus: 'verified' | 'under_review' | 'submitted' | 'not_verified' | 'rejected' | 'more_info_required';
  rating: number;
  reviewsCount: number;
  city: string;
  state: string;
  address: string;
  distanceKm?: number;
  phone: string;
  email: string;
  website?: string;
  instagram: string;
  services: string[];
  description: string;
  openingHours: string;
  completedBuildsCount: number;
  subscriptionPlan: 'none' | 'partner_active';
  gallery: string[];
  ourBuilds?: ShopBuildShowcase[];
  analytics?: {
    profileViews: number;
    productViews: number;
    postReach: number;
    reelViews: number;
    websiteClicks: number;
    callClicks: number;
    messageEnquiries: number;
  };
}

export interface BuildPlan {
  id: string;
  userId: string;
  carMake: string;
  carModel: string;
  carYear: number;
  carVariant: string;
  title: string;
  selectedParts: Product[];
  estimatedTotal: number;
  installationNotes: string[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'follow_request' | 'car_tag' | 'product_tag' | 'suggestion' | 'enquiry' | 'system' | 'verification';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  targetCarUsername?: string;
}

export interface MessageThread {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantType: 'user' | 'shop';
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  contextProduct?: string;
  contextCar?: string;
  messages: {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isShop?: boolean;
  }[];
}

export interface BusinessVerificationApplication {
  businessName: string;
  businessType: string;
  documentType: 'Certificate of Incorporation' | 'GST Registration' | 'Udyam Registration' | 'Shop & Establishment' | 'Trade Licence' | 'Other';
  documentNumber: string;
  documentFileUrl?: string;
  businessLegalName: string;
  businessAddress: string;
  phone: string;
  email: string;
  status: 'not_verified' | 'submitted' | 'under_review' | 'verified' | 'rejected' | 'more_info_required';
  submittedAt?: string;
  adminNotes?: string;
}

export interface PrivacySettings {
  isPrivateAccount: boolean;
  whoCanMessage: 'everyone' | 'people_you_follow' | 'no_one';
  whoCanComment: 'everyone' | 'people_you_follow' | 'no_one';
  whoCanTag: 'everyone' | 'people_you_follow' | 'no_one';
  whoCanMention: 'everyone' | 'people_you_follow' | 'no_one';
  carProfileVisibility: 'public' | 'followers_only';
  regNumberVisibility: 'private' | 'public'; // default private
  activityStatus: boolean;
  readReceipts: boolean;
}
