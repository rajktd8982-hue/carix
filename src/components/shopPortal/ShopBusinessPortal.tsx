import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, Package, Wrench, MessageSquare, BarChart3, 
  CreditCard, ShieldCheck, Plus, CheckCircle2, Clock, 
  AlertCircle, Upload, ArrowUpRight 
} from 'lucide-react';
import { Product } from '../../types';

export const ShopBusinessPortal: React.FC = () => {
  const { 
    currentUser, 
    shops, 
    products, 
    addNewProductToShop, 
    showToast, 
    messages, 
    setIsMessagesOpen,
    setLegalModalType,
    updateShopVerification 
  } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<
    'dashboard' | 'products' | 'enquiries' | 'subscription' | 'verification'
  >('dashboard');

  const myShop = shops.find(s => s.id === currentUser.shopId) || shops[0];
  const myProducts = products.filter(p => p.shopId === myShop.id);

  // New Product Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdType, setNewProdType] = useState<'tool' | 'part'>('part');
  const [newProdCategory, setNewProdCategory] = useState('Front Lips');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCars, setNewProdCars] = useState('Volkswagen Virtus GT, Skoda Slavia');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdToolsRequired, setNewProdToolsRequired] = useState('10mm Socket Wrench, Masking Tape');
  const [newProdInstructions, setNewProdInstructions] = useState(
    'Step 1: Clean mounting surface with alcohol wipe.\nStep 2: Dry fit to align factory clips.\nStep 3: Fasten OEM underbody screws.'
  );
  const [newProdDifficulty, setNewProdDifficulty] = useState<'Beginner DIY' | 'Intermediate' | 'Professional Workshop'>('Beginner DIY');
  const [newProdFitmentVerified, setNewProdFitmentVerified] = useState(true);

  // Verification Form State
  const [gstNumber, setGstNumber] = useState('27AAACG0123M1Z5');
  const [ownerPan, setOwnerPan] = useState('ABCDE1234F');
  const [addressProof, setAddressProof] = useState('Electricity Bill / Shop Lease Agreement');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    const instructionsArray = newProdInstructions
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    addNewProductToShop(myShop.id, {
      name: newProdName.trim(),
      category: newProdCategory,
      productType: newProdType,
      price: Number(newProdPrice),
      image: newProdType === 'tool' 
        ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
      rating: 5.0,
      reviewCount: 1,
      compatibleCars: newProdCars.split(',').map(s => s.trim()).filter(Boolean),
      isFitmentVerified: newProdFitmentVerified,
      stockStatus: 'in_stock',
      description: newProdDesc.trim() || `${newProdType === 'tool' ? 'Automotive specialty tool' : 'Custom aftermarket modification part'} manufactured to precision standards.`,
      toolsRequired: newProdToolsRequired.split(',').map(s => s.trim()).filter(Boolean),
      instructions: instructionsArray,
      difficulty: newProdDifficulty,
      installationNotes: `${instructionsArray.length} step installation guide provided by ${myShop.name}.`
    });

    showToast(`Published ${newProdName} with vehicle compatibility & instructions!`);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
    setIsAddProductOpen(false);
  };

  const handleRequestVerification = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopVerification(myShop.id, 'under_review');
    showToast('Verification documents submitted for manual audit by CARIX Operations!');
  };

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1c1c1c]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#141414] border border-[#2b2b2b] p-1 overflow-hidden shrink-0">
              <img src={myShop.logo} alt={myShop.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {myShop.name}
                </h1>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                  myShop.verificationStatus === 'verified'
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-900'
                    : 'bg-amber-950/70 text-amber-300 border border-amber-900'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  <span className="capitalize">{myShop.verificationStatus.replace('_', ' ')}</span>
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Shop Business Portal · {myShop.city}, {myShop.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-300 font-mono">
              Partner Plan: <strong className="text-emerald-400">₹399/mo Active</strong>
            </span>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="py-4 border-b border-[#1c1c1c] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'dashboard', label: 'Overview & Analytics', icon: BarChart3 },
            { id: 'products', label: `Products Catalog (${myProducts.length})`, icon: Package },
            { id: 'enquiries', label: 'Customer Enquiries', icon: MessageSquare },
            { id: 'subscription', label: 'Subscription (₹399/mo)', icon: CreditCard },
            { id: 'verification', label: 'Verification Desk', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePortalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePortalTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#141414] text-neutral-400 hover:text-white border border-[#242424]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview Dashboard */}
        {activePortalTab === 'dashboard' && (
          <div className="pt-6 space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#121212] border border-[#222222] rounded-2xl">
                <span className="text-xs text-neutral-500 font-mono">PROFILE VIEWS</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">2,840</p>
                <span className="text-[10px] text-emerald-400">+18% this month</span>
              </div>

              <div className="p-4 bg-[#121212] border border-[#222222] rounded-2xl">
                <span className="text-xs text-neutral-500 font-mono">PRODUCT CATALOG VIEWS</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">6,410</p>
                <span className="text-[10px] text-emerald-400">+24% from tagged posts</span>
              </div>

              <div className="p-4 bg-[#121212] border border-[#222222] rounded-2xl">
                <span className="text-xs text-neutral-500 font-mono">CUSTOMER ENQUIRIES</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">42</p>
                <span className="text-[10px] text-red-400">3 pending response</span>
              </div>

              <div className="p-4 bg-[#121212] border border-[#222222] rounded-2xl">
                <span className="text-xs text-neutral-500 font-mono">FEATURED EDITORIAL SLOTS</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">2 of 4</p>
                <span className="text-[10px] text-neutral-400">Slots remaining for Oct</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#121212] border border-[#222222] rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white font-display">Manage Product Catalog</h3>
                <p className="text-xs text-neutral-400">
                  Upload aftermarket components, specify vehicle compatibility, and tag your workshop in user builds.
                </p>
                <button
                  onClick={() => { setActivePortalTab('products'); setIsAddProductOpen(true); }}
                  className="px-4 py-2 bg-[#E50914] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Upload New Component</span>
                </button>
              </div>

              <div className="p-6 bg-[#121212] border border-[#222222] rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-white font-display">Customer Direct Messages</h3>
                <p className="text-xs text-neutral-400">
                  View and reply to fitment inquiries sent by enthusiasts for specific car models like Virtus, Slavia, and Thar.
                </p>
                <button
                  onClick={() => setIsMessagesOpen(true)}
                  className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#282828] text-neutral-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Open Inquiry Inbox</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Products Catalog */}
        {activePortalTab === 'products' && (
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Workshop Inventory & Catalog ({myProducts.length})
                </h3>
                <p className="text-xs text-neutral-400">Components listed under {myShop.name} on CARIX Marketplace</p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-[#E50914] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload New Product</span>
              </button>
            </div>

            {/* Add Product Modal Form */}
            {isAddProductOpen && (
              <div className="p-6 bg-[#151515] border border-[#2a2a2a] rounded-2xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">List New Aftermarket Component</h4>
                  <button onClick={() => setIsAddProductOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1 font-bold">
                      Item Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNewProdType('tool');
                          setNewProdCategory('Tools & Diagnostics');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          newProdType === 'tool' ? 'bg-emerald-600 text-white' : 'bg-[#202020] text-neutral-400'
                        }`}
                      >
                        🔧 Automotive Tool / Equipment
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewProdType('part');
                          setNewProdCategory('Front Lips');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          newProdType === 'part' ? 'bg-red-600 text-white' : 'bg-[#202020] text-neutral-400'
                        }`}
                      >
                        🏎️ Car Modification Part
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Title *</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. 3-Piece Aero Front Splitter or OBD2 Diagnostic Tool"
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Tools & Diagnostics">Tools & Diagnostics</option>
                      <option value="Front Lips">Front Lips</option>
                      <option value="Spoilers">Spoilers</option>
                      <option value="Alloys">Alloys & Wheels</option>
                      <option value="Side Skirts">Side Skirts</option>
                      <option value="Exhaust">Exhaust Systems</option>
                      <option value="Body Kits">Body Kits</option>
                      <option value="Lighting">Lighting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Price (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="16500"
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Difficulty Level</label>
                    <select
                      value={newProdDifficulty}
                      onChange={(e) => setNewProdDifficulty(e.target.value as any)}
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option>Beginner DIY</option>
                      <option>Intermediate</option>
                      <option>Professional Workshop</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                      Compatible Vehicles ("Konse car mai use hota ha") *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProdCars}
                      onChange={(e) => setNewProdCars(e.target.value)}
                      placeholder="e.g. Volkswagen Virtus GT, Skoda Slavia, Mahindra Thar, Hyundai Verna"
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Tools Required</label>
                    <input
                      type="text"
                      value={newProdToolsRequired}
                      onChange={(e) => setNewProdToolsRequired(e.target.value)}
                      placeholder="e.g. 10mm Socket Wrench, Masking Tape, Rubbing Alcohol"
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">
                      Step-by-Step Instructions & Guide (One step per line) *
                    </label>
                    <textarea
                      rows={3}
                      value={newProdInstructions}
                      onChange={(e) => setNewProdInstructions(e.target.value)}
                      placeholder="Step 1: Clean mounting surface with alcohol wipe...&#10;Step 2: Align with factory pre-drilled holes...&#10;Step 3: Fasten OEM bolts."
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white resize-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-neutral-400 mb-1 font-semibold">Description & Warranty</label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Precision engineered component tested on dyno and Indian road conditions..."
                      className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                      <input
                        type="checkbox"
                        checked={newProdFitmentVerified}
                        onChange={(e) => setNewProdFitmentVerified(e.target.checked)}
                        className="w-4 h-4 rounded text-[#E50914]"
                      />
                      <span>I certify physical workshop fitment test on these models</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#E50914] text-white text-xs font-semibold rounded-xl"
                      >
                        Publish to Marketplace
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProducts.map((p) => (
                <div key={p.id} className="p-4 bg-[#121212] border border-[#222222] rounded-2xl flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-[#2b2b2b]" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-red-400 font-mono uppercase">{p.category}</span>
                    <h4 className="text-xs font-semibold text-white truncate">{p.name}</h4>
                    <p className="text-sm font-bold text-white font-mono mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                    <span className="text-[10px] text-emerald-400">Stock: Active</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 3: Customer Enquiries */}
        {activePortalTab === 'enquiries' && (
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Direct Workshop Enquiries (Inbox)
            </h3>
            <div className="space-y-3">
              {messages.map((thread) => (
                <div key={thread.id} className="p-4 bg-[#121212] border border-[#242424] rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={thread.participantAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{thread.participantName}</h4>
                      <p className="text-xs text-neutral-300 mt-0.5">{thread.lastMessage}</p>
                      {thread.contextCar && (
                        <span className="text-[10px] text-neutral-500 font-mono">Vehicle: {thread.contextCar}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMessagesOpen(true)}
                    className="px-3.5 py-1.5 bg-[#E50914] text-white text-xs font-semibold rounded-xl"
                  >
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Subscription (₹399/month) */}
        {activePortalTab === 'subscription' && (
          <div className="pt-6 max-w-2xl space-y-6">
            <div className="p-6 bg-[#121212] border border-[#262626] rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">CARIX Shop Partner Subscription</h3>
                  <p className="text-xs text-neutral-400">Auto-renews on the 1st of every month</p>
                </div>
                <span className="text-2xl font-bold font-mono text-white">₹399<span className="text-xs text-neutral-500">/mo</span></span>
              </div>

              <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded-xl text-xs text-neutral-300 space-y-1.5">
                <p>✓ Business profile & catalogue listing</p>
                <p>✓ Direct customer WhatsApp enquiries</p>
                <p>✓ 2–4 editorial featured slots per month (subject to quality standards)</p>
                <p>✓ Tagged in customer car build showcases</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <button
                  onClick={() => setLegalModalType('partner_terms')}
                  className="text-neutral-400 hover:text-white underline"
                >
                  View Partner Terms
                </button>
                <button
                  onClick={() => showToast('Subscription active! Next billing date: 1st Nov 2026')}
                  className="px-4 py-2 bg-emerald-950 text-emerald-300 border border-emerald-900 rounded-xl font-medium"
                >
                  Active Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Verification Desk */}
        {activePortalTab === 'verification' && (
          <div className="pt-6 max-w-2xl space-y-6">
            <div className="p-6 bg-[#121212] border border-[#262626] rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E50914]" />
                <h3 className="text-base font-bold text-white">CARIX Verification Protocol</h3>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                The <strong className="text-emerald-400">CARIX Verified Badge</strong> is awarded only after physical and regulatory audit by our operations desk to protect car owners from fraud.
              </p>

              <div className="p-3 bg-[#181818] rounded-xl border border-[#2a2a2a] text-xs text-neutral-400 space-y-1">
                <p>Current Status: <strong className="text-white uppercase font-mono">{myShop.verificationStatus}</strong></p>
                <p>Reviewed by: CARIX Delhi/Mumbai Field Operations</p>
              </div>

              <form onSubmit={handleRequestVerification} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">GSTIN (Business Registration)</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Owner PAN / Identity Proof</label>
                  <input
                    type="text"
                    value={ownerPan}
                    onChange={(e) => setOwnerPan(e.target.value)}
                    className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Premises Proof Document</label>
                  <input
                    type="text"
                    value={addressProof}
                    onChange={(e) => setAddressProof(e.target.value)}
                    className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#E50914] text-white text-xs font-semibold rounded-xl shadow-md"
                  >
                    Submit for Operational Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
