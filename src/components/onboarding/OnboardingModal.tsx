import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, User, Building2, Car, Sparkles, Check, 
  ArrowRight, ArrowLeft, Camera, ShieldCheck, 
  Lock, Eye, EyeOff, Search, Plus, Upload, 
  Wrench, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { UserCar } from '../../types';
import { INDIAN_CAR_DATABASE } from '../../data/mockData';

const ALL_INTERESTS = [
  'Car Modifications',
  'Modified Cars',
  'Car Photography',
  'Car Edits',
  'Car Reels',
  'Performance',
  'Detailing',
  'Wraps',
  'Wheels',
  'Tyres',
  'Body Kits',
  'Luxury Cars',
  'Sports Cars',
  'SUVs',
  'Sedans',
  'Hatchbacks',
  'EVs',
  'Classic Cars',
  'JDM',
  'European Cars',
  'Indian Cars',
  'Off-Road',
  'Motorsport',
  'Car Audio',
  'Automotive Technology'
];

const POPULAR_BRANDS = [
  'Volkswagen',
  'Skoda',
  'Hyundai',
  'Tata',
  'Mahindra',
  'Honda',
  'Toyota',
  'Maruti Suzuki',
  'Kia',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Porsche',
  'Ford',
  'MG'
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    setCurrentUser, 
    userCars, 
    setUserCars, 
    showToast, 
    setCurrentTab,
    switchUserRole 
  } = useApp();

  // Screen flow:
  // 'choose_type' -> 'personal_profile' -> 'personal_interests' -> 'ask_car' -> 'car_details' -> 'done'
  // Or 'choose_type' -> 'business_details' -> 'business_docs' -> 'done'
  const [step, setStep] = useState<
    'choose_type' | 
    'personal_profile' | 
    'personal_interests' | 
    'ask_car' | 
    'car_details' | 
    'business_details' | 
    'business_docs' | 
    'completed'
  >('choose_type');

  const [accountChoice, setAccountChoice] = useState<'personal' | 'business'>('personal');

  // Personal Form Fields
  const [fullName, setFullName] = useState('Mantra Tiwari');
  const [username, setUsername] = useState('mantra_tiwari_999');
  const [emailOrPhone, setEmailOrPhone] = useState('carix.modifications@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [dob, setDob] = useState('2003-05-18');
  const [cityCountry, setCityCountry] = useState('Mumbai, India');
  const [profilePhoto, setProfilePhoto] = useState(currentUser.avatar);

  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Car Modifications',
    'Modified Cars',
    'Performance',
    'Wheels',
    'Indian Cars'
  ]);
  const [brandSearch, setBrandSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    'Volkswagen',
    'Mahindra',
    'Skoda'
  ]);

  // Car Collection
  const [howManyCars, setHowManyCars] = useState<string>('2');
  const [carNickname, setCarNickname] = useState('MIDNIGHT');
  const [carUsername, setCarUsername] = useState('midnight_virtus');
  const [carMake, setCarMake] = useState('Volkswagen');
  const [carModel, setCarModel] = useState('Virtus');
  const [carYear, setCarYear] = useState(2026);
  const [carVariant, setCarVariant] = useState('GT Plus 1.5 TSI DSG');
  const [carColor, setCarColor] = useState('Candy White & Gloss Black');
  const [carFuelType, setCarFuelType] = useState<'Petrol' | 'Diesel' | 'Hybrid' | 'EV' | 'CNG'>('Petrol');
  const [carTransmission, setCarTransmission] = useState<'Manual' | 'Automatic (DSG/DCT)' | 'Torque Converter' | 'CVT'>('Automatic (DSG/DCT)');
  const [carStage, setCarStage] = useState('Stage 2 Exterior & Stance');
  const [carRegNumber, setCarRegNumber] = useState('MH 02 ER 9999');
  const [isRegNumberPublic, setIsRegNumberPublic] = useState(false); // Default PRIVATE!
  const [carMileage, setCarMileage] = useState('18,500 km');
  const [carPurchaseYear, setCarPurchaseYear] = useState(2024);

  // Business Form Fields
  const [businessName, setBusinessName] = useState('Stealth Auto Labs');
  const [businessUsername, setBusinessUsername] = useState('stealth_mumbai');
  const [businessType, setBusinessType] = useState('Modification Shop & Detailing Studio');
  const [businessCity, setBusinessCity] = useState('Mumbai');
  const [businessPhone, setBusinessPhone] = useState('+91 98200 44123');
  const [businessEmail, setBusinessEmail] = useState('info@stealthautolabs.in');
  const [businessDocType, setBusinessDocType] = useState('GST Registration');
  const [businessGstNumber, setBusinessGstNumber] = useState('27AADCS1234F1Z8');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleFinishPersonal = () => {
    // Save personal user
    setCurrentUser(prev => ({
      ...prev,
      displayName: fullName,
      username: username,
      location: cityCountry,
      accountType: 'personal',
      role: 'enthusiast',
      interests: selectedInterests,
      followedBrands: selectedBrands
    }));

    showToast(`Welcome to CARIX, ${fullName}! Your automotive profile is active.`);
    setStep('completed');
  };

  const handleAddCarAndFinish = () => {
    const newCar: UserCar = {
      id: `car-${Date.now()}`,
      userId: currentUser.id,
      ownerUsername: username,
      carName: carNickname,
      carUsername: carUsername || carNickname.toLowerCase().replace(/\s+/g, '_'),
      make: carMake,
      model: carModel,
      variant: carVariant,
      year: Number(carYear),
      color: carColor,
      fuelType: carFuelType,
      transmission: carTransmission,
      stage: carStage,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
      buildStory: `Custom ${carYear} ${carMake} ${carModel} crafted with distinct aero styling and community input.`,
      likesCount: 120,
      followersCount: 350,
      postsCount: 1,
      buildProgress: {
        exterior: 70,
        wheels: 100,
        lighting: 40,
        performance: 35,
        interior: 30
      },
      registrationNumber: carRegNumber,
      isRegNumberPublic: isRegNumberPublic, // Kept private unless chosen public!
      purchaseYear: Number(carPurchaseYear),
      mileage: carMileage,
      instagramHandle: `@${carUsername}`,
      isFollowed: true,
      modifications: [
        { id: 'm-new-1', name: 'AeroCraft Gloss Black Front Lip', category: 'Front Lips', cost: 16500 },
        { id: 'm-new-2', name: 'Custom Flow-Formed Alloys', category: 'Alloys', cost: 68000 }
      ]
    };

    setUserCars(prev => [newCar, ...prev]);
    showToast(`Car @${newCar.carUsername} registered in your garage with its own profile!`);
    handleFinishPersonal();
  };

  const handleFinishBusiness = () => {
    switchUserRole('shop_owner');
    showToast(`Business profile registered for ${businessName}! Documents under review for verification.`);
    setStep('completed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-[#2b2b2b] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#202020] bg-[#161616] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              CARIX V5 Onboarding & Identity
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Step Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">

          {/* SCREEN 1: HOW DO YOU WANT TO USE CARIX? */}
          {step === 'choose_type' && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E50914] font-bold">
                  Step 1 of Onboarding
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  HOW DO YOU WANT TO USE CARIX?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  CARIX provides dedicated automotive identities for both enthusiast drivers and professional businesses.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Option 1: Car Enthusiast */}
                <button
                  type="button"
                  onClick={() => {
                    setAccountChoice('personal');
                    setStep('personal_profile');
                  }}
                  className="p-6 rounded-2xl bg-[#171717] hover:bg-[#202020] border-2 border-[#2c2c2c] hover:border-[#E50914] transition-all flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-950/50 border border-red-900/60 text-[#E50914] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Car className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    I’m a Car Enthusiast
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Create automotive profiles, add your cars with dedicated handles, share edits/reels, discover parts & get AI suggestions.
                  </p>
                  <span className="mt-4 text-xs font-semibold text-[#E50914] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Continue as Enthusiast →
                  </span>
                </button>

                {/* Option 2: Business / Automotive Company */}
                <button
                  type="button"
                  onClick={() => {
                    setAccountChoice('business');
                    setStep('business_details');
                  }}
                  className="p-6 rounded-2xl bg-[#171717] hover:bg-[#202020] border-2 border-[#2c2c2c] hover:border-emerald-500 transition-all flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/50 border border-emerald-900/60 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    I’m a Business / Automotive Company
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Post tools & parts with compatible car badges, publish installation guides, get verified badge & receive customer enquiries.
                  </p>
                  <span className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Continue as Business →
                  </span>
                </button>

              </div>
            </div>
          )}

          {/* SCREEN 2: PERSONAL USER REGISTRATION */}
          {step === 'personal_profile' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#E50914] uppercase font-bold">
                  Enthusiast Account Registration
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Create your personal automotive profile
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Email / Mobile
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={cityCountry}
                    onChange={e => setCityCountry(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setStep('choose_type')}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep('personal_interests')}
                  className="px-6 py-2.5 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <span>Next: What You're Into</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 3: TELL US WHAT YOU'RE INTO (INTERESTS & BRANDS) */}
          {step === 'personal_interests' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#E50914] uppercase font-bold">
                    Personalized Feed & Suggestions
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Tell us what you’re into.
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Select the automotive categories and car makers you love.
                  </p>
                </div>

                {/* SKIP FOR NOW BUTTON */}
                <button
                  type="button"
                  onClick={() => setStep('ask_car')}
                  className="px-3 py-1.5 rounded-lg bg-[#202020] hover:bg-[#2a2a2a] text-xs font-semibold text-neutral-300 transition-colors uppercase font-mono tracking-wider shrink-0"
                >
                  Skip for Now
                </button>
              </div>

              {/* INTEREST TAGS */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold">
                  Interests ({selectedInterests.length} selected)
                </span>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
                  {ALL_INTERESTS.map(interest => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          active
                            ? 'bg-[#E50914] text-white font-semibold shadow-sm'
                            : 'bg-[#181818] border border-[#292929] text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {active && '✓ '}
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BRAND SELECTION */}
              <div className="space-y-2 pt-2 border-t border-[#202020]">
                <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold">
                  Automotive Brands You Love ({selectedBrands.length} selected)
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_BRANDS.map(brand => {
                    const active = selectedBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleBrand(brand)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          active
                            ? 'bg-neutral-200 text-black font-semibold'
                            : 'bg-[#181818] border border-[#292929] text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {active && '✓ '}
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setStep('personal_profile')}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('ask_car')}
                    className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                  >
                    Skip
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('ask_car')}
                    className="px-6 py-2.5 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <span>Save Interests & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: DO YOU WANT TO ADD YOUR CAR? */}
          {step === 'ask_car' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-red-950/40 border border-red-900/60 text-[#E50914] flex items-center justify-center mx-auto">
                <Car className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#E50914] uppercase font-bold">
                  Car Identity Studio
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  DO YOU WANT TO ADD YOUR CAR?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Every added car gets its OWN Instagram-style profile (like <span className="font-mono text-white">@midnight_virtus</span>) with build progression, modifications, and tagged shops.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('car_details')}
                  className="w-full sm:w-auto px-8 py-3 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD MY CAR</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishPersonal}
                  className="w-full sm:w-auto px-6 py-3 bg-[#1e1e1e] hover:bg-[#262626] border border-[#2f2f2f] text-neutral-300 text-xs font-semibold rounded-xl"
                >
                  SKIP FOR NOW
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: CAR DETAILS ONBOARDING */}
          {step === 'car_details' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#E50914] uppercase font-bold">
                  Car Identity Profile Creation
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Give your vehicle its own identity
                </h3>
                <p className="text-xs text-neutral-400">
                  This creates a dedicated profile for your car on CARIX.
                </p>
              </div>

              {/* Number of cars prompt */}
              <div className="p-3 bg-[#161616] border border-[#222222] rounded-xl flex items-center justify-between text-xs">
                <span className="text-neutral-400">How many cars do you have?</span>
                <div className="flex gap-1.5">
                  {['1', '2', '3', '4', '5+'].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHowManyCars(num)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        howManyCars === num 
                          ? 'bg-[#E50914] text-white' 
                          : 'bg-[#202020] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Car Nickname *
                  </label>
                  <input
                    type="text"
                    value={carNickname}
                    onChange={e => setCarNickname(e.target.value)}
                    placeholder="e.g. MIDNIGHT or VAJRA"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Car Username / Handle (@) *
                  </label>
                  <input
                    type="text"
                    value={carUsername}
                    onChange={e => setCarUsername(e.target.value)}
                    placeholder="e.g. midnight_virtus"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Make *
                  </label>
                  <input
                    type="text"
                    value={carMake}
                    onChange={e => setCarMake(e.target.value)}
                    placeholder="e.g. Volkswagen"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    placeholder="e.g. Virtus GT"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Year of Manufacture *
                  </label>
                  <input
                    type="number"
                    value={carYear}
                    onChange={e => setCarYear(Number(e.target.value))}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Variant *
                  </label>
                  <input
                    type="text"
                    value={carVariant}
                    onChange={e => setCarVariant(e.target.value)}
                    placeholder="e.g. GT Plus 1.5 TSI"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Color *
                  </label>
                  <input
                    type="text"
                    value={carColor}
                    onChange={e => setCarColor(e.target.value)}
                    placeholder="e.g. Candy White"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Current Modification Stage
                  </label>
                  <input
                    type="text"
                    value={carStage}
                    onChange={e => setCarStage(e.target.value)}
                    placeholder="e.g. Stage 2 Exterior & Stance"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              </div>

              {/* CRITICAL PRIVACY REQUIREMENT: REGISTRATION NUMBER MUST NEVER BE PUBLICLY DISPLAYED AUTOMATICALLY */}
              <div className="p-4 bg-[#151a15] border border-[#233825] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Registration Number (Optional)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/60">
                    Default: Private
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    value={carRegNumber}
                    onChange={e => setCarRegNumber(e.target.value)}
                    placeholder="e.g. MH 02 ER 9999"
                    className="w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-xl px-3.5 py-2 text-white font-mono uppercase"
                  />

                  {/* Public vs Private toggle */}
                  <div className="flex items-center gap-2 bg-[#121212] p-1 rounded-xl border border-[#262626]">
                    <button
                      type="button"
                      onClick={() => setIsRegNumberPublic(false)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                        !isRegNumberPublic 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>Keep private</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRegNumberPublic(true)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                        isRegNumberPublic 
                          ? 'bg-amber-600 text-white shadow-sm' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Show publicly</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-400 italic">
                  CARIX Privacy Promise: Your car registration number is never made public without your explicit consent.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setStep('ask_car')}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={handleAddCarAndFinish}
                  className="px-6 py-2.5 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md uppercase tracking-wider"
                >
                  <span>Launch Car Identity Profile</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 6: BUSINESS ONBOARDING DETAILS */}
          {step === 'business_details' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                  Business & Company Onboarding
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Register your automotive business
                </h3>
                <p className="text-xs text-neutral-400">
                  Post tools and parts with compatible cars and instructions, and connect directly with verified car enthusiasts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Stealth Auto Labs"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Company Handle (@) *
                  </label>
                  <input
                    type="text"
                    value={businessUsername}
                    onChange={e => setBusinessUsername(e.target.value)}
                    placeholder="e.g. stealth_mumbai"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Business Specialization *
                  </label>
                  <select
                    value={businessType}
                    onChange={e => setBusinessType(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Modification Shop & Detailing Studio</option>
                    <option>Performance Parts & ECU Tuner</option>
                    <option>Automotive Tools & Diagnostic Supplier</option>
                    <option>Aero Body Kits Manufacturer</option>
                    <option>Suspension & Wheel Fitment Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    City & State *
                  </label>
                  <input
                    type="text"
                    value={businessCity}
                    onChange={e => setBusinessCity(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Business Phone *
                  </label>
                  <input
                    type="text"
                    value={businessPhone}
                    onChange={e => setBusinessPhone(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={e => setBusinessEmail(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setStep('choose_type')}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep('business_docs')}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <span>Next: Verification Documents</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 7: BUSINESS VERIFICATION DOCS */}
          {step === 'business_docs' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                  Official Verification Application
                </span>
                <h3 className="text-xl font-bold text-white font-display">
                  Upload Business Credential
                </h3>
                <p className="text-xs text-neutral-400">
                  CARIX requires verified business documents to award the verified green checkmark and protect automotive consumers.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Government Document Type
                  </label>
                  <select
                    value={businessDocType}
                    onChange={e => setBusinessDocType(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>GST Registration Certificate</option>
                    <option>Certificate of Incorporation</option>
                    <option>Udyam / MSME Registration</option>
                    <option>Shop & Establishment Licence</option>
                    <option>Trade Licence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                    Document / GST Number
                  </label>
                  <input
                    type="text"
                    value={businessGstNumber}
                    onChange={e => setBusinessGstNumber(e.target.value)}
                    placeholder="e.g. 27AADCS1234F1Z8"
                    className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2.5 text-white font-mono uppercase"
                  />
                </div>

                <div className="p-5 border-2 border-dashed border-[#2f2f2f] rounded-2xl bg-[#151515] text-center space-y-2">
                  <Upload className="w-7 h-7 text-neutral-400 mx-auto" />
                  <p className="text-xs text-neutral-300 font-semibold">
                    Upload GSTIN Certificate or Registration PDF / Image
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    Supports PDF, PNG, JPG up to 15MB. Encrypted and stored safely for CARIX compliance review.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#202020]">
                <button
                  type="button"
                  onClick={() => setStep('business_details')}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>

                <button
                  type="button"
                  onClick={handleFinishBusiness}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md uppercase tracking-wider"
                >
                  <span>Submit & Enter Business Portal</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 8: COMPLETED */}
          {step === 'completed' && (
            <div className="space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">
                  Welcome to CARIX!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Your automotive profile is ready. You can now explore community builds, discover verified workshops, configure builds, and showcase modifications.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setCurrentTab('profile');
                  }}
                  className="px-8 py-3 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg"
                >
                  View My Automotive Profile →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
