import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { ProductDetailModal } from './ProductDetailModal';
import { 
  Search, Filter, Star, ShieldCheck, Plus, 
  MessageCircle, Check, ArrowUpDown, Tag 
} from 'lucide-react';
import { Product } from '../../types';

export const MarketplaceView: React.FC = () => {
  const { 
    products, 
    addPartToBuild, 
    openEnquiryModal, 
    activeProduct, 
    setActiveProduct, 
    activeCategoryFilter, 
    setActiveCategoryFilter, 
    currentBuild,
    showToast 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedSort, setSelectedSort] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const categories = [
    'All Categories',
    'Body Kits', 'Front Lips', 'Side Skirts', 'Spoilers', 'Hood Vents', 
    'Alloys', 'Tyres', 'Headlights', 'Tail Lights', 'DRLs', 
    'Grilles', 'Mirror Covers', 'Window Visors', 'Exhaust', 
    'Interior', 'Steering', 'Seats', 'Audio', 'Detailing', 'Wraps', 'Accessories'
  ];

  const currentCategory = activeCategoryFilter || 'All Categories';

  const filteredProducts = products.filter(p => {
    if (currentCategory !== 'All Categories' && p.category !== currentCategory) return false;
    if (verifiedOnly && !p.isFitmentVerified) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCar = p.compatibleCars.some(c => c.toLowerCase().includes(q));
      const matchShop = p.shopName.toLowerCase().includes(q);
      return matchName || matchCar || matchShop;
    }
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'price_low') return a.price - b.price;
    if (selectedSort === 'price_high') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span>CARIX Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Modification Parts & Styling Components
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Curated aftermarket catalog with certified Indian car compatibility, workshop installation, and direct pricing in ₹.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-mono">
              {filteredProducts.length} Products Available
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="py-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part name, car model (e.g. Virtus, Thar)..."
              className="w-full bg-[#131313] border border-[#242424] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          {/* Controls: Verified Fitment Toggle & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            
            <label className="flex items-center gap-2 px-3 py-2 bg-[#141414] border border-[#242424] rounded-xl text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#E50914] focus:ring-0 bg-[#222222]"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Fitment Only</span>
              </span>
            </label>

            <div className="flex items-center gap-1 bg-[#141414] border border-[#242424] rounded-xl px-2.5 py-1 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-transparent text-white text-xs py-1 focus:outline-none"
              >
                <option value="featured" className="bg-[#141414]">Featured</option>
                <option value="price_low" className="bg-[#141414]">Price: Low to High</option>
                <option value="price_high" className="bg-[#141414]">Price: High to Low</option>
                <option value="rating" className="bg-[#141414]">Top Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Categories Horizontal Scroll Strip */}
        <div className="pb-6 overflow-x-auto no-scrollbar flex items-center gap-1.5 border-b border-[#1a1a1a]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat === 'All Categories' ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                (cat === 'All Categories' && !activeCategoryFilter) || activeCategoryFilter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#151515] text-neutral-400 hover:text-white border border-[#222222]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="pt-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#121212] border border-[#222222] rounded-2xl p-16 text-center text-neutral-400 text-xs">
              <p>No modification parts match your current search and filters.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategoryFilter(null); setVerifiedOnly(false); }}
                className="mt-3 text-red-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isAdded = currentBuild.selectedParts.some(p => p.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden shadow-lg flex flex-col group hover:border-[#383838] transition-colors"
                  >
                    {/* Visual */}
                    <div 
                      className="cursor-pointer relative overflow-hidden"
                      onClick={() => setActiveProduct(product)}
                    >
                      <CarVisual
                        src={product.image}
                        alt={product.name}
                        aspect="4:3"
                        fallbackIcon="part"
                      />
                      {product.isFitmentVerified && (
                        <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-emerald-400 border border-emerald-900/50 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Fitment Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                          <span className="uppercase font-mono text-[10px] text-neutral-500">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-mono tabular-nums">{product.rating}</span>
                            <span className="text-neutral-500">({product.reviewCount})</span>
                          </div>
                        </div>

                        <h3 
                          onClick={() => setActiveProduct(product)}
                          className="text-xs font-semibold text-white line-clamp-2 hover:text-red-400 cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>

                        {/* Fits Vehicle */}
                        <p className="mt-2 text-[11px] text-neutral-400 truncate">
                          <span className="text-neutral-500">Fits: </span>
                          {product.compatibleCars.slice(0, 2).join(', ')}
                        </p>

                        {/* Shop */}
                        <p className="mt-1 text-[11px] text-neutral-500 truncate">
                          Workshop: <span className="text-neutral-300 font-medium">{product.shopName}</span>
                        </p>
                      </div>

                      {/* Price & Actions */}
                      <div className="pt-3 border-t border-[#1c1c1c] space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-base font-bold text-white font-mono tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-neutral-500 line-through font-mono">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => openEnquiryModal({ product })}
                            className="w-full py-1.5 px-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] text-neutral-200 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3 text-[#E50914]" />
                            <span>Enquire</span>
                          </button>

                          <button
                            onClick={() => addPartToBuild(product)}
                            className={`w-full py-1.5 px-2 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1 ${
                              isAdded 
                                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-900/60'
                                : 'bg-[#E50914] hover:bg-[#c90812] text-white shadow-sm'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>In Build</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add to Build</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Modal */}
        {activeProduct && (
          <ProductDetailModal
            product={activeProduct}
            onClose={() => setActiveProduct(null)}
          />
        )}

      </div>
    </div>
  );
};
