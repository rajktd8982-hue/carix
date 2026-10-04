import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Star, ShieldCheck, Plus, MessageCircle, 
  Check, ShoppingBag, Truck, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addPartToBuild, openEnquiryModal, currentBuild, showToast } = useApp();

  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || 'Standard');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.gallery || [product.image];
  const isAddedToBuild = currentBuild.selectedParts.some(p => p.id === product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 text-neutral-300 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Gallery (Contiguous purchase module design) */}
        <div className="md:w-1/2 bg-black flex flex-col justify-between p-4 border-b md:border-b-0 md:border-r border-[#202020]">
          <div className="flex-1 flex items-center justify-center relative min-h-[250px] md:min-h-[380px]">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="max-h-[340px] w-full object-contain rounded-xl"
            />
            {product.isFitmentVerified && (
              <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-emerald-400 border border-emerald-900/50 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Fitment</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 pt-3 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === i ? 'border-[#E50914]' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchase and Compatibility Module */}
        <div className="md:w-1/2 flex flex-col justify-between p-6 overflow-y-auto space-y-5">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono uppercase text-red-400 font-semibold">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono tabular-nums font-semibold">{product.rating}</span>
                <span className="text-neutral-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white font-display leading-tight">
              {product.name}
            </h2>

            {/* Seller Shop Lockup */}
            <div className="p-3 bg-[#181818] rounded-xl border border-[#262626] flex items-center justify-between">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-mono">Verified Supplier</p>
                <p className="text-xs font-semibold text-white">{product.shopName}</p>
                <p className="text-[11px] text-neutral-400">{product.shopLocation}</p>
              </div>
              <button
                onClick={() => openEnquiryModal({ product })}
                className="px-3 py-1.5 bg-[#222222] hover:bg-[#2b2b2b] text-neutral-200 text-xs rounded-lg transition-colors"
              >
                Workshop Profile
              </button>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-500 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-medium">In Stock</span>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-neutral-300 uppercase font-mono">
                  Finish / Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedVariant === v
                          ? 'bg-[#E50914] text-white font-semibold'
                          : 'bg-[#1b1b1b] text-neutral-300 border border-[#2b2b2b] hover:border-neutral-500'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Compatibility Matrix: "Konse car mai use hota ha" */}
            <div className="p-4 bg-[#161616] rounded-xl border border-[#262626] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Compatible Cars / Konse Car Mai Use Hota Ha</span>
                </div>
                <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded font-mono">
                  {product.compatibleCars.length} models verified
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.compatibleCars.map((car, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#202020] border border-[#2d2d2d] text-[11px] text-neutral-200"
                  >
                    <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />
                    {car}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-neutral-400 italic pt-0.5">
                All listed models tested for clearance, wiring harness compatibility, and mounting points.
              </p>
            </div>

            {/* Step-by-Step Instructions & Installation Guide */}
            {(product.instructions && product.instructions.length > 0) || product.installationNotes ? (
              <div className="p-4 bg-[#151515] rounded-xl border border-[#292929] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E50914]" />
                    Installation Guide & Instructions
                  </span>
                  {product.difficulty && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      product.difficulty === 'Beginner DIY' 
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                        : product.difficulty === 'Intermediate'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                        : 'bg-red-950/80 text-red-300 border border-red-800/60'
                    }`}>
                      {product.difficulty} · {product.estimatedInstallMinutes || 30} mins
                    </span>
                  )}
                </div>

                {/* Tools Required */}
                {product.toolsRequired && product.toolsRequired.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 font-semibold">
                      Tools Required:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.toolsRequired.map((tool, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#222222] border border-[#333] text-neutral-300">
                          🔧 {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step-by-step list */}
                {product.instructions && product.instructions.length > 0 ? (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 font-semibold block">
                      Step-by-Step Guide:
                    </span>
                    <ol className="space-y-2">
                      {product.instructions.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <span className="w-5 h-5 rounded-full bg-[#202020] border border-[#333] text-neutral-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-300 leading-relaxed">{product.installationNotes}</p>
                )}
              </div>
            ) : null}

          </div>

          {/* Action Module (Contiguous PDP) */}
          <div className="pt-4 border-t border-[#202020] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addPartToBuild(product)}
                className={`py-3 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  isAddedToBuild 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' 
                    : 'bg-[#1e1e1e] hover:bg-[#282828] border border-[#2f2f2f] text-neutral-200'
                }`}
              >
                {isAddedToBuild ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 text-[#E50914]" />}
                <span>{isAddedToBuild ? 'In My Build' : 'Add to Build'}</span>
              </button>

              <button
                onClick={() => openEnquiryModal({ product })}
                className="py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire / Order</span>
              </button>
            </div>

            <button
              onClick={() => {
                showToast(`Initiating direct secure checkout for ${product.name}`);
              }}
              className="w-full py-2.5 rounded-xl bg-[#162218] hover:bg-[#1f3523] border border-[#25422a] text-emerald-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Direct Purchase via CARIX Guarantee</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
