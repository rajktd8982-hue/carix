import React from 'react';
import { useApp } from '../../context/AppContext';
import { CarVisual } from '../common/CarVisual';
import { Star, ShieldCheck, Plus, MessageCircle, ArrowRight, Check } from 'lucide-react';

export const FeaturedPartsSection: React.FC = () => {
  const { products, addPartToBuild, openEnquiryModal, setActiveProduct, setCurrentTab, currentBuild } = useApp();

  return (
    <section className="py-16 bg-[#090909] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2 block">
              Marketplace Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Featured Modification Parts
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Engineered aftermarket aero, flow-formed wheels, exhausts, and performance accessories from certified Indian workshops.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('marketplace')}
            className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto py-2"
          >
            <span>View All Parts (₹)</span>
            <ArrowRight className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>

        {/* 4-Column Grid for Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => {
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
                    <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-emerald-400 border border-emerald-900/50 flex items-center gap-1">
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

                    {/* Compatible Cars */}
                    <div className="mt-2 text-[11px] text-neutral-400 line-clamp-1">
                      <span className="text-neutral-500">Fits: </span>
                      {product.compatibleCars.slice(0, 2).join(', ')}
                    </div>

                    {/* Shop */}
                    <div className="mt-1 text-[11px] text-neutral-500 truncate">
                      By <span className="text-neutral-300 font-medium">{product.shopName}</span> ({product.shopLocation})
                    </div>
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
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-900/60'
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

      </div>
    </section>
  );
};
