import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Camera, Video, Car, Tag, Store, Sparkles, 
  MapPin, Hash, Plus, Check, Wrench, ShieldCheck, 
  Building2, BookOpen, AlertTriangle, CheckCircle2,
  Music, Disc, Volume2, Film
} from 'lucide-react';
import { Product } from '../../types';
import { SongPickerModal } from '../common/SongPickerModal';

export const CreatePostModal: React.FC = () => {
  const { 
    isCreatePostOpen, 
    setIsCreatePostOpen, 
    createNewPost, 
    addStory,
    currentUser, 
    userCars, 
    products, 
    shops,
    addNewProductToShop,
    showToast
  } = useApp();

  const [authorMode, setAuthorMode] = useState<'enthusiast' | 'company'>('enthusiast');

  // Enthusiast Post State
  const [publishDestination, setPublishDestination] = useState<'feed' | 'story' | 'both'>('feed');
  const [postType, setPostType] = useState<'build' | 'edit' | 'showcase' | 'question'>('build');
  const [mediaUrl, setMediaUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(userCars[0]?.id || '');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [isAskingSuggestions, setIsAskingSuggestions] = useState(false);
  const [suggestionTopic, setSuggestionTopic] = useState('');
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([]);
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);

  // Music & Song State (Requested: "song wala option bhi hona chahiye")
  const [selectedSong, setSelectedSong] = useState<{ title: string; artist: string; audioUrl?: string } | null>({
    title: '1.5 TSI Turbo Spool & Valvetronic Pops',
    artist: 'CARIX Pure Exhaust Audio'
  });
  const [isSongPickerOpen, setIsSongPickerOpen] = useState(false);

  // Drive Experience Verification State (Requested: must upload driving seat POV and car photo to verify before mentioning car)
  const [isDriveExperience, setIsDriveExperience] = useState(false);
  const [mentionedCarHandle, setMentionedCarHandle] = useState('');
  const [driverSeatProofUrl, setDriverSeatProofUrl] = useState('');
  const [carPhotoProofUrl, setCarPhotoProofUrl] = useState('');
  const [drivingVerdict, setDrivingVerdict] = useState<'Exhilarating' | 'Surprising Power' | 'Aggressive Exhaust' | 'Planted Handling' | 'Great Cruiser'>('Exhilarating');

  // Company Post State: Selling Part or Tool with compatible cars and instructions
  const [prodTitle, setProdTitle] = useState('');
  const [prodType, setProdType] = useState<'tool' | 'part'>('tool');
  const [prodCategory, setProdCategory] = useState('Tools & Diagnostics');
  const [prodPrice, setProdPrice] = useState('3499');
  const [prodCompatibleCars, setProdCompatibleCars] = useState('Volkswagen Virtus, Skoda Slavia, Hyundai Verna');
  const [prodToolsRequired, setProdToolsRequired] = useState('10mm Socket Wrench, Masking Tape');
  const [prodDifficulty, setProdDifficulty] = useState<'Beginner DIY' | 'Intermediate' | 'Professional Workshop'>('Beginner DIY');
  const [prodInstructions, setProdInstructions] = useState(
    'Step 1: Clean surface with rubbing alcohol.\nStep 2: Dry fit to check alignment.\nStep 3: Fasten OEM mounting bolts.'
  );

  if (!isCreatePostOpen) return null;

  const currentCar = userCars.find(c => c.id === selectedCarId) || userCars[0];

  const hasMentionedCar = Boolean(mentionedCarHandle.trim());
  const hasDriverSeatProof = Boolean(driverSeatProofUrl.trim());
  const hasCarPhotoProof = Boolean(carPhotoProofUrl.trim());
  const isDriveVerified = hasDriverSeatProof && hasCarPhotoProof;
  const isMentionBlocked = isDriveExperience && hasMentionedCar && !isDriveVerified;

  const handleTogglePart = (partId: string) => {
    setSelectedPartIds(prev => 
      prev.includes(partId) ? prev.filter(id => id !== partId) : [...prev, partId]
    );
  };

  const handleToggleShop = (shopId: string) => {
    setSelectedShopIds(prev => 
      prev.includes(shopId) ? prev.filter(id => id !== shopId) : [...prev, shopId]
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (authorMode === 'company') {
      if (!prodTitle.trim() || !prodPrice) {
        showToast('Please enter title and price for product/tool');
        return;
      }

      const instructionsList = prodInstructions
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean);

      const targetShop = shops[0];

      // Add to products catalog
      addNewProductToShop(targetShop.id, {
        name: prodTitle.trim(),
        category: prodCategory,
        productType: prodType,
        price: Number(prodPrice),
        image: mediaUrl.trim() || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        rating: 5.0,
        reviewCount: 1,
        compatibleCars: prodCompatibleCars.split(',').map(s => s.trim()).filter(Boolean),
        isFitmentVerified: true,
        stockStatus: 'in_stock',
        description: caption.trim() || `${prodType === 'tool' ? 'Automotive specialty tool' : 'Custom modification part'} with full compatibility and DIY installation guide.`,
        toolsRequired: prodToolsRequired.split(',').map(s => s.trim()).filter(Boolean),
        difficulty: prodDifficulty,
        instructions: instructionsList,
        installationNotes: `${instructionsList.length} step installation guide provided by ${targetShop.name}.`
      });

      // Also create a community post announcing the product with car tags
      createNewPost({
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        postAs: 'user',
        carModel: prodCompatibleCars.split(',')[0] || 'Universal Fitment',
        mediaUrl: mediaUrl.trim() || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        mediaType: 'image',
        caption: `[NEW ${prodType === 'tool' ? 'TOOL' : 'PART'} RELEASE] ${prodTitle.trim()} — ₹${Number(prodPrice).toLocaleString('en-IN')}.\n${caption.trim()}\n\nCompatible with: ${prodCompatibleCars}\nIncludes full step-by-step instructions!`,
        location: location.trim(),
        taggedParts: [{
          partId: `prod-new-${Date.now()}`,
          partName: prodTitle.trim(),
          category: prodCategory,
          price: Number(prodPrice)
        }],
        taggedShops: [{
          shopId: targetShop.id,
          shopName: targetShop.name,
          location: targetShop.city,
          isVerified: targetShop.isVerified
        }],
        category: 'showcase',
        hashtags: ['#CARIXMarketplace', '#CarTools', '#CarMods']
      });

      showToast(`Published ${prodTitle} to CARIX Marketplace and Community!`);
      setIsCreatePostOpen(false);
      return;
    }

    // Enthusiast Post Flow
    if (!caption.trim()) return;

    const taggedParts = selectedPartIds.map(id => {
      const p = products.find(prod => prod.id === id);
      return {
        partId: id,
        partName: p ? p.name : 'Custom Mod Part',
        category: p ? p.category : 'Exterior',
        price: p?.price
      };
    });

    const taggedShops = selectedShopIds.map(id => {
      const s = shops.find(sh => sh.id === id);
      return {
        shopId: id,
        shopName: s ? s.name : 'Authorized Shop',
        location: s ? `${s.city}` : 'India',
        isVerified: s ? s.isVerified : true
      };
    });

    const hasMentionedCar = Boolean(mentionedCarHandle.trim());
    const hasDriverSeatProof = Boolean(driverSeatProofUrl.trim());
    const hasCarPhotoProof = Boolean(carPhotoProofUrl.trim());
    const isDriveVerified = hasDriverSeatProof && hasCarPhotoProof;
    const isMentionBlocked = isDriveExperience && hasMentionedCar && !isDriveVerified;

    if (isMentionBlocked) {
      showToast('Verification Required: You cannot mention this car without uploading driving seat POV and car photo!');
      return;
    }

    const postPayload = {
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      postAs: currentCar ? ('car' as const) : ('user' as const),
      authorCarId: currentCar?.id,
      authorCarUsername: currentCar?.carUsername,
      carModel: currentCar ? `${currentCar.make} ${currentCar.model} (${currentCar.year})` : 'Volkswagen Virtus GT',
      carName: currentCar?.carName,
      mediaUrl: mediaUrl.trim() || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      mediaType: postType === 'edit' ? ('video' as const) : ('image' as const),
      caption: caption.trim(),
      location: location.trim(),
      taggedParts,
      taggedShops,
      isAskingSuggestions,
      suggestionTopic: isAskingSuggestions ? suggestionTopic.trim() : undefined,
      category: postType === 'edit' ? ('reel' as const) : postType,
      hashtags: ['#CARIX', '#CarBuild', `#${currentCar?.carUsername || 'modifiedcars'}`],
      isDriveExperience,
      isDriveExperienceVerified: isDriveExperience && isDriveVerified,
      driverSeatProofUrl: driverSeatProofUrl.trim() || undefined,
      carPhotoProofUrl: carPhotoProofUrl.trim() || undefined,
      mentionedCarHandle: isDriveVerified ? mentionedCarHandle.trim() : undefined,
      drivingVerdict: isDriveExperience ? drivingVerdict : undefined,
      audioTitle: selectedSong?.title,
      audioArtist: selectedSong?.artist,
      audioUrl: selectedSong?.audioUrl
    };

    if (publishDestination === 'feed' || publishDestination === 'both') {
      createNewPost(postPayload);
    }

    if (publishDestination === 'story' || publishDestination === 'both') {
      addStory({
        authorId: currentUser.id,
        authorUsername: currentUser.username,
        authorAvatar: currentUser.avatar,
        isCarProfile: false,
        carUsername: currentCar?.carUsername,
        mediaUrl: mediaUrl.trim() || driverSeatProofUrl.trim() || 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        caption: isDriveExperience ? `[Drive Experience] ${caption.trim()}` : caption.trim(),
        type: 'photo',
        isDriveExperience,
        driverSeatProofUrl: driverSeatProofUrl.trim() || undefined,
        mentionedCarHandle: isDriveVerified ? mentionedCarHandle.trim() : undefined,
        audioTitle: selectedSong?.title,
        audioArtist: selectedSong?.artist,
        audioUrl: selectedSong?.audioUrl
      });
    }

    showToast(
      publishDestination === 'story'
        ? 'Published Drive Experience to 24h Story!'
        : publishDestination === 'both'
          ? 'Published to Community Feed & 24h Story!'
          : 'Published to Community Feed!'
    );

    setIsCreatePostOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E50914] flex items-center justify-center text-white">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Create on CARIX</h3>
              <p className="text-[11px] text-neutral-400">
                Post car modifications, reels, or publish products & tools with vehicle compatibility
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post As Switcher: Enthusiast vs Company Product/Tool */}
        <div className="px-5 pt-4">
          <div className="p-1 bg-[#1a1a1a] border border-[#292929] rounded-2xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setAuthorMode('enthusiast')}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                authorMode === 'enthusiast'
                  ? 'bg-neutral-200 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Car Enthusiast Post / Reel</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthorMode('company')}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                authorMode === 'company'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Company: Sell Tool / Part with Instructions</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          
          {/* FLOW A: ENTHUSIAST POST */}
          {authorMode === 'enthusiast' && (
            <>
              {/* Destination Selector: Feed, Story or Both (Requested: "story v laga sakta ha") */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1.5 font-bold">
                  Publish Destination
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'feed', label: '📱 Community Feed' },
                    { id: 'story', label: '⚡ 24h Story' },
                    { id: 'both', label: '🔄 Both (Feed & Story)' }
                  ].map(dest => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setPublishDestination(dest.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                        publishDestination === dest.id
                          ? 'bg-[#E50914] text-white border-[#E50914] shadow-md'
                          : 'bg-[#181818] text-neutral-400 border-[#282828] hover:border-neutral-600'
                      }`}
                    >
                      {dest.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Type Selector */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1.5 font-bold">
                  Post Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'build', label: 'Build Update' },
                    { id: 'edit', label: '🎬 Car Reel / Edit' },
                    { id: 'showcase', label: 'Photo Showcase' },
                    { id: 'question', label: 'Seek Suggestions' },
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => {
                        setPostType(t.id as any);
                        if (t.id === 'question') setIsAskingSuggestions(true);
                      }}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        postType === t.id
                          ? 'bg-white text-black border-white font-semibold shadow-xs'
                          : 'bg-[#1a1a1a] text-neutral-300 border-[#2b2b2b] hover:border-neutral-500'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reel Mode Banner (Requested: "aur reel jaisa wala option v") */}
              {postType === 'edit' && (
                <div className="p-3 bg-gradient-to-r from-red-950/40 via-[#181818] to-neutral-900 border border-red-900/60 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#E50914] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Vertical 9:16 Reel Mode</span>
                      <span className="text-[11px] text-neutral-400">
                        Plays in full-screen CARIX Reel feed with synced music & engine spool notes
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-red-950 text-red-300 border border-red-800 shrink-0 font-bold">
                    REEL ON
                  </span>
                </div>
              )}

              {/* Music / Song Selector (Requested: "song wala option bhi hona chahiye") */}
              <div className="p-3 bg-[#181818] border border-[#282828] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Background Song / Audio Track</span>
                  </span>
                  {selectedSong ? (
                    <button
                      type="button"
                      onClick={() => setSelectedSong(null)}
                      className="text-[10px] font-mono text-neutral-400 hover:text-red-400"
                    >
                      Remove Audio
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-500">Optional</span>
                  )}
                </div>

                {selectedSong ? (
                  <div className="p-2.5 rounded-xl bg-[#111111] border border-neutral-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-red-950/70 border border-red-800 flex items-center justify-center text-[#E50914] shrink-0">
                        <Disc className="w-4 h-4 animate-spin [animation-duration:4s]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{selectedSong.title}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{selectedSong.artist}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSongPickerOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-[#202020] hover:bg-[#282828] text-[11px] font-mono text-neutral-200"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSongPickerOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl border border-dashed border-neutral-700 hover:border-[#E50914] bg-[#121212] hover:bg-[#1c1c1c] text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-medium cursor-pointer"
                  >
                    <Music className="w-4 h-4 text-[#E50914]" />
                    <span>Choose Music / Raw Exhaust Note (Shubh, Phonk, 1.5 TSI Spool...)</span>
                  </button>
                )}
              </div>

              {/* Select Car from Garage */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Select Car from Your Garage
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                >
                  {userCars.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.carName} (@{c.carUsername}) — {c.make} {c.model} ({c.year}) • {c.stage}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media URL */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Media Image / Reel URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or paste image/video link"
                    className="flex-1 bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                  <button
                    type="button"
                    onClick={() => setMediaUrl('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80')}
                    className="px-3 py-2 bg-[#202020] hover:bg-[#282828] border border-[#333333] text-neutral-300 text-xs rounded-xl"
                  >
                    Sample
                  </button>
                </div>
              </div>

              {/* Drive Experience Verification Box (Requested: must upload driver's seat POV and car photo to verify before mentioning car) */}
              <div className={`p-4 rounded-2xl border transition-all space-y-3.5 ${
                isDriveExperience ? 'bg-[#181818] border-[#383838]' : 'bg-[#141414] border-[#242424]'
              }`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2 text-xs font-bold text-white">
                    <Car className="w-4 h-4 text-[#E50914]" />
                    <span>Drive Experience Review & Car Mention</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={isDriveExperience}
                    onChange={(e) => setIsDriveExperience(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E50914] bg-[#222222] border-neutral-700"
                  />
                </label>

                {isDriveExperience && (
                  <div className="space-y-3.5 pt-2 border-t border-[#262626] animate-in fade-in">
                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                        Mention / Tag Car Handle
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={mentionedCarHandle}
                          onChange={(e) => setMentionedCarHandle(e.target.value)}
                          placeholder="e.g. @midnight_virtus or @vajra_thar"
                          className="flex-1 bg-[#121212] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                        />
                        <button
                          type="button"
                          onClick={() => setMentionedCarHandle('@midnight_virtus')}
                          className="px-2.5 py-1.5 bg-[#202020] hover:bg-[#282828] rounded-xl text-[11px] text-neutral-300 font-mono"
                        >
                          @midnight_virtus
                        </button>
                        <button
                          type="button"
                          onClick={() => setMentionedCarHandle('@vajra_thar')}
                          className="px-2.5 py-1.5 bg-[#202020] hover:bg-[#282828] rounded-xl text-[11px] text-neutral-300 font-mono"
                        >
                          @vajra_thar
                        </button>
                      </div>
                    </div>

                    {/* Driving verdict */}
                    <div>
                      <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                        Driving Verdict & Feel
                      </label>
                      <select
                        value={drivingVerdict}
                        onChange={(e) => setDrivingVerdict(e.target.value as any)}
                        className="w-full bg-[#121212] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
                      >
                        <option value="Exhilarating">Exhilarating & Punchy Acceleration</option>
                        <option value="Surprising Power">Surprising Power Delivery & Boost</option>
                        <option value="Aggressive Exhaust">Aggressive Exhaust Roar & Decibel Thrill</option>
                        <option value="Planted Handling">Planted Handling & Razor-sharp Cornering</option>
                        <option value="Great Cruiser">Great Long-distance High-speed Cruiser</option>
                      </select>
                    </div>

                    {/* Verification Status Banner */}
                    {Boolean(mentionedCarHandle.trim()) && (
                      <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                        (!driverSeatProofUrl.trim() || !carPhotoProofUrl.trim())
                          ? 'bg-red-950/40 border-red-900/60 text-red-200'
                          : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200'
                      }`}>
                        {(!driverSeatProofUrl.trim() || !carPhotoProofUrl.trim()) ? (
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-0.5">
                          <p className="font-bold">
                            {(!driverSeatProofUrl.trim() || !carPhotoProofUrl.trim())
                              ? '⚠️ Car Mention Locked: Upload Driving Seat POV & Car Photo'
                              : '✅ Drive Experience Verified! Mention Unlocked'}
                          </p>
                          <p className="text-[11px] leading-relaxed opacity-90">
                            {(!driverSeatProofUrl.trim() || !carPhotoProofUrl.trim())
                              ? `You cannot mention ${mentionedCarHandle} until you upload BOTH Driver's Seat POV and Car exterior photos verifying you personally drove this car.`
                              : `Both steering cockpit POV and vehicle exterior proofs verified. You can now mention ${mentionedCarHandle} in your post and story!`}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 2 Verification Photo Uploaders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Proof 1: Driver Seat POV */}
                      <div className="p-3 bg-[#121212] border border-[#2b2b2b] rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-white flex items-center gap-1">
                            <Camera className="w-3 h-3 text-[#E50914]" />
                            1. Driver's Seat POV
                          </span>
                          {driverSeatProofUrl ? (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">✓ Uploaded</span>
                          ) : (
                            <span className="text-[9px] font-mono text-red-400">Required *</span>
                          )}
                        </div>

                        {driverSeatProofUrl ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-700">
                            <img src={driverSeatProofUrl} alt="Driver Seat POV" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setDriverSeatProofUrl('')}
                              className="absolute top-1 right-1 p-1 rounded bg-black/70 text-white hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <input
                              type="url"
                              placeholder="Driver cockpit POV photo link..."
                              value={driverSeatProofUrl}
                              onChange={(e) => setDriverSeatProofUrl(e.target.value)}
                              className="w-full bg-[#181818] border border-[#2d2d2d] rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#E50914]"
                            />
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => setDriverSeatProofUrl('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80')}
                                className="flex-1 py-1 rounded bg-[#202020] hover:bg-[#2c2c2c] text-[10px] font-medium text-neutral-300 text-center"
                              >
                                📸 Camera Cockpit
                              </button>
                              <button
                                type="button"
                                onClick={() => setDriverSeatProofUrl('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80')}
                                className="flex-1 py-1 rounded bg-[#202020] hover:bg-[#2c2c2c] text-[10px] font-medium text-neutral-300 text-center"
                              >
                                🖼️ From Gallery
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Proof 2: Car Exterior Photo */}
                      <div className="p-3 bg-[#121212] border border-[#2b2b2b] rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-white flex items-center gap-1">
                            <Car className="w-3 h-3 text-[#E50914]" />
                            2. Car Exterior Photo
                          </span>
                          {carPhotoProofUrl ? (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">✓ Uploaded</span>
                          ) : (
                            <span className="text-[9px] font-mono text-red-400">Required *</span>
                          )}
                        </div>

                        {carPhotoProofUrl ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-700">
                            <img src={carPhotoProofUrl} alt="Car Exterior" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setCarPhotoProofUrl('')}
                              className="absolute top-1 right-1 p-1 rounded bg-black/70 text-white hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <input
                              type="url"
                              placeholder="Car exterior photo link..."
                              value={carPhotoProofUrl}
                              onChange={(e) => setCarPhotoProofUrl(e.target.value)}
                              className="w-full bg-[#181818] border border-[#2d2d2d] rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#E50914]"
                            />
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => setCarPhotoProofUrl('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80')}
                                className="flex-1 py-1 rounded bg-[#202020] hover:bg-[#2c2c2c] text-[10px] font-medium text-neutral-300 text-center"
                              >
                                📸 Camera Shot
                              </button>
                              <button
                                type="button"
                                onClick={() => setCarPhotoProofUrl('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80')}
                                className="flex-1 py-1 rounded bg-[#202020] hover:bg-[#2c2c2c] text-[10px] font-medium text-neutral-300 text-center"
                              >
                                🖼️ From Gallery
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Caption & Modification Story
                </label>
                <textarea
                  required
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tell the community what parts you installed, how it drives, or what you plan to change next..."
                  className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] resize-none"
                />
              </div>

              {/* Ask Community for Suggestions */}
              <div className="p-3 bg-[#1a1414] border border-[#381a1a] rounded-xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAskingSuggestions}
                    onChange={(e) => setIsAskingSuggestions(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E50914] bg-[#222222] border-neutral-700"
                  />
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Ask Community for Suggestions on this build</span>
                  </span>
                </label>

                {isAskingSuggestions && (
                  <input
                    type="text"
                    value={suggestionTopic}
                    onChange={(e) => setSuggestionTopic(e.target.value)}
                    placeholder="e.g. Which alloy wheel color: Satin Bronze or Piano Black?"
                    className="w-full bg-[#141414] border border-[#2b2b2b] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#E50914]"
                  />
                )}
              </div>

              {/* Tag Modification Parts */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Tag Modification Parts Used
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-[#171717] border border-[#262626] rounded-xl">
                  {products.map(p => {
                    const isSelected = selectedPartIds.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => handleTogglePart(p.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#E50914] text-white font-medium'
                            : 'bg-[#222222] text-neutral-300 hover:text-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tag Automobile Shop */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Tag Workshop / Seller
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 bg-[#171717] border border-[#262626] rounded-xl">
                  {shops.map(s => {
                    const isSelected = selectedShopIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => handleToggleShop(s.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-medium'
                            : 'bg-[#222222] text-neutral-300 hover:text-white'
                        }`}
                      >
                        <Store className="w-3 h-3" />
                        <span>{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* FLOW B: COMPANY SELLING TOOL / PART WITH INSTRUCTIONS */}
          {authorMode === 'company' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#141b14] border border-[#223524] rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Company Listing Mode: Post tools and parts with verified compatible cars ("Konse car mai use hota ha") and step-by-step instructions.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    value={prodTitle}
                    onChange={e => setProdTitle(e.target.value)}
                    placeholder="e.g. VAG OBD2 Diagnostic Tool or 3-Piece Lip"
                    required
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                    Item Type
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setProdType('tool');
                        setProdCategory('Tools & Diagnostics');
                      }}
                      className={`py-1.5 rounded-lg text-xs font-semibold ${
                        prodType === 'tool' ? 'bg-emerald-600 text-white' : 'bg-[#202020] text-neutral-400'
                      }`}
                    >
                      🔧 Tool / Equipment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProdType('part');
                        setProdCategory('Front Lips');
                      }}
                      className={`py-1.5 rounded-lg text-xs font-semibold ${
                        prodType === 'part' ? 'bg-red-600 text-white' : 'bg-[#202020] text-neutral-400'
                      }`}
                    >
                      🏎️ Modification Part
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={e => setProdPrice(e.target.value)}
                    placeholder="3499"
                    required
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                    Difficulty Level
                  </label>
                  <select
                    value={prodDifficulty}
                    onChange={e => setProdDifficulty(e.target.value as any)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Beginner DIY</option>
                    <option>Intermediate</option>
                    <option>Professional Workshop</option>
                  </select>
                </div>
              </div>

              {/* Konse car mai use hota ha */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold flex items-center justify-between">
                  <span>Compatible Cars ("Konse Car Mai Use Hota Ha") *</span>
                  <span className="text-emerald-400 lowercase font-normal">comma separated</span>
                </label>
                <input
                  type="text"
                  value={prodCompatibleCars}
                  onChange={e => setProdCompatibleCars(e.target.value)}
                  placeholder="e.g. Volkswagen Virtus GT, Skoda Slavia, Hyundai Verna, Mahindra Thar"
                  className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Tools Required */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Tools Required for Installation
                </label>
                <input
                  type="text"
                  value={prodToolsRequired}
                  onChange={e => setProdToolsRequired(e.target.value)}
                  placeholder="e.g. 10mm Socket Wrench, Masking Tape, Torque Wrench"
                  className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Step-by-Step Installation Instructions (One step per line) *
                </label>
                <textarea
                  rows={4}
                  value={prodInstructions}
                  onChange={e => setProdInstructions(e.target.value)}
                  placeholder="Step 1: Clean surface with rubbing alcohol...&#10;Step 2: Dry fit to check alignment...&#10;Step 3: Fasten OEM mounting bolts..."
                  required
                  className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono text-xs leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={e => setMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or paste image link"
                  className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-bold">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
                className="w-full bg-[#1b1b1b] border border-[#2d2d2d] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-3">
            {isMentionBlocked ? (
              <span className="text-[11px] font-mono text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Proof required: Upload driver seat POV & car photo to mention {mentionedCarHandle}
              </span>
            ) : (
              <span className="text-[11px] font-mono text-neutral-500">
                {publishDestination === 'story'
                  ? '⚡ Will expire in 24 hours'
                  : publishDestination === 'both'
                    ? '🔄 Publishing to Feed & 24h Story'
                    : '📱 Publishing to CARIX Feed'}
              </span>
            )}

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIsCreatePostOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={authorMode === 'enthusiast' && isMentionBlocked}
                className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-1.5 ${
                  authorMode === 'company'
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : isMentionBlocked
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                      : 'bg-[#E50914] hover:bg-[#c90812]'
                }`}
              >
                {authorMode === 'company'
                  ? 'Publish Item & Instructions'
                  : isMentionBlocked
                    ? 'Upload Proofs to Unlock Mention'
                    : publishDestination === 'story'
                      ? 'Publish to Story'
                      : publishDestination === 'both'
                        ? 'Publish Post & Story'
                        : 'Publish Post'}
              </button>
            </div>
          </div>

        </form>

        {/* Music Selector Modal */}
        <SongPickerModal
          isOpen={isSongPickerOpen}
          onClose={() => setIsSongPickerOpen(false)}
          onSelectSong={(song) => {
            setSelectedSong(song);
            showToast(`Selected audio: ${song.title}`);
          }}
          currentSongTitle={selectedSong?.title}
        />

      </div>
    </div>
  );
};
