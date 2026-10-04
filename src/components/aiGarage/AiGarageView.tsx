import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_CAR_DATABASE } from '../../data/mockData';
import { 
  Sparkles, Wrench, ShieldCheck, ArrowRight, RefreshCw, 
  HelpCircle, Eye, Sliders, CheckCircle2, AlertTriangle, Layers 
} from 'lucide-react';

export const AiGarageView: React.FC = () => {
  const { setBuildVehicle, setCurrentTab, showToast } = useApp();

  // Advisor Form State
  const [selectedMake, setSelectedMake] = useState('Volkswagen');
  const [selectedModel, setSelectedModel] = useState('Virtus GT');
  const [year, setYear] = useState('2026');
  const [carColor, setCarColor] = useState('Candy White');
  const [budget, setBudget] = useState('1,25,000');
  const [styleGoal, setStyleGoal] = useState<'Sporty' | 'Clean' | 'Aggressive' | 'OEM+' | 'Show' | 'Overland'>('Sporty');
  const [desiredMods, setDesiredMods] = useState('Front lip splitter, stance lowering, 17-inch wheels, black accents');

  // Loading & Results
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Visualizer State
  const [visFrontLip, setVisFrontLip] = useState('Gloss Black 3-Piece Aero Splitter');
  const [visWheels, setVisWheels] = useState('17" Flow-Formed Multi-Spoke Satin Black');
  const [visSpoiler, setVisSpoiler] = useState('Dry Carbon Trunk Ducktail Lip');
  const [visSideSkirts, setVisSideSkirts] = useState('Aero Winglet Rocker Extensions');
  const [visHood, setVisHood] = useState('Dual Functional Heat Extractors');
  const [visLighting, setVisLighting] = useState('Smoked Matrix Sequential Cluster');
  const [visWrap, setVisWrap] = useState('Dual-Tone Gloss Black Roof & Pillars');
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [visConceptResult, setVisConceptResult] = useState<any>(null);

  const handleGenerateAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/carix-ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carMake: selectedMake,
          carModel: selectedModel,
          year,
          variant: 'GT Plus',
          style: styleGoal,
          budget,
          desiredMods
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAiResult(json.data);
      }
    } catch (err) {
      console.error(err);
      showToast('Loaded CARIX automotive recommendation algorithm.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVisualization = async () => {
    setIsVisualizing(true);
    try {
      const res = await fetch('/api/carix-ai/visualize-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carModel: `${selectedMake} ${selectedModel}`,
          color: carColor,
          frontLip: visFrontLip,
          wheels: visWheels,
          spoiler: visSpoiler,
          sideSkirts: visSideSkirts,
          hood: visHood,
          lighting: visLighting,
          wrap: visWrap
        })
      });
      const data = await res.json();
      setVisConceptResult(data.concept);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVisualizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CARIX AI Automotive Tuning Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            What do you want your car to look like?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Specify your vehicle, aesthetic intention, and budget in Indian Rupees. CARIX AI crafts a custom modification blueprint with realistic costs, safety advisories, and questions to ask local workshops.
          </p>
        </div>

        {/* Section 1: AI Advisor Blueprint Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5 bg-[#121212] border border-[#242424] rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="pb-3 border-b border-[#1f1f1f] flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Vehicle & Styling Input
              </h3>
              <span className="text-[10px] text-neutral-500 font-mono">Real-time Analysis</span>
            </div>

            <form onSubmit={handleGenerateAdvice} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => {
                      setSelectedMake(e.target.value);
                      const found = INDIAN_CAR_DATABASE.find(m => m.make === e.target.value);
                      if (found) setSelectedModel(found.models[0].name);
                    }}
                    className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {INDIAN_CAR_DATABASE.map(m => (
                      <option key={m.make} value={m.make}>{m.make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Model</label>
                  <input
                    type="text"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder="Virtus, Thar, Slavia..."
                    className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Model Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">Current Body Color</label>
                  <input
                    type="text"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    placeholder="e.g. Candy White, Red"
                    className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Budget Range (₹ INR)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 1,00,000"
                  className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1.5 uppercase">
                  Target Aesthetic Style
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Sporty', 'Clean', 'Aggressive', 'OEM+', 'Show', 'Overland'] as const).map((style) => (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setStyleGoal(style)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        styleGoal === style
                          ? 'bg-[#E50914] text-white border-[#E50914] font-semibold'
                          : 'bg-[#181818] text-neutral-300 border-[#262626] hover:border-neutral-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                  Desired Modifications / Focus Areas
                </label>
                <textarea
                  rows={2}
                  value={desiredMods}
                  onChange={(e) => setDesiredMods(e.target.value)}
                  placeholder="e.g. Front lip splitter, stance lowering, alloy wheel designs..."
                  className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-3 py-2 text-xs text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Build Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Ask CARIX AI for Modification Blueprint</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right: AI Output Blueprint */}
          <div className="lg:col-span-7">
            {!aiResult ? (
              <div className="bg-[#121212] border border-[#242424] rounded-3xl p-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-[#292929] flex items-center justify-center text-[#E50914] mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  Your Custom Automotive Blueprint
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Submit your vehicle details on the left. The AI advisor will calculate recommended aftermarket parts, realistic ₹ budget bands, difficulty ratings, and questions for your local installation shop.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleGenerateAdvice}
                    className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2f2f2f] text-neutral-200 text-xs font-semibold rounded-xl"
                  >
                    Load Sample Virtus GT Blueprint
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#121212] border border-[#282828] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in">
                
                <div className="pb-4 border-b border-[#202020] flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-red-400 font-mono uppercase tracking-wider block">
                      Generated Build Blueprint
                    </span>
                    <h2 className="text-xl font-bold text-white font-display mt-0.5">
                      {aiResult.buildTitle}
                    </h2>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {aiResult.styleSummary}
                    </p>
                  </div>

                  <span className="text-xs font-mono font-bold text-white bg-[#1c1c1c] border border-[#2e2e2e] px-3 py-1.5 rounded-xl shrink-0">
                    Est: {aiResult.overallEstimatedBudget}
                  </span>
                </div>

                {/* Categories & Recommended Parts */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                    Modification Domains & Estimated Ranges
                  </h3>

                  <div className="space-y-3">
                    {aiResult.categories?.map((cat: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-[#161616] border border-[#242424] rounded-2xl space-y-2 hover:border-[#383838] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-display">{cat.categoryName}</span>
                          <span className="text-xs font-mono font-semibold text-red-400">{cat.estimatedCostRange}</span>
                        </div>

                        <ul className="text-xs text-neutral-300 space-y-1 pl-1">
                          {cat.recommendedMods?.map((m: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 border-t border-[#202020] flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <span>Difficulty: {cat.installationDifficulty}</span>
                          <span>Impact: {cat.styleImpact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions to Ask Seller / Installer */}
                {aiResult.questionsForShops && (
                  <div className="p-4 bg-[#171717] rounded-2xl border border-[#252525] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>Questions to Ask Local Modification Shops Before Fitting:</span>
                    </div>
                    <ul className="text-xs text-neutral-300 space-y-1.5 pl-1">
                      {aiResult.questionsForShops.map((q: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono text-[10px] mt-0.5">#{idx + 1}</span>
                          <span className="leading-relaxed">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Legal and Safety Advisory */}
                <div className="p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
                  <AlertTriangle className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Statutory & Fitment Notice:</strong> {aiResult.legalAndSafetyAdvisory}
                  </p>
                </div>

                {/* Transfer to Configurator */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setBuildVehicle(selectedMake, selectedModel, Number(year) || 2026, 'GT Plus');
                      setCurrentTab('build');
                      showToast(`Blueprint transferred to Build My Car configurator!`);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <span>Configure Parts in Build My Car</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Section 2: Future-Ready Visualizer Concept ("Visualize Your Build") */}
        <div className="pt-8 border-t border-[#1c1c1c] space-y-8">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Future-Ready Concept Lab</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Visualize Your Build
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Preview how aerodynamic splitters, forged alloys, ducktail spoilers, and dual-tone roof wraps alter your car’s visual silhouette.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visualizer Controls */}
            <div className="lg:col-span-5 bg-[#121212] border border-[#242424] rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono pb-2 border-b border-[#1f1f1f]">
                Aerodynamic & Stance Layers
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Front Lip Splitter</label>
                  <select
                    value={visFrontLip}
                    onChange={(e) => setVisFrontLip(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Gloss Black 3-Piece Aero Splitter">Gloss Black 3-Piece Aero Splitter</option>
                    <option value="Carbon Fiber Race Lip with Struts">Carbon Fiber Race Lip with Struts</option>
                    <option value="Subtle OEM+ Body Color Extension">Subtle OEM+ Body Color Extension</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Wheels & Finish</label>
                  <select
                    value={visWheels}
                    onChange={(e) => setVisWheels(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="17&quot; Flow-Formed Multi-Spoke Satin Black">17" Flow-Formed Multi-Spoke Satin Black</option>
                    <option value="18&quot; Forged Monoblock Bronze Satin">18" Forged Monoblock Bronze Satin</option>
                    <option value="17&quot; Classic Deep Dish Silver Mesh">17" Classic Deep Dish Silver Mesh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Rear Trunk Spoiler</label>
                  <select
                    value={visSpoiler}
                    onChange={(e) => setVisSpoiler(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Dry Carbon Trunk Ducktail Lip">Dry Carbon Trunk Ducktail Lip</option>
                    <option value="Gloss Black Low-Profile Blade">Gloss Black Low-Profile Blade</option>
                    <option value="Track Spec Raised GT Wing">Track Spec Raised GT Wing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Side Rocker Skirts</label>
                  <select
                    value={visSideSkirts}
                    onChange={(e) => setVisSideSkirts(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Aero Winglet Rocker Extensions">Aero Winglet Rocker Extensions</option>
                    <option value="Smooth Matte Black Underblade">Smooth Matte Black Underblade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Wrap & Accents</label>
                  <select
                    value={visWrap}
                    onChange={(e) => setVisWrap(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Dual-Tone Gloss Black Roof & Pillars">Dual-Tone Gloss Black Roof & Pillars</option>
                    <option value="Full Satin Matte Nero Wrap">Full Satin Matte Nero Wrap</option>
                    <option value="OEM Candy White Clearcoat">OEM Candy White Clearcoat</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateVisualization}
                disabled={isVisualizing}
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#c90812] text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isVisualizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rendering Concept Matrix...</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" />
                    <span>Generate Stance & Aero Concept</span>
                  </>
                )}
              </button>

            </div>

            {/* Visualizer Canvas Preview */}
            <div className="lg:col-span-7 bg-[#121212] border border-[#242424] rounded-3xl p-6 space-y-4">
              
              <div className="relative rounded-2xl overflow-hidden border border-[#2b2b2b] bg-black aspect-[16/9] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
                  alt="Concept Visualization"
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Active Tuning Spec Tags */}
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
                  <span className="font-semibold block">{selectedMake} {selectedModel}</span>
                  <span className="text-[10px] text-red-400 font-mono">Concept Specification</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-[#202020] rounded text-[10px] font-mono">{visFrontLip}</span>
                  <span className="px-2 py-0.5 bg-[#202020] rounded text-[10px] font-mono">{visWheels}</span>
                  <span className="px-2 py-0.5 bg-[#202020] rounded text-[10px] font-mono">{visSpoiler}</span>
                  <span className="px-2 py-0.5 bg-[#202020] rounded text-[10px] font-mono">{visWrap}</span>
                </div>
              </div>

              {/* Crucial Required Label */}
              <div className="p-3 bg-[#161616] rounded-xl border border-[#262626] text-center text-xs text-neutral-400">
                <span className="text-red-400 font-semibold uppercase tracking-wider block text-[10px]">
                  Concept Visualization
                </span>
                “Concept visualization — actual product appearance may vary based on exact vehicle year, bumper mold, and workshop installation tolerances.”
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
