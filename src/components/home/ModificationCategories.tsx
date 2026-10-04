import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, Shield, Car, Disc, Zap, Volume2, 
  Layers, Sliders, Music, Sparkles, Compass, Wind, Flame, CircleDot
} from 'lucide-react';
import { MODIFICATION_CATEGORIES } from '../../data/mockData';

export const ModificationCategories: React.FC = () => {
  const { setCurrentTab, setActiveCategoryFilter } = useApp();

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategoryFilter(categoryName);
    setCurrentTab('marketplace');
  };

  return (
    <section className="py-16 bg-[#090909] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1 block">
              Architectural Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Explore Modification Categories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Select any component domain to inspect compatible aftermarket parts, fitment specs, and authorized shops.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveCategoryFilter(null);
              setCurrentTab('marketplace');
            }}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto py-2"
          >
            <span>Browse Full Parts Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {MODIFICATION_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group p-4 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#E50914]/60 hover:bg-[#161616] transition-all text-left flex flex-col justify-between h-28 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-neutral-300 group-hover:text-[#E50914] group-hover:border-[#E50914]/40 transition-colors">
                {cat.name.includes('Body') ? <Shield className="w-4 h-4" /> :
                 cat.name.includes('Front') ? <Wind className="w-4 h-4" /> :
                 cat.name.includes('Spoiler') ? <Wind className="w-4 h-4" /> :
                 cat.name.includes('Alloys') ? <Disc className="w-4 h-4" /> :
                 cat.name.includes('Lighting') ? <Zap className="w-4 h-4" /> :
                 cat.name.includes('Exhaust') ? <Volume2 className="w-4 h-4" /> :
                 cat.name.includes('Hood') ? <Flame className="w-4 h-4" /> :
                 cat.name.includes('Wraps') ? <Layers className="w-4 h-4" /> :
                 cat.name.includes('Audio') ? <Music className="w-4 h-4" /> :
                 cat.name.includes('Detailing') ? <Sparkles className="w-4 h-4" /> :
                 <Car className="w-4 h-4" />}
              </div>

              <div>
                <p className="text-xs font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                  {cat.name}
                </p>
                <p className="text-[10px] text-neutral-500 truncate mt-0.5">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
