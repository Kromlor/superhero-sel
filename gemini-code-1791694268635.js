import React, { useState } from 'react';

// ============================================================================
// DATA & CONSTANTS (Middle School SA-2 Strengths & Visual Options)
// ============================================================================
const SEL_STRENGTHS = [
  { id: 'resilience', name: 'Resilience / Grit', desc: 'Bouncing back after failure or tough challenges.' },
  { id: 'empathy', name: 'Empathy & Listening', desc: 'Understanding and supporting how others feel.' },
  { id: 'integrity', name: 'Integrity / Courage', desc: 'Doing the right thing even when no one is watching.' },
  { id: 'curiosity', name: 'Curiosity / Problem Solving', desc: 'Loving to learn, ask questions, and solve puzzles.' },
  { id: 'teamwork', name: 'Teamwork & Collaboration', desc: 'Working smoothly with others to achieve a goal.' },
  { id: 'calmness', name: 'Self-Regulation / Calm', desc: 'Staying cool and focused under pressure.' },
  { id: 'leadership', name: 'Positive Leadership', desc: 'Inspiring and guiding peers in a good direction.' },
  { id: 'kindness', name: 'Inclusion & Kindness', desc: 'Making sure everyone feels welcomed and valued.' }
];

const ARCHETYPES = [
  { id: 'The Protector', title: 'The Protector', desc: 'Defends others and stands up for fairness.' },
  { id: 'The Strategist', title: 'The Strategist', desc: 'Mastermind problem-solver who plans ahead.' },
  { id: 'The Catalyst', title: 'The Catalyst', desc: 'Brings positive energy and sparks team action.' },
  { id: 'The Trailblazer', title: 'The Trailblazer', desc: 'Pioneers new ideas and stays true to self.' }
];

const AVATAR_OPTIONS = {
  outfits: [
    { id: 'streetwear', label: 'Tech Hoodie' },
    { id: 'armored', label: 'Cyber Armor' },
    { id: 'tactical', label: 'Hero Vest' },
    { id: 'casual', label: 'Graphic Tee' }
  ],
  emblems: ['⚡', '🛡️', '💎', '🔥', '👁️', '🌟', '📚', '🧩'],
  colors: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899']
};

