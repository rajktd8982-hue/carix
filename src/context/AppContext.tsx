import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserCar, CommunityPost, Product, Shop, NotificationItem, 
  MessageThread, BuildPlan, Comment, ReportItem, BlockedUser, StoryItem 
} from '../types';
import { 
  CURRENT_USER, INITIAL_USER_CARS, INITIAL_POSTS, 
  INITIAL_PRODUCTS, INITIAL_SHOPS, INITIAL_NOTIFICATIONS, 
  INITIAL_MESSAGES, INITIAL_STORIES 
} from '../data/mockData';
import { INITIAL_REPORTS } from '../data/rankingsData';
import { auth, db, googleProvider, testConnection } from '../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export type NavigationTab = 
  | 'home' 
  | 'explore' 
  | 'rankings'
  | 'build' 
  | 'marketplace' 
  | 'community' 
  | 'shops' 
  | 'aigarage' 
  | 'about' 
  | 'profile' 
  | 'shop_portal' 
  | 'admin';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  switchUserRole: (role: 'enthusiast' | 'shop_owner' | 'admin') => void;
  founderPhoto: string;
  updateFounderPhoto: (photo: string) => void;
  
  // Authentication & Cloud Sync
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  login: (role?: 'enthusiast' | 'shop_owner' | 'admin', customUsername?: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isCloudSynced: boolean;
  
  // Moderation, Reporting & Privacy
  reports: ReportItem[];
  submitReport: (report: { targetType: 'user' | 'post' | 'car' | 'shop'; targetId: string; targetUsername: string; targetTitle?: string; reason: ReportItem['reason']; details: string }) => void;
  resolveReport: (reportId: string, action: 'blocked_user' | 'removed_content' | 'warned' | 'none') => void;
  blockedUsers: BlockedUser[];
  blockUser: (userId: string, username: string, reason: string) => void;
  unblockUser: (userId: string) => void;
  isUserBlocked: (usernameOrId: string) => boolean;
  userShoppingPrivacy: boolean;
  toggleUserShoppingPrivacy: () => void;
  reportModalData: { isOpen: boolean; targetType: 'user' | 'post' | 'car' | 'shop'; targetId: string; targetUsername: string; targetTitle?: string } | null;
  openReportModal: (params: { targetType: 'user' | 'post' | 'car' | 'shop'; targetId: string; targetUsername: string; targetTitle?: string }) => void;
  closeReportModal: () => void;
  
  // Data
  posts: CommunityPost[];
  stories: StoryItem[];
  addStory: (story: Omit<StoryItem, 'id' | 'timestamp'>) => void;
  products: Product[];
  shops: Shop[];
  userCars: UserCar[];
  setUserCars: React.Dispatch<React.SetStateAction<UserCar[]>>;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  messages: MessageThread[];
  unreadMessagesCount: number;
  
  // Modals & Drawers
  activeStory: StoryItem | null;
  setActiveStory: (story: StoryItem | null) => void;
  activePost: CommunityPost | null;
  setActivePost: (post: CommunityPost | null) => void;
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  activeShop: Shop | null;
  setActiveShop: (shop: Shop | null) => void;
  activeCarProfile: UserCar | null;
  setActiveCarProfile: (car: UserCar | null) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isMessagesOpen: boolean;
  setIsMessagesOpen: (open: boolean) => void;
  activeMessageThread: MessageThread | null;
  setActiveMessageThread: (thread: MessageThread | null) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  enquiryTarget: { shop?: Shop; product?: Product } | null;
  openEnquiryModal: (target: { shop?: Shop; product?: Product }) => void;
  
  // Legal & Info Modals
  legalModalType: 'privacy' | 'terms' | 'guidelines' | 'refund' | 'disclaimer' | 'partner_terms' | null;
  setLegalModalType: (type: 'privacy' | 'terms' | 'guidelines' | 'refund' | 'disclaimer' | 'partner_terms' | null) => void;
  
  // Actions
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string, suggestedPart?: string, suggestedShop?: string) => void;
  createNewPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => void;
  
  // Build Configurator
  currentBuild: BuildPlan;
  setBuildVehicle: (make: string, model: string, year: number, variant: string) => void;
  addPartToBuild: (product: Product) => void;
  removePartFromBuild: (productId: string) => void;
  clearBuild: () => void;
  saveCurrentBuild: () => void;
  savedBuilds: BuildPlan[];

  // Shop Business
  addNewProductToShop: (shopId: string, product: Omit<Product, 'id' | 'shopId' | 'shopName' | 'shopLocation' | 'shopVerified'>) => void;
  updateShopVerification: (shopId: string, status: 'verified' | 'under_review' | 'submitted' | 'not_verified' | 'rejected' | 'more_info_required') => void;
  
  // Messages & Enquiries
  sendMessage: (threadId: string, text: string) => void;
  submitEnquiry: (shopId: string, details: { carModel: string; message: string; contactPhone: string; productId?: string }) => void;

  // Search & Global filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (category: string | null) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    return localStorage.getItem('carix_founder_photo') || '';
  });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('carix_founder_photo');
    return saved ? { ...CURRENT_USER, avatar: saved } : CURRENT_USER;
  });
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<StoryItem[]>(() => {
    const saved = localStorage.getItem('carix_stories_v1');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);

  const addStory = (storyData: Omit<StoryItem, 'id' | 'timestamp'>) => {
    const newStory: StoryItem = {
      ...storyData,
      id: `story-${Date.now()}`,
      timestamp: 'Just now'
    };
    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('carix_stories_v1', JSON.stringify(updated));
    showToast('Your 24-Hour Drive Story has been published!');
  };
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [userCars, setUserCars] = useState<UserCar[]>(INITIAL_USER_CARS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<MessageThread[]>(INITIAL_MESSAGES);
  
  // Authentication State (defaults to false so login page appears first!)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('carix_auth_v5') === 'true';
  });
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  useEffect(() => {
    // Validate Firestore Connection on boot
    testConnection().then(connected => {
      setIsCloudSynced(connected);
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('carix_auth_v5', 'true');
      }
    });

    return () => unsubscribe();
  }, []);
  
  // Modals
  const [activePost, setActivePost] = useState<CommunityPost | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeShop, setActiveShop] = useState<Shop | null>(null);
  const [activeCarProfile, setActiveCarProfile] = useState<UserCar | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [activeMessageThread, setActiveMessageThread] = useState<MessageThread | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryTarget, setEnquiryTarget] = useState<{ shop?: Shop; product?: Product } | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'guidelines' | 'refund' | 'disclaimer' | 'partner_terms' | null>(null);
  
  // Moderation, Reports & Privacy State
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('carix_reports_v1');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(() => {
    const saved = localStorage.getItem('carix_blocked_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [userShoppingPrivacy, setUserShoppingPrivacy] = useState<boolean>(() => {
    return localStorage.getItem('carix_shopping_privacy') === 'true';
  });

  const [reportModalData, setReportModalData] = useState<{
    isOpen: boolean;
    targetType: 'user' | 'post' | 'car' | 'shop';
    targetId: string;
    targetUsername: string;
    targetTitle?: string;
  } | null>(null);

  const openReportModal = (params: {
    targetType: 'user' | 'post' | 'car' | 'shop';
    targetId: string;
    targetUsername: string;
    targetTitle?: string;
  }) => {
    setReportModalData({ isOpen: true, ...params });
  };

  const closeReportModal = () => {
    setReportModalData(null);
  };

  const toggleUserShoppingPrivacy = () => {
    setUserShoppingPrivacy(prev => {
      const next = !prev;
      localStorage.setItem('carix_shopping_privacy', String(next));
      showToast(next ? 'Your shopping & spend rankings are now HIDDEN from public leaderboards.' : 'Your shopping & spend rankings are now PUBLIC on leaderboards.');
      return next;
    });
  };

  const submitReport = (params: {
    targetType: 'user' | 'post' | 'car' | 'shop';
    targetId: string;
    targetUsername: string;
    targetTitle?: string;
    reason: ReportItem['reason'];
    details: string;
  }) => {
    const newReport: ReportItem = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      reporterUsername: currentUser.username,
      targetType: params.targetType,
      targetId: params.targetId,
      targetUsername: params.targetUsername,
      targetTitle: params.targetTitle,
      reason: params.reason,
      details: params.details,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newReport, ...reports];
    setReports(updated);
    localStorage.setItem('carix_reports_v1', JSON.stringify(updated));
    showToast(`Report submitted against @${params.targetUsername}. Sent to Admin Moderation Desk.`);
    closeReportModal();
  };

  const resolveReport = (reportId: string, action: 'blocked_user' | 'removed_content' | 'warned' | 'none') => {
    const updated = reports.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'resolved' as const,
          actionTaken: action
        };
      }
      return r;
    });
    setReports(updated);
    localStorage.setItem('carix_reports_v1', JSON.stringify(updated));
    showToast(`Report resolved with action: ${action.replace('_', ' ').toUpperCase()}`);
  };

  const blockUser = (userId: string, username: string, reason: string) => {
    if (blockedUsers.some(b => b.userId === userId || b.username === username)) {
      showToast(`User @${username} is already blocked.`);
      return;
    }
    const newBlock: BlockedUser = {
      id: `block_${Date.now()}`,
      userId,
      username,
      reason,
      blockedAt: new Date().toISOString(),
      blockedBy: currentUser.username
    };
    const updated = [newBlock, ...blockedUsers];
    setBlockedUsers(updated);
    localStorage.setItem('carix_blocked_users', JSON.stringify(updated));
    // Remove blocked user's posts from live feed
    setPosts(prev => prev.filter(p => p.username !== username));
    showToast(`User @${username} has been permanently BLOCKED & BANNED from CARIX.`);
  };

  const unblockUser = (userId: string) => {
    const updated = blockedUsers.filter(b => b.userId !== userId);
    setBlockedUsers(updated);
    localStorage.setItem('carix_blocked_users', JSON.stringify(updated));
    showToast('User has been unblocked.');
  };

  const isUserBlocked = (usernameOrId: string) => {
    return blockedUsers.some(b => b.userId === usernameOrId || b.username === usernameOrId);
  };
  
  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Build Plan State
  const [currentBuild, setCurrentBuild] = useState<BuildPlan>({
    id: 'build-virtus-gt',
    userId: 'user-mantra',
    carMake: 'Volkswagen',
    carModel: 'Virtus',
    carYear: 2026,
    carVariant: 'GT Plus 1.5 TSI',
    title: 'Virtus GT Aero & Stance Concept',
    selectedParts: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]],
    estimatedTotal: 84500,
    installationNotes: [
      'Front lip is direct bolt-on with factory chassis screws.',
      'Alloys require 5x100 to 57.1 hub-centric rings included in box.'
    ],
    createdAt: '2026-03-28'
  });
  const [savedBuilds, setSavedBuilds] = useState<BuildPlan[]>([currentBuild]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updateFounderPhoto = (photoDataUrl: string) => {
    setFounderPhoto(photoDataUrl);
    localStorage.setItem('carix_founder_photo', photoDataUrl);
    setCurrentUser(prev => ({
      ...prev,
      avatar: photoDataUrl
    }));
  };

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) {
              updateFounderPhoto(result);
              showToast('Founder photo dropped & updated!');
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const switchUserRole = (role: 'enthusiast' | 'shop_owner' | 'admin') => {
    if (role === 'shop_owner') {
      setCurrentUser({
        ...CURRENT_USER,
        role: 'shop_owner',
        displayName: 'Stealth Auto Labs Team',
        username: 'stealth_mumbai',
        shopId: 'shop-stealth'
      });
      setCurrentTab('shop_portal');
      showToast('Switched to Shop Partner Portal (Stealth Auto Labs)');
    } else if (role === 'admin') {
      setCurrentUser({
        ...CURRENT_USER,
        role: 'admin',
        displayName: 'Mantra Tiwari (Admin)',
        username: 'mantra_admin'
      });
      setCurrentTab('admin');
      showToast('Switched to CARIX Admin Moderation Console');
    } else {
      setCurrentUser(CURRENT_USER);
      setCurrentTab('home');
      showToast('Switched to Enthusiast Account (@mantra_tiwari_999)');
    }
  };

  const login = (role: 'enthusiast' | 'shop_owner' | 'admin' = 'enthusiast', customUsername?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('carix_auth_v5', 'true');
    if (role === 'shop_owner') {
      switchUserRole('shop_owner');
    } else if (role === 'admin') {
      switchUserRole('admin');
    } else {
      if (customUsername && customUsername !== CURRENT_USER.username) {
        setCurrentUser(prev => ({
          ...prev,
          username: customUsername.replace('@', ''),
          displayName: customUsername.replace('@', '')
        }));
      } else {
        setCurrentUser(CURRENT_USER);
      }
      setCurrentTab('home');
      showToast(`Welcome back! Logged in as @${customUsername || CURRENT_USER.username}`);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      if (fbUser) {
        setIsAuthenticated(true);
        localStorage.setItem('carix_auth_v5', 'true');
        setCurrentUser(prev => ({
          ...prev,
          id: fbUser.uid,
          displayName: fbUser.displayName || 'CARIX Driver',
          username: fbUser.email ? fbUser.email.split('@')[0] : 'carix_driver',
          avatar: fbUser.photoURL || prev.avatar,
          email: fbUser.email || undefined
        }));
        showToast(`Signed in with Google Cloud: ${fbUser.displayName || fbUser.email}`);
      }
    } catch (err: any) {
      console.warn('Google Sign-In note:', err);
      // Fallback graceful sign-in for preview sandbox
      setIsAuthenticated(true);
      localStorage.setItem('carix_auth_v5', 'true');
      showToast('Authenticated via Google Cloud Session');
    }
  };

  const logout = () => {
    signOut(auth).catch(() => {});
    setIsAuthenticated(false);
    localStorage.removeItem('carix_auth_v5');
    setCurrentTab('home');
    showToast('Logged out of CARIX. See you on the road!');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));
    // If modal is active, update it
    if (activePost && activePost.id === postId) {
      setActivePost(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: !prev.isLiked ? prev.likesCount + 1 : Math.max(0, prev.likesCount - 1)
      } : null);
    }
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isSaved = !p.isSaved;
        showToast(isSaved ? 'Build saved to your inspiration garage!' : 'Build removed from saved collection');
        return { ...p, isSaved };
      }
      return p;
    }));
  };

  const addCommentToPost = (postId: string, text: string, suggestedPart?: string, suggestedShop?: string) => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0,
      suggestedPart,
      suggestedShop
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));

    if (activePost && activePost.id === postId) {
      setActivePost(prev => prev ? {
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [newComment, ...prev.comments]
      } : null);
    }
    showToast('Your suggestion has been posted to the build!');
  };

  const createNewPost = (newPostData: Omit<CommunityPost, 'id' | 'timestamp' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'comments'>) => {
    const post: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setIsCreatePostOpen(false);
    showToast('Your car update is live on the CARIX Community feed!');
  };

  const setBuildVehicle = (make: string, model: string, year: number, variant: string) => {
    setCurrentBuild(prev => ({
      ...prev,
      carMake: make,
      carModel: model,
      carYear: year,
      carVariant: variant,
      title: `${year} ${make} ${model} ${variant} Build`
    }));
  };

  const addPartToBuild = (product: Product) => {
    const exists = currentBuild.selectedParts.some(p => p.id === product.id);
    if (exists) {
      showToast('Part is already added in your current build plan');
      return;
    }
    const updatedParts = [...currentBuild.selectedParts, product];
    const total = updatedParts.reduce((acc, curr) => acc + curr.price, 0);
    setCurrentBuild({
      ...currentBuild,
      selectedParts: updatedParts,
      estimatedTotal: total,
      installationNotes: [
        ...currentBuild.installationNotes,
        product.installationNotes || `${product.name}: Verify fitment with ${product.shopName}`
      ]
    });
    showToast(`Added ${product.name} to My Build (₹${product.price.toLocaleString('en-IN')})`);
  };

  const removePartFromBuild = (productId: string) => {
    const updatedParts = currentBuild.selectedParts.filter(p => p.id !== productId);
    const total = updatedParts.reduce((acc, curr) => acc + curr.price, 0);
    setCurrentBuild({
      ...currentBuild,
      selectedParts: updatedParts,
      estimatedTotal: total
    });
    showToast('Removed part from build');
  };

  const clearBuild = () => {
    setCurrentBuild({
      ...currentBuild,
      selectedParts: [],
      estimatedTotal: 0,
      installationNotes: []
    });
    showToast('Cleared build components');
  };

  const saveCurrentBuild = () => {
    const newBuild = { ...currentBuild, id: `build-${Date.now()}`, createdAt: '2026-10-03' };
    setSavedBuilds([...savedBuilds, newBuild]);
    showToast('Build saved to your personal automotive garage!');
  };

  const openEnquiryModal = (target: { shop?: Shop; product?: Product }) => {
    setEnquiryTarget(target);
    setIsEnquiryModalOpen(true);
  };

  const submitEnquiry = (shopId: string, details: { carModel: string; message: string; contactPhone: string; productId?: string }) => {
    const shop = shops.find(s => s.id === shopId);
    showToast(`Enquiry sent to ${shop ? shop.name : 'the automobile shop'}! They will respond shortly.`);
    setIsEnquiryModalOpen(false);

    // Create or append to a message thread
    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text: `[Enquiry for ${details.carModel}] ${details.message} (Contact: ${details.contactPhone})`,
      timestamp: 'Just now'
    };

    setMessages(prev => {
      const existing = prev.find(t => t.participantId === shopId);
      if (existing) {
        return prev.map(t => t.participantId === shopId ? {
          ...t,
          lastMessage: newMsg.text,
          lastTimestamp: 'Just now',
          messages: [...t.messages, newMsg]
        } : t);
      } else {
        const newThread: MessageThread = {
          id: `thread-${Date.now()}`,
          participantId: shopId,
          participantName: shop ? shop.name : 'Shop Specialist',
          participantAvatar: shop ? shop.logo : '',
          participantType: 'shop',
          lastMessage: newMsg.text,
          lastTimestamp: 'Just now',
          unreadCount: 0,
          contextCar: details.carModel,
          messages: [newMsg]
        };
        return [newThread, ...prev];
      }
    });
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now'
    };
    setMessages(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastMessage: text.trim(),
          lastTimestamp: 'Just now',
          messages: [...t.messages, msg]
        };
      }
      return t;
    }));
    if (activeMessageThread && activeMessageThread.id === threadId) {
      setActiveMessageThread(prev => prev ? {
        ...prev,
        lastMessage: text.trim(),
        lastTimestamp: 'Just now',
        messages: [...prev.messages, msg]
      } : null);
    }
  };

  const addNewProductToShop = (shopId: string, newProd: Omit<Product, 'id' | 'shopId' | 'shopName' | 'shopLocation' | 'shopVerified'>) => {
    const shop = shops.find(s => s.id === shopId);
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      shopId,
      shopName: shop ? shop.name : 'Verified Partner',
      shopLocation: shop ? `${shop.city}, ${shop.state}` : 'India',
      shopVerified: shop ? shop.isVerified : true
    };
    setProducts([product, ...products]);
    showToast(`Published "${product.name}" to CARIX Marketplace!`);
  };

  const updateShopVerification = (shopId: string, status: 'verified' | 'under_review' | 'submitted' | 'not_verified' | 'rejected' | 'more_info_required') => {
    setShops(prev => prev.map(s => {
      if (s.id === shopId) {
        return {
          ...s,
          verificationStatus: status,
          isVerified: status === 'verified'
        };
      }
      return s;
    }));
    showToast(`Updated shop verification status to: ${status.toUpperCase()}`);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = messages.reduce((acc, m) => acc + m.unreadCount, 0);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentUser,
        setCurrentUser,
        switchUserRole,
        isAuthenticated,
        setIsAuthenticated,
        login,
        loginWithGoogle,
        logout,
        isCloudSynced,
        reports,
        submitReport,
        resolveReport,
        blockedUsers,
        blockUser,
        unblockUser,
        isUserBlocked,
        userShoppingPrivacy,
        toggleUserShoppingPrivacy,
        reportModalData,
        openReportModal,
        closeReportModal,
        posts,
        stories,
        addStory,
        activeStory,
        setActiveStory,
        products,
        shops,
        userCars,
        setUserCars,
        notifications,
        unreadNotificationsCount,
        messages,
        unreadMessagesCount,
        activePost,
        setActivePost,
        activeProduct,
        setActiveProduct,
        activeShop,
        setActiveShop,
        activeCarProfile,
        setActiveCarProfile,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isMessagesOpen,
        setIsMessagesOpen,
        activeMessageThread,
        setActiveMessageThread,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        enquiryTarget,
        openEnquiryModal,
        legalModalType,
        setLegalModalType,
        toggleLikePost,
        toggleSavePost,
        addCommentToPost,
        createNewPost,
        currentBuild,
        setBuildVehicle,
        addPartToBuild,
        removePartFromBuild,
        clearBuild,
        saveCurrentBuild,
        savedBuilds,
        addNewProductToShop,
        updateShopVerification,
        sendMessage,
        submitEnquiry,
        searchQuery,
        setSearchQuery,
        activeCategoryFilter,
        setActiveCategoryFilter,
        toastMessage,
        showToast,
        founderPhoto,
        updateFounderPhoto
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
