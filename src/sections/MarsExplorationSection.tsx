import React, { useState } from 'react';
import { Planet3D } from '../components/Planet3D';
import { MARS_LOCATIONS, MarsLocation } from '../data/missionData';
import { MapPin, Mountain, Compass, X, ArrowUpRight, Search, Layers } from 'lucide-react';
import { spaceSound } from '../utils/audioSynth';

interface MarsExplorationSectionProps {
  onProceedToRover: () => void;
}

export const MarsExplorationSection: React.FC<MarsExplorationSectionProps> = ({ onProceedToRover }) => {
  const [selectedLocation, setSelectedLocation] = useState<MarsLocation>(MARS_LOCATIONS[0]);
  const [activeTab, setActiveTab] = useState<'topography' | 'science' | 'coordinates'>('topography');

  const handleSelect = (locId: string) => {
    const found = MARS_LOCATIONS.find((l) => l.id === locId);
    if (found) {
      setSelectedLocation(found);
      spaceSound.playTelemetryPing();
    }
  };

  return (
    <section id="exploration" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 05 · Surface Reconnaissance</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Planetary Geography & Sites
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Click any exploration landmark or drag the 3D Mars globe to inspect surface topography, elevation differentials, and resource caches.
          </p>
        </div>

        {/* 2-Column Layout: Left = 3D Mars Globe & Hotspots; Right = Location Analysis Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Interactive Mars Surface Viewport */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 p-6 overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-800/80">
              <span className="flex items-center gap-1.5 text-orange-400">
                <Mountain className="w-3.5 h-3.5" /> MARS MOLA ALTIMETRY RADAR
              </span>
              <span>Drag to Rotate · Click Markers</span>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-[380px] sm:h-[440px] flex items-center justify-center relative">
              <Planet3D
                type="mars"
                autoRotate={false}
                interactive={true}
                activeLocationId={selectedLocation.id}
                onSelectLocation={handleSelect}
                locations={MARS_LOCATIONS.map(l => ({ id: l.id, name: l.name, pos: l.pos }))}
              />

              {/* In-viewport Target Label */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-200">
                <div className="text-[10px] text-amber-400 uppercase">Target Acquisition</div>
                <div className="font-semibold text-slate-100">{selectedLocation.name}</div>
              </div>
            </div>

            {/* Horizontal Landmark Quick Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-800/80">
              {MARS_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc.id)}
                    className={`px-2.5 py-2 rounded text-left border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400 truncate">{loc.type}</div>
                    <div className="text-xs font-semibold truncate mt-0.5">{loc.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Location Telemetry Dossier */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {selectedLocation.designation}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 font-display mt-1">
                  {selectedLocation.name}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {selectedLocation.status}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/80 text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">Elevation Datum</div>
                <div className="text-base font-bold font-mono text-slate-100 mt-1 tabular-nums">{selectedLocation.elevation}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] font-mono uppercase text-slate-400">Scale / Diameter</div>
                <div className="text-base font-bold font-mono text-slate-100 mt-1 tabular-nums">{selectedLocation.diameter}</div>
              </div>
            </div>

            {/* Narrative description */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Topological Description</span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>

            {/* Scientific and settlement significance */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Scientific Significance
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedLocation.scientificValue}
              </p>
            </div>

            {/* Coordinates and status */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
              <span>COORDS: {selectedLocation.coordinates}</span>
              <span className="text-emerald-400">MAPPING VERIFIED</span>
            </div>

            <button
              onClick={onProceedToRover}
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors shadow-md"
            >
              <span>Deploy Rover Reconnaissance</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
