import React, { useState } from 'react';
import { Flame, HeartPulse, Radio, Compass, ArrowRight, Shield, Zap, RefreshCw } from 'lucide-react';
import { SPACECRAFT_SUBSYSTEMS, SpacecraftSubsystem } from '../data/missionData';

interface DeepSpaceSectionProps {
  onApproachMars: () => void;
}

export const DeepSpaceSection: React.FC<DeepSpaceSectionProps> = ({ onApproachMars }) => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<SpacecraftSubsystem>(SPACECRAFT_SUBSYSTEMS[0]);
  const [missionDay, setMissionDay] = useState<number>(104);

  // Dynamic calculations based on mission transit day (1 to 190)
  const totalDays = 190;
  const transitProgress = (missionDay / totalDays) * 100;
  const totalDistanceKm = 54600000;
  const remainingDistanceKm = Math.round(totalDistanceKm * (1 - missionDay / totalDays));
  const lightDelayMinutes = ((remainingDistanceKm / 300000) / 60).toFixed(1);
  const currentSpeedKmH = Math.round(27800 + Math.sin((missionDay / totalDays) * Math.PI) * 4200);

  const getSubsystemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4 text-rose-400" />;
      case 'Radio': return <Radio className="w-4 h-4 text-cyan-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-emerald-400" />;
      default: return <Zap className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="space" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 03 · Interplanetary Transit</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Deep Space Odyssey
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 max-w-sm text-right">
            <span className="text-amber-500 font-semibold">[SIMULATION MODEL]</span>
            <div>Hohmann Elliptic Transfer Orbit</div>
            <div className="text-slate-400">Earth-Mars Cycler Trajectory</div>
          </div>
        </div>

        {/* Orbit Progress & Interactive Hohmann Transfer Slider */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/80 via-slate-950 to-slate-900/80 border border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <span className="text-slate-300 uppercase tracking-wider font-semibold">
              Mission Transit Scrubber · Sol Day {missionDay} of {totalDays}
            </span>
            <span className="text-amber-400">
              {transitProgress.toFixed(1)}% Orbit Trajectory Traversed
            </span>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={1}
            max={totalDays}
            value={missionDay}
            onChange={(e) => setMissionDay(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
            aria-label="Mission transit day slider"
          />

          {/* Interactive Waypoints */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>Earth Departure (Day 0)</span>
            <span>Mid-Course Correction (Day 95)</span>
            <span>Mars Orbital Insertion (Day 190)</span>
          </div>
        </div>

        {/* Telemetry Strip - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-[11px] font-mono uppercase text-slate-400">Distance to Mars</div>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
              {remainingDistanceKm.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">KILOMETERS REMAINING</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-[11px] font-mono uppercase text-slate-400">Current Velocity</div>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-1 tabular-nums">
              {currentSpeedKmH.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">KM/H RELATIVE TO SUN</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-[11px] font-mono uppercase text-slate-400">Radio Light Delay</div>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
              +{lightDelayMinutes}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">MINUTES (ONE-WAY)</div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-[11px] font-mono uppercase text-slate-400">Mission Status</div>
            <div className="text-2xl font-bold text-emerald-400 font-display mt-1">
              En Route
            </div>
            <div className="text-[11px] text-slate-400 font-mono">ALL SYSTEMS NOMINAL</div>
          </div>
        </div>

        {/* Interactive Spacecraft Systems Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Subsystem Selection Menu (Left) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 mb-2">
              Spacecraft Subsystems
            </div>
            {SPACECRAFT_SUBSYSTEMS.map((sub) => {
              const isSelected = sub.id === selectedSubsystem.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubsystem(sub)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {getSubsystemIcon(sub.icon)}
                      <span className={`text-sm font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                        {sub.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-1">{sub.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Subsystem Inspection Detail Display (Right) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">System Telemetry Profile</div>
                <h3 className="text-2xl font-bold text-slate-100 font-display mt-0.5">
                  {selectedSubsystem.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Continuous Telemetry Lock
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedSubsystem.description}
            </p>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              {selectedSubsystem.specs.map((spec, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</div>
                  <div className="text-sm font-bold font-mono text-slate-100 mt-1 tabular-nums">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs text-slate-400 space-y-1">
              <span className="font-mono text-slate-300 uppercase tracking-wider block">Engineering Architecture:</span>
              <p className="leading-relaxed">{selectedSubsystem.technicalDetails}</p>
            </div>

            {/* Approach Mars Trigger */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onApproachMars}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors"
              >
                <span>Initiate Mars Orbital Insertion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
