import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Car, Plus, ShieldCheck, Lock, Eye, Sparkles, Check, Upload } from 'lucide-react';
import { UserCar } from '../../types';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, userCars, setUserCars, showToast, setActiveCarProfile } = useApp();

  const [carName, setCarName] = useState('');
  const [carUsername, setCarUsername] = useState('');
  const [make, setMake] = useState('Volkswagen');
  const [model, setModel] = useState('Virtus');
  const [year, setYear] = useState(2026);
  const [variant, setVariant] = useState('GT Plus 1.5 TSI');
  const [color, setColor] = useState('Obsidian Black');
  const [fuelType, setFuelType] = useState<'Petrol' | 'Diesel' | 'Hybrid' | 'EV' | 'CNG'>('Petrol');
  const [transmission, setTransmission] = useState<'Manual' | 'Automatic (DSG/DCT)' | 'Torque Converter' | 'CVT'>('Automatic (DSG/DCT)');
  const [stage, setStage] = useState('Stage 1 Aero & Cosmetic');
  const [regNumber, setRegNumber] = useState('');
  const [isRegPublic, setIsRegPublic] = useState(false); // Default: Private!
  const [buildStory, setBuildStory] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carName.trim() || !make.trim() || !model.trim()) {
      showToast('Please enter car nickname, make, and model');
      return;
    }

    const generatedUsername = carUsername.trim() 
      ? carUsername.trim().toLowerCase().replace(/[@\s]+/g, '_')
      : `${carName.toLowerCase().replace(/\s+/g, '_')}_${model.toLowerCase().replace(/\s+/g, '')}`;

    const newCar: UserCar = {
      id: `car-${Date.now()}`,
      userId: currentUser.id,
      ownerUsername: currentUser.username,
      carName: carName.trim(),
      carUsername: generatedUsername,
      make,
      model,
      variant,
      year: Number(year),
      color,
      fuelType,
      transmission,
      stage,
      image: photoUrl,
      coverImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1400&q=80',
      buildStory: buildStory.trim() || `Daily-driven ${year} ${make} ${model} modified for high aesthetics and spirited driving.`,
      likesCount: 1,
      followersCount: 1,
      postsCount: 0,
      buildProgress: {
        exterior: 50,
        wheels: 100,
        lighting: 30,
        performance: 20,
        interior: 10
      },
      registrationNumber: regNumber,
      isRegNumberPublic: isRegPublic,
      purchaseYear: year,
      mileage: '5,000 km',
      instagramHandle: `@${generatedUsername}`,
      isFollowed: true,
      modifications: [
        { id: `m-${Date.now()}-1`, name: 'OEM+ Sport Accessories', category: 'Accessories' }
      ]
    };

    setUserCars(prev => [newCar, ...prev]);
    showToast(`Added ${newCar.carName} (@${newCar.carUsername}) to your CARIX Garage!`);
    setActiveCarProfile(newCar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#121212] border border-[#2b2b2b] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202020] bg-[#161616] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#E50914]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Add Vehicle to Your Garage
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Car Nickname *
              </label>
              <input
                type="text"
                value={carName}
                onChange={e => setCarName(e.target.value)}
                placeholder="e.g. MIDNIGHT or THUNDER"
                required
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white font-bold focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Dedicated Car Handle (@)
              </label>
              <input
                type="text"
                value={carUsername}
                onChange={e => setCarUsername(e.target.value)}
                placeholder="e.g. midnight_virtus"
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Make *
              </label>
              <input
                type="text"
                value={make}
                onChange={e => setMake(e.target.value)}
                placeholder="e.g. Volkswagen"
                required
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Model *
              </label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="e.g. Virtus GT"
                required
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Year of Manufacture
              </label>
              <input
                type="number"
                value={year}
                onChange={e => setYear(Number(e.target.value))}
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Variant
              </label>
              <input
                type="text"
                value={variant}
                onChange={e => setVariant(e.target.value)}
                placeholder="e.g. GT Plus 1.5 TSI"
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Color
              </label>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                placeholder="e.g. Obsidian Black"
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>

            <div>
              <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
                Stage / Build Level
              </label>
              <input
                type="text"
                value={stage}
                onChange={e => setStage(e.target.value)}
                placeholder="e.g. Stage 2 Stance & Aero"
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          {/* Privacy Protected Registration Number */}
          <div className="p-3.5 bg-[#151a15] border border-[#233825] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Registration Number (Optional)
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">
                {isRegPublic ? 'Will be shown publicly' : 'Protected (Private)'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={regNumber}
                onChange={e => setRegNumber(e.target.value)}
                placeholder="e.g. DL 01 AB 1234"
                className="w-full bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg px-3 py-1.5 text-white font-mono uppercase text-xs"
              />

              <div className="flex items-center gap-1.5 bg-[#121212] p-1 rounded-lg border border-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsRegPublic(false)}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition-all ${
                    !isRegPublic ? 'bg-emerald-600 text-white' : 'text-neutral-400'
                  }`}
                >
                  Keep private
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegPublic(true)}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold transition-all ${
                    isRegPublic ? 'bg-amber-600 text-white' : 'text-neutral-400'
                  }`}
                >
                  Show publicly
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 uppercase font-mono text-[10px] mb-1 font-semibold">
              Build Narrative / Story
            </label>
            <textarea
              rows={2}
              value={buildStory}
              onChange={e => setBuildStory(e.target.value)}
              placeholder="Tell other enthusiasts about your vision, inspiration, or future modification plans..."
              className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl p-3 text-white focus:outline-none focus:border-[#E50914] text-xs resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Car Identity Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
