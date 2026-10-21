import React, { useState } from 'react';
import { PLANETARY_COMPARISONS } from '../data/missionData';
import { Shield, AlertTriangle, CheckCircle, Scale, Flame, Wifi, ArrowRight } from 'lucide-react';

interface LivingOnMarsSectionProps {
  onProceedToFuture: () => void;
}

export const LivingOnMarsSection: React.FC<LivingOnMarsSectionProps> = ({ onProceedToFuture }) => {
  const [shieldingMode, setShieldingMode] = useState<'unshielded' | 'regolith' | 'lavatube'>('regolith');

  const shieldingScenarios = {
    unshielded: {
      name: 'Unprotected Surface EVA',
      radiationDose: '260 mSv / year',
      radiationLevel: 'Hazardous (Limit: 50 mSv/yr for rad workers)',
      status: 'Critical Risk',
      pressure: '0.61 kPa (Ebullism within 15 seconds without EVA suit)',
      thermalInsulation: 'High Thermal Drift (−100°C to +20°C swings)',
      viableDuration: 'Maximum 60 to 90 minutes per day'
    },
    regolith: {
      name: '3-Meter Compacted Regolith Berm (Ares Alpha)',
      radiationDose: '12 mSv / year',
      radiationLevel: 'Safe & Manageable (Well within career limits)',
      status: 'Expedition Nominal',
      pressure: '101.3 kPa Pressurized Habitat Enclosure',
      thermalInsulation: 'Stable +21°C Ambient via geothermal regolith buffering',
      viableDuration: 'Continuous Multi-Year Expedition Habitation'
    },
    lavatube: {
      name: 'Deep Subterranean Basalt Lava Tube',
      radiationDose: '1.2 mSv / year',
      radiationLevel: 'Comparable to Earth Surface Background',
      status: 'Ideal Long-Term Sanctuary',
      pressure: 'Pressurized Cavern System',
      thermalInsulation: 'Constant −20°C base (requires minimal active heating)',
      viableDuration: 'Permanent Multi-Generational Settlement'
    }
  };

  const currentScenario = shieldingScenarios[shieldingMode];

  return (
    <section id="survival" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 06B · Physiological & Biophysical Realities</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Can Humans Live on Mars?
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Scientific comparison of planetary environments. Mars offers raw materials for survival, but tests the absolute limits of human biology and engineering.
          </p>
        </div>

        {/* 4 Large Highlight Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Surface Gravity</div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-amber-400 mt-2 tabular-nums">
              38%
            </div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wide mt-1">Earth's Gravity (~3.72 m/s²)</div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-3">
              Requires 2 hours of daily resistance training and centrifuges to preserve musculoskeletal density.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Mean Temperature</div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-400 mt-2 tabular-nums">
              −63°C
            </div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wide mt-1">Approximate Global Average</div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-3">
              Ranges from −140°C at polar winters to occasional equatorial highs of +20°C in direct summer sun.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Atmosphere</div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-cyan-400 mt-2">
              CO₂
            </div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wide mt-1">95.3% Dominant Gas</div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-3">
              Toxic to breathe without extraction, but provides abundant feed-gas to synthesize breathable O2 and fuel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Radio Latency</div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-orange-400 mt-2 tabular-nums">
              ~24 min
            </div>
            <div className="text-xs text-slate-300 font-medium uppercase tracking-wide mt-1">Max One-Way Light Delay</div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-3">
              Precludes joystick control or interactive conversation. Mission autonomy must be total.
            </p>
          </div>
        </div>

        {/* Visual Comparison Strip: Earth vs Mars Parameter Bars */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 mb-12 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 font-display">
              Comparative Environmental Parameters
            </h3>
            <span className="text-xs font-mono text-slate-400">EARTH vs. MARS EMPIRICAL DATA</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PLANETARY_COMPARISONS.map((comp, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{comp.parameter}</span>
                  <span className="font-mono text-slate-400">{comp.unit}</span>
                </div>

                {/* Earth Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-blue-400">Earth</span>
                    <span className="text-slate-200">{comp.earthValue}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-full w-full" />
                  </div>
                </div>

                {/* Mars Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400">Mars</span>
                    <span className="text-slate-200">{comp.marsValue}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full transition-all duration-500"
                      style={{ width: `${Math.max(5, Math.min(100, comp.ratio))}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  {comp.implication}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Radiation & Shielding Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Radiation & Life Support Simulator</span>
              <h3 className="text-2xl font-bold text-slate-100 font-display mt-0.5">
                Habitat Survivability Architecture
              </h3>
            </div>
            {/* Shielding mode buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setShieldingMode('unshielded')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  shieldingMode === 'unshielded'
                    ? 'bg-rose-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unshielded
              </button>
              <button
                onClick={() => setShieldingMode('regolith')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  shieldingMode === 'regolith'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3m Regolith Berm
              </button>
              <button
                onClick={() => setShieldingMode('lavatube')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  shieldingMode === 'lavatube'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lava Tube Cavern
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Annual Radiation Exposure</span>
              <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                {currentScenario.radiationDose}
              </div>
              <div className="text-xs text-slate-400">{currentScenario.radiationLevel}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Atmospheric Containment</span>
              <div className="text-xl font-bold font-mono text-slate-100">
                {currentScenario.pressure}
              </div>
              <div className="text-xs text-slate-400">Breathing Gas & Partial Pressure</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Mission Habitation Viability</span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {currentScenario.status}
              </div>
              <div className="text-xs text-slate-400">{currentScenario.viableDuration}</div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onProceedToFuture}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors"
            >
              <span>Explore The Interplanetary Future</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
