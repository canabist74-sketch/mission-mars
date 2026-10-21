import React, { useState } from 'react';
import { COLONY_STRUCTURES, ColonyStructure } from '../data/missionData';
import { Home, Sprout, FlaskConical, Zap, Truck, Rocket, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import colonyImg from '../assets/images/mars_colony_settlement_1792569263279.jpg';
import { spaceSound } from '../utils/audioSynth';

interface MarsColonySectionProps {
  onProceedToSurvival: () => void;
}

export const MarsColonySection: React.FC<MarsColonySectionProps> = ({ onProceedToSurvival }) => {
  const [selectedStructure, setSelectedStructure] = useState<ColonyStructure>(COLONY_STRUCTURES[0]);

  const getStructureIcon = (id: string) => {
    switch (id) {
      case 'habitat-alpha': return <Home className="w-4 h-4 text-amber-400" />;
      case 'biogreenhouse': return <Sprout className="w-4 h-4 text-emerald-400" />;
      case 'research-lab': return <FlaskConical className="w-4 h-4 text-cyan-400" />;
      case 'energy-grid': return <Zap className="w-4 h-4 text-orange-400" />;
      case 'rover-hangar': return <Truck className="w-4 h-4 text-purple-400" />;
      case 'isru-launchpad': return <Rocket className="w-4 h-4 text-rose-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleSelectStructure = (structure: ColonyStructure) => {
    setSelectedStructure(structure);
    spaceSound.playTelemetryPing();
  };

  return (
    <section id="colony" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 06 · Permanent Habitation</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Ares Base Alpha
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 max-w-sm text-right">
            <span className="text-emerald-400 font-semibold">THE FIRST HUMAN SETTLEMENT</span>
            <div>Autonomous Life Support Grid · Sol 001</div>
          </div>
        </div>

        {/* Hero Visual: Panoramic Mars Colony Settlement */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8">
          <div className="aspect-[16/9] max-h-[500px] w-full relative">
            <img
              src={colonyImg}
              alt="Panoramic view of Ares Base Alpha Mars human settlement with biodomes, regolith berms, and rovers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-black/30" />

            {/* Interactive Structural Hotspots pinned directly on the Colony Panorama */}
            <div className="absolute inset-0 pointer-events-none p-4 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="p-2 rounded bg-black/70 backdrop-blur-md border border-white/10 text-amber-400">
                  SECTOR: ARCADIA LOWLAND BASIN
                </span>
                <span className="hidden sm:inline-block p-2 rounded bg-black/70 backdrop-blur-md border border-white/10 text-slate-300">
                  CREW COMPLEMENT: 32 PIONEERS
                </span>
              </div>

              {/* Bottom Structure Selector Buttons right over the panorama */}
              <div className="pointer-events-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {COLONY_STRUCTURES.map((st) => {
                  const isSelected = st.id === selectedStructure.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelectStructure(st)}
                      className={`p-2.5 rounded-lg text-left backdrop-blur-md border transition-all ${
                        isSelected
                          ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-lg'
                          : 'bg-black/70 border-white/15 text-slate-300 hover:bg-black/90 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        {getStructureIcon(st.id)}
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
                          {st.category}
                        </span>
                      </div>
                      <div className="text-xs font-semibold truncate text-slate-100">{st.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Structure Deep Inspection Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                {getStructureIcon(selectedStructure.id)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  {selectedStructure.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 font-display">
                  {selectedStructure.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase text-[10px] block">Capacity</span>
                <span className="text-slate-100 font-semibold">{selectedStructure.crewCapacity}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-400 uppercase text-[10px] block">Power Load</span>
                <span className="text-amber-400 font-semibold">{selectedStructure.powerDraw}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">Architectural Design</span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedStructure.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block">Mission Mandate:</span>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{selectedStructure.keyFunction}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Engineering Specifications</span>
              <div className="space-y-2">
                {selectedStructure.specifications.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">
              SHIELDING INTEGRITY: {selectedStructure.shielding}
            </span>
            <button
              onClick={onProceedToSurvival}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors"
            >
              <span>Explore Survival Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
