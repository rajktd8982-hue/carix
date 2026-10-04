/**
 * CARIX - Automotive Social Community, Modification Marketplace,
 * AI Build Assistant & Automobile Shop Discovery Platform.
 * Brand Line: “YOUR CAR. YOUR IDENTITY.”
 * Founder & Visionary: Mantra Tiwari (@mantra_tiwari_999)
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LegalModal } from './components/common/LegalModal';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { MessagesDrawer } from './components/messages/MessagesDrawer';
import { ShopEnquiryModal } from './components/shops/ShopEnquiryModal';
import { CreatePostModal } from './components/community/CreatePostModal';
import { PostDetailModal } from './components/community/PostDetailModal';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { ShopProfileModal } from './components/shops/ShopProfileModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { CarProfileModal } from './components/community/CarProfileModal';
import { LoginPage } from './components/auth/LoginPage';
import { ReportModal } from './components/common/ReportModal';
import { StoryViewerModal } from './components/community/StoryViewerModal';

// Views
import { HomeView } from './components/home/HomeView';
import { ExploreView } from './components/explore/ExploreView';
import { RankingsView } from './components/rankings/RankingsView';
import { BuildMyCar } from './components/build/BuildMyCar';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { CommunityFeed } from './components/community/CommunityFeed';
import { ShopDirectoryView } from './components/shops/ShopDirectoryView';
import { AiGarageView } from './components/aiGarage/AiGarageView';
import { AboutView } from './components/about/AboutView';
import { UserProfileView } from './components/community/UserProfileView';
import { ShopBusinessPortal } from './components/shopPortal/ShopBusinessPortal';
import { AdminPanel } from './components/admin/AdminPanel';

const MainContent: React.FC = () => {
  const { 
    currentTab, 
    activePost, 
    setActivePost,
    activeProduct, 
    setActiveProduct, 
    activeShop, 
    setActiveShop,
    activeCarProfile,
    setActiveCarProfile,
    isOnboardingOpen,
    setIsOnboardingOpen,
    isAuthenticated,
    toastMessage 
  } = useApp();

  // If user is not logged in, show the CARIX Login Page first!
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070707] text-white">
        <LoginPage />
        <LegalModal />
        {toastMessage && (
          <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-[#161616] border border-[#2b2b2b] text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans selection:bg-[#E50914] selection:text-white pb-14 md:pb-0">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Routed View */}
      <main className="flex-1">
        {currentTab === 'home' && <HomeView />}
        {currentTab === 'explore' && <ExploreView />}
        {currentTab === 'rankings' && <RankingsView />}
        {currentTab === 'build' && <BuildMyCar />}
        {currentTab === 'marketplace' && <MarketplaceView />}
        {currentTab === 'community' && <CommunityFeed />}
        {currentTab === 'shops' && <ShopDirectoryView />}
        {currentTab === 'aigarage' && <AiGarageView />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'profile' && <UserProfileView />}
        {currentTab === 'shop_portal' && <ShopBusinessPortal />}
        {currentTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CreatePostModal />
      <ShopEnquiryModal />
      <NotificationsDrawer />
      <MessagesDrawer />
      <LegalModal />
      <ReportModal />
      <StoryViewerModal />
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {activeCarProfile && (
        <CarProfileModal
          car={activeCarProfile}
          onClose={() => setActiveCarProfile(null)}
        />
      )}

      {activePost && (
        <PostDetailModal />
      )}

      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

      {activeShop && (
        <ShopProfileModal
          shop={activeShop}
          onClose={() => setActiveShop(null)}
        />
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#161616] border border-[#2b2b2b] text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#E50914]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
