import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Store, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

export const ShopEnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, enquiryTarget, submitEnquiry, userCars } = useApp();

  const [carModel, setCarModel] = useState(userCars[0] ? `${userCars[0].make} ${userCars[0].model} (${userCars[0].year})` : 'Volkswagen Virtus GT (2026)');
  const [contactPhone, setContactPhone] = useState('+91 ');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isEnquiryModalOpen || !enquiryTarget) return null;

  const targetShop = enquiryTarget.shop || (enquiryTarget.product ? {
    id: enquiryTarget.product.shopId,
    name: enquiryTarget.product.shopName,
    city: enquiryTarget.product.shopLocation,
    phone: '+91 98200 44123'
  } : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !targetShop) return;
    setIsSubmitting(true);

    setTimeout(() => {
      submitEnquiry(targetShop.id, {
        carModel,
        message,
        contactPhone,
        productId: enquiryTarget.product?.id
      });
      setIsSubmitting(false);
      setMessage('');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#E50914]" />
            <div>
              <h3 className="text-sm font-semibold text-white font-display">
                Enquire with {targetShop?.name}
              </h3>
              <p className="text-[11px] text-neutral-400">
                Direct workshop quotation & fitment verification
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEnquiryModalOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Part Badge (if opened from a product) */}
        {enquiryTarget.product && (
          <div className="mt-4 p-3 bg-[#1c1c1c] border border-[#2b2b2b] rounded-xl flex items-center gap-3">
            <img
              src={enquiryTarget.product.image}
              alt={enquiryTarget.product.name}
              className="w-12 h-12 rounded-lg object-cover border border-neutral-700"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-mono text-red-400">Target Part</span>
              <p className="text-xs font-semibold text-white truncate">{enquiryTarget.product.name}</p>
              <p className="text-[11px] text-neutral-300">₹{enquiryTarget.product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-[11px] font-medium text-neutral-300 mb-1">
              Your Vehicle Make & Model
            </label>
            <input
              type="text"
              required
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="e.g. Skoda Slavia 1.5 TSI Monte Carlo (2025)"
              className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-300 mb-1">
              WhatsApp / Phone Number
            </label>
            <input
              type="text"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-300 mb-1">
              Enquiry Details / Fitment Questions
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I want to check availability, installation charges, and if this requires any bumper modifications..."
              className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] text-neutral-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Direct connection · No middlemen commission
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#c90812] rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
