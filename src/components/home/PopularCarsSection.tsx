import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CAR_DATABASE } from '../../data/mockData';
import { Car, ChevronRight, Wrench, Sparkles } from 'lucide-react';

export const PopularCarsSection: React.FC = () => {
  const { setBuildVehicle, setCurrentTab, showToast } = useApp();

  const [selectedMakeIndex, setSelectedMakeIndex] = useState(0);
  const currentMakeData = INDIAN_CAR_DATABASE[selectedMakeIndex];

  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const currentModelData = currentMakeData.models[selectedModelIndex] || currentMakeData.models[0];

  const [selectedYear, setSelectedYear] = useState(currentModelData.years[0]);
  const [selectedVariant, setSelectedVariant] = useState(currentModelData.variants[0]);

  const handleMakeChange = (idx: number) => {
    setSelectedMakeIndex(idx);
    setSelectedModelIndex(0);
    const newMake = INDIAN_CAR_DATABASE[idx];
    const newModel = newMake.models[0];
    setSelectedYear(newModel.years[0]);
    setSelectedVariant(newModel.variants[0]);
  };

  const handleModelChange = (idx: number) => {
    setSelectedModelIndex(idx);
    const newModel = currentMakeData.models[idx];
    setSelectedYear(newModel.years[0]);
    setSelectedVariant(newModel.variants[0]);
  };

  const handleConfigureBuild = () => {
    setBuildVehicle(currentMakeData.make, currentModelData.name, selectedYear, selectedVariant);
    setCurrentTab('build');
    showToast(`Configuring ${selectedYear} ${currentMakeData.make} ${currentModelData.name} ${selectedVariant}`);
  };

  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2 inline-block">
            Vehicle Specification
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Popular Indian Vehicles
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Select your exact make, model, year, and trim to filter certified aftermarket fitments and see custom community builds.
          </p>
        </div>

        {/* Vehicle Selector Card */}
        <div className="bg-[#121212] border border-[#242424] rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* Step 1: Make Pills */}
          <div className="mb-6">
            <span className="text-xs font-medium text-neutral-400 mb-2 block uppercase tracking-wider">
              1. Choose Manufacturer
            </span>
            <div className="flex flex-wrap gap-2">
              {INDIAN_CAR_DATABASE.map((item, idx) => (
                <button
                  key={item.make}
                  onClick={() => handleMakeChange(idx)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedMakeIndex === idx
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-[#1a1a1a] text-neutral-300 hover:text-white border border-[#292929]'
                  }`}
                >
                  {item.make}
                </button>
              ))}
            </div>
          </div>

          {/* Grid for Model, Year, Variant */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            
            {/* Step 2: Model */}
            <div>
              <label className="text-xs font-medium text-neutral-400 mb-1.5 block uppercase tracking-wider">
                2. Model
              </label>
              <select
                value={selectedModelIndex}
                onChange={(e) => handleModelChange(Number(e.target.value))}
                className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
              >
                {currentMakeData.models.map((m, idx) => (
                  <option key={m.name} value={idx}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Year */}
            <div>
              <label className="text-xs font-medium text-neutral-400 mb-1.5 block uppercase tracking-wider">
                3. Model Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
              >
                {currentModelData.years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Variant */}
            <div>
              <label className="text-xs font-medium text-neutral-400 mb-1.5 block uppercase tracking-wider">
                4. Trim / Engine
              </label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E50914]"
              >
                {currentModelData.variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Car className="w-4 h-4 text-[#E50914]" />
              <span>
                Selected: <strong className="text-white">{selectedYear} {currentMakeData.make} {currentModelData.name}</strong> ({selectedVariant})
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleConfigureBuild}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Configure This Build</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