// ============================================================================
// MAIN CONTAINER APP
// ============================================================================
export default function App() {
  const [step, setStep] = useState(1);
  const [heroData, setHeroData] = useState({
    heroAlias: '',
    archetype: ARCHETYPES[0].id,
    selectedStrengths: [],
    avatarConfig: {
      outfit: 'streetwear',
      emblem: '⚡',
      primaryColor: '#3B82F6'
    },
    powers: [
      { strength: '', powerName: '', reflection: '' },
      { strength: '', powerName: '', reflection: '' },
      { strength: '', powerName: '', reflection: '' }
    ]
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Top Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🦸‍♂️</span>
            <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent uppercase tracking-wider">
              Hero Within <span className="text-xs text-slate-400 font-normal">| SEL 11 (SA-2)</span>
            </h1>
          </div>
          {/* Stepper Dots */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  step === i
                    ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400'
                    : step > i
                    ? 'bg-slate-700 text-emerald-400'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > i ? '✓' : i}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        {step === 1 && (
          <Step1StrengthsSelect
            heroData={heroData}
            setHeroData={setHeroData}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step2AvatarStudio
            heroData={heroData}
            setHeroData={setHeroData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Dossier
            heroData={heroData}
            setHeroData={setHeroData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <Step4HeroCardPreview
            heroData={heroData}
            onBack={prevStep}
          />
        )}
      </main>
    </div>
  );
}

// ============================================================================
// STEP 1: SELECT ARCHETYPE & TOP 3 STRENGTHS
// ============================================================================
function Step1StrengthsSelect({ heroData, setHeroData, onNext }) {
  const toggleStrength = (strengthName) => {
    let current = [...heroData.selectedStrengths];
    if (current.includes(strengthName)) {
      current = current.filter((s) => s !== strengthName);
    } else {
      if (current.length >= 3) return; // Cap at 3
      current.push(strengthName);
    }

    // Pre-fill power slots with selected strengths
    const updatedPowers = current.map((str, idx) => ({
      strength: str,
      powerName: heroData.powers[idx]?.powerName || '',
      reflection: heroData.powers[idx]?.reflection || ''
    }));

    setHeroData({
      ...heroData,
      selectedStrengths: current,
      powers: updatedPowers
    });
  };

  const isValid = heroData.heroAlias.trim() && heroData.selectedStrengths.length === 3;

  return (
    <div className="space-y-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
      <div>
        <h2 className="text-2xl font-black text-white">1. Hero Identity & Core Strengths</h2>
        <p className="text-sm text-slate-400 mt-1">
          Give your hero an alias and choose exactly 3 real-world SEL strengths to build your power set.
        </p>
      </div>

      {/* Superhero Alias Input */}
      <div className="space-y-2">
        <label className="block text-xs uppercase font-bold text-slate-300">Superhero Alias Name</label>
        <input
          type="text"
          placeholder="e.g., The Mind Fortress, Apex Listener, Shadow Shield"
          value={heroData.heroAlias}
          onChange={(e) => setHeroData({ ...heroData, heroAlias: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 font-semibold"
        />
      </div>

      {/* Archetype Selector */}
      <div className="space-y-2">
        <label className="block text-xs uppercase font-bold text-slate-300">Select Archetype</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ARCHETYPES.map((arch) => (
            <div
              key={arch.id}
              onClick={() => setHeroData({ ...heroData, archetype: arch.id })}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                heroData.archetype === arch.id
                  ? 'bg-blue-900/40 border-blue-500 ring-1 ring-blue-400'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-sm text-white">{arch.title}</div>
              <div className="text-xs text-slate-400">{arch.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths Bank (Choose 3) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs uppercase font-bold text-slate-300">
            Select Your Top 3 Strengths ({heroData.selectedStrengths.length}/3)
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEL_STRENGTHS.map((str) => {
            const selected = heroData.selectedStrengths.includes(str.name);
            return (
              <div
                key={str.id}
                onClick={() => toggleStrength(str.name)}
                className={`p-3.5 rounded-lg border cursor-pointer flex items-start space-x-3 transition-all ${
                  selected
                    ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-400'
                    : heroData.selectedStrengths.length >= 3
                    ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center text-xs font-bold ${
                  selected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600'
                }`}>
                  {selected ? '✓' : ''}
                </div>
                <div>
                  <div className="font-bold text-sm">{str.name}</div>
                  <div className="text-xs text-slate-400">{str.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        disabled={!isValid}
        onClick={onNext}
        className={`w-full py-3.5 font-bold rounded-lg transition-all ${
          isValid
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg cursor-pointer'
            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
        }`}
      >
        Proceed to Visual Avatar Studio →
      </button>
    </div>
  );
}

// ============================================================================
// STEP 2: VISUAL AVATAR CUSTOMIZER
// ============================================================================
function Step2AvatarStudio({ heroData, setHeroData, onNext, onBack }) {
  const config = heroData.avatarConfig;

  const updateConfig = (key, val) => {
    setHeroData({
      ...heroData,
      avatarConfig: { ...config, [key]: val }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
      {/* Real-time Webtoon Avatar Display */}
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
        {/* Glow Background */}
        <div
          className="absolute w-48 h-48 rounded-full filter blur-3xl opacity-30"
          style={{ backgroundColor: config.primaryColor }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Layered Avatar Graphics */}
          <div className="w-40 h-40 relative flex items-center justify-center">
            {/* Base Shield / Crest Frame */}
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-slate-800"
              style={{ backgroundColor: config.primaryColor }}
            >
              {/* Emblem Symbol */}
              <span className="text-6xl drop-shadow-md">{config.emblem}</span>
            </div>
          </div>

          <span className="mt-4 text-xs font-mono tracking-widest text-blue-400 uppercase font-bold">
            {heroData.heroAlias || 'Unnamed Hero'}
          </span>
          <span className="text-xs text-slate-400 font-semibold">{heroData.archetype}</span>
        </div>
      </div>

      {/* Controls Column */}
      <div className="space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white">2. Visual Avatar Studio</h2>

          {/* Outfit Select */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400">Gear / Outfit Style</label>
            <div className="grid grid-cols-2 gap-2">
              {AVATAR_OPTIONS.outfits.map((o) => (
                <button
                  key={o.id}
                  onClick={() => updateConfig('outfit', o.id)}
                  className={`p-2 text-xs rounded-lg font-bold border ${
                    config.outfit === o.id
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Emblem Select */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400">Hero Crest Symbol</label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.emblems.map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => updateConfig('emblem', symbol)}
                  className={`w-10 h-10 text-xl rounded-lg border flex items-center justify-center ${
                    config.emblem === symbol
                      ? 'bg-blue-600 border-blue-400 scale-105'
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Color Select */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-400">Aura / Power Energy Color</label>
            <div className="flex space-x-2">
              {AVATAR_OPTIONS.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => updateConfig('primaryColor', c)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    config.primaryColor === c ? 'border-white scale-110' : 'border-transparent opacity-80'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onBack}
            className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-sm"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="w-2/3 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm shadow-lg"
          >
            Power Dossier →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 3: POWER ORIGIN DOSSIER (SA-2 WRITING & REFLECTION)
// ============================================================================
function Step3Dossier({ heroData, setHeroData, onNext, onBack }) {
  const updatePower = (index, field, val) => {
    const updated = [...heroData.powers];
    updated[index][field] = val;
    setHeroData({ ...heroData, powers: updated });
  };

  const isComplete = heroData.powers.every(
    (p) => p.powerName.trim().length > 0 && p.reflection.trim().length >= 15
  );

  return (
    <div className="space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
      <div>
        <h2 className="text-2xl font-black text-white">3. Power Origin Dossier</h2>
        <p className="text-sm text-slate-400 mt-1">
          Standard SA-2: Transform your 3 real strengths into superhero abilities and describe a real situation where you used them.
        </p>
      </div>

      <div className="space-y-5">
        {heroData.powers.map((p, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-mono uppercase font-bold text-emerald-400">
              Power #{idx + 1} Strength: {p.strength}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Superhero Power Name</label>
                <input
                  type="text"
                  placeholder="e.g., Kinetic Shield, Truth Aura"
                  value={p.powerName}
                  onChange={(e) => updatePower(idx, 'powerName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Real Life Application (SA-2 Reflection)
                </label>
                <textarea
                  rows="2"
                  placeholder="When did you use this strength at school or with friends?"
                  value={p.reflection}
                  onChange={(e) => updatePower(idx, 'reflection', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          onClick={onBack}
          className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-sm"
        >
          ← Back
        </button>
        <button
          disabled={!isComplete}
          onClick={onNext}
          className={`w-2/3 py-3 font-bold rounded-lg text-sm transition-all ${
            isComplete
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-lg'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          Generate Hero Card →
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 4: FINAL TRADING CARD & PRINT / GALLERY VIEW
// ============================================================================
function Step4HeroCardPreview({ heroData, onBack }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Hero Card Complete!</h2>
          <p className="text-sm text-slate-400">Ready for class gallery walk display.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow"
        >
          🖨️ Print Card
        </button>
      </div>

      {/* Printable / Display Hero Card Container */}
      <div className="max-w-md mx-auto bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 shadow-2xl space-y-5 print:text-black print:bg-white print:border-black">
        {/* Card Header Visual */}
        <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg border border-slate-700"
            style={{ backgroundColor: heroData.avatarConfig.primaryColor }}
          >
            {heroData.avatarConfig.emblem}
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-wide">{heroData.heroAlias}</h3>
            <span className="text-xs font-mono text-blue-400 font-semibold">{heroData.archetype}</span>
          </div>
        </div>

        {/* Powers List */}
        <div className="space-y-3">
          {heroData.powers.map((p, idx) => (
            <div key={idx} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>{p.powerName}</span>
                <span className="text-slate-500">[{p.strength}]</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 italic">"{p.reflection}"</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2 border-t border-slate-800">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            SA-2 Self-Awareness Strengths Card
          </span>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white underline"
        >
          ← Back to edit powers
        </button>
      </div>
    </div>
  );
}