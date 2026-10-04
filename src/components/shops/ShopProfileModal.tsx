import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ShieldCheck, Star, MapPin, Clock, Phone, 
  Mail, Instagram, Wrench, MessageSquare, Tag, CheckCircle2 
} from 'lucide-react';
import { Shop } from '../../types';

interface ShopProfileModalProps {
  shop: Shop;
  onClose: () => void;
}

export const ShopProfileModal: React.FC<ShopProfileModalProps> = ({ shop, onClose }) => {
  const { openEnquiryModal, products, setActiveProduct, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'builds' | 'products' | 'services' | 'about'>('builds');

  const shopProducts = products.filter(p => p.shopId === shop.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 text-neutral-300 hover:text-white hover:bg-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Cover & Brand Lockup */}
          <div className="relative h-48 sm:h-64 bg-[#1a1a1a]">
            <img
              src={shop.coverImage}
              alt={shop.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

            {/* Shop Logo Floating Badge */}
            <div className="absolute -bottom-6 left-6 flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#141414] border-2 border-[#2b2b2b] p-1 overflow-hidden shadow-2xl">
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Shop Header Details */}
          <div className="pt-8 px-6 pb-6 border-b border-[#202020] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {shop.name}
                </h2>
                {shop.isVerified ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-900/60 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>CARIX Verified</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-900/50 text-[10px] text-amber-300">
                    Under Review
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>{shop.address}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono tabular-nums font-bold">{shop.rating}</span>
                  <span className="text-neutral-500">({shop.reviewsCount} reviews)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => openEnquiryModal({ shop })}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire with Workshop</span>
              </button>
            </div>
          </div>

          {/* Quick Contact Ribbon */}
          <div className="px-6 py-3 bg-[#161616] border-b border-[#202020] flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{shop.openingHours}</span>
              </span>
              <a href={`tel:${shop.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>{shop.phone}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{shop.instagram}</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-4 border-b border-[#202020] flex gap-6 text-xs font-semibold">
            {[
              { id: 'builds', label: `Completed Builds (${shop.completedBuildsCount})` },
              { id: 'products', label: `Catalog Products (${shopProducts.length})` },
              { id: 'services', label: 'Services & Specializations' },
              { id: 'about', label: 'Workshop Story & Verification' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 relative transition-colors ${
                  activeTab === tab.id ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Tab: Builds Portfolio */}
            {activeTab === 'builds' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {shop.gallery.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-[#242424] bg-black">
                      <img src={img} alt="Build project" className="w-full h-44 object-cover" />
                      <div className="p-3 bg-[#161616]">
                        <p className="text-xs font-semibold text-white">Project #{idx + 101}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Custom styling & suspension fitment</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Products */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shopProducts.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-6">No products uploaded yet by this shop partner.</p>
                ) : (
                  shopProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => { onClose(); setActiveProduct(p); }}
                      className="p-3.5 bg-[#171717] border border-[#262626] rounded-xl flex items-center justify-between gap-3 cursor-pointer hover:border-[#383838] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover border border-[#2d2d2d]" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                          <p className="text-[11px] text-red-400 font-mono">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400 hover:text-white">View →</span>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Services */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {shop.services.map((serv) => (
                    <div key={serv} className="p-3.5 bg-[#161616] border border-[#242424] rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                      <span className="text-xs font-semibold text-white">{serv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: About */}
            {activeTab === 'about' && (
              <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
                <p>{shop.description}</p>
                <div className="p-4 bg-[#161616] rounded-xl border border-[#242424] space-y-2">
                  <h4 className="font-semibold text-white text-xs">CARIX Physical Inspection Standard:</h4>
                  <p className="text-[11px] text-neutral-400">
                    Workshop verified by CARIX operations team in {shop.city}. Tools, paint booth standards, hoist equipment, and technician experience physically audited.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
