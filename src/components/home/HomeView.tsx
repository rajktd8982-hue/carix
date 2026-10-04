import React from 'react';
import { HeroSection } from './HeroSection';
import { TrendingBuilds } from './TrendingBuilds';
import { ModificationCategories } from './ModificationCategories';
import { PopularCarsSection } from './PopularCarsSection';
import { FeaturedPartsSection } from './FeaturedPartsSection';
import { FeaturedShopsSection } from './FeaturedShopsSection';
import { AiCtaSection } from './AiCtaSection';
import { PartnerProgramSection } from './PartnerProgramSection';
import { FounderSection } from './FounderSection';

export const HomeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090909]">
      {/* 1. CARIX HERO */}
      <HeroSection />

      {/* 2. Trending Builds */}
      <TrendingBuilds />

      {/* 3. Explore Modification Ideas */}
      <ModificationCategories />

      {/* 4. Build Your Car (Vehicle Selector) */}
      <PopularCarsSection />

      {/* 5. CARIX AI */}
      <AiCtaSection />

      {/* 6. Featured Parts */}
      <FeaturedPartsSection />

      {/* 7. Featured Shops */}
      <FeaturedShopsSection />

      {/* 8. Shop Partner Program */}
      <PartnerProgramSection />

      {/* 9. Founder Section */}
      <FounderSection />
    </div>
  );
};
