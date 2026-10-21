import React, { useState } from 'react';
import { ArrowRight, Compass, Thermometer, Wind, Gauge, Sparkles } from 'lucide-react';
import marsArrivalImg from '../assets/images/mars_orbital_arrival_1792569263452.jpg';

interface MarsArrivalSectionProps {
  onExploreSurface: () => void;
}

export const MarsArrivalSection: React.FC<MarsArrivalSectionProps> = ({ onExploreSurface }) => {
  const [selectedFactIndex, setSelectedFactIndex] = useState<number>(0);

  const marsMetrics = [
    {
      icon: <Gauge className="w-4 h-4 text-amber-400" />,
      label: 'Surface Gravity',
      value: '3.72 m/s²',
      comparison: '38% of Earth (0.38 g)',
      detail: 'An 80 kg human weighs only 30.4 kg on Mars, enabling effortless mobility but requiring countermeasures against bone demineralization.'
    },
    {
      icon: <Thermometer className="w-4 h-4 text-rose-400" />,
      label: 'Average Temperature',
      value: '−63 °C',
      comparison: 'Ranges −140°C to +20°C',
      detail: 'Equatorial midday summer temperatures can reach a mild +20°C, but plunge to −100°C overnight due to the thin atmospheric blanket.'
    },
    {
      icon: <Wind className="w-4 h-4 text-cyan-400" />,
      label: 'Surface Pressure',
      value: '610 Pa (0.61 kPa)',
      comparison: '<1% of Earth Sea Level',
      detail: 'The atmospheric density is equivalent to Earth’s stratosphere at 35 km altitude, demanding fully pressurized suits and habitats.'
    },
    {
      icon: <Compass className="w-4 h-4 text-orange-400" />,
      label: 'Sol Day Length',
      value: '24h 39m 35s',
      comparison: '2.7% longer than Earth Day',
      detail: 'Human circadian rhythms adapt quickly to the extra 39 minutes per day, making daily schedules surprisingly familiar to Earth.'
    }
  ];

  return (
    <section id="arrival" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-amber-900/40 overflow-hidden">
      {/* Background Mars Atmosphere Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#140806] to-[#05070B] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Cinematic Arrival Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-orange-400 border border-orange-500/30 bg-orange-500/10 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atmospheric Entry Interface Cleared</span>
          </div>

          <div className="text-sm font-mono tracking-widest uppercase text-slate-400">
            ARRIVAL CONFIRMED
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 font-display mt-2">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-amber-500">Mars</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            The fourth planet from the Sun. A cold desert world holding four billion years of planetary history and the stepping stone for human multiplanetary existence.
          </p>
        </div>

        {/* Visual Hero Feature: Mars Orbital Arrival Image */}
        <div className="relative rounded-2xl overflow-hidden border border-orange-950/80 shadow-2xl mb-12">
          <div className="aspect-[16/9] max-h-[500px] w-full relative">
            <img
              src={marsArrivalImg}
              alt="Orbital view of Mars caldera and chasms from approaching spacecraft"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-black/30" />
            
            {/* Telemetry Overlays on Image */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200">
              <div className="text-amber-400 uppercase font-semibold">ORBIT INSERTION BURN: SUCCESSFUL</div>
              <div className="text-slate-300">Apoapsis: 420 km · Periapsis: 280 km</div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="p-3 sm:p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 max-w-lg">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">Atmospheric Composition</div>
                <div className="text-sm text-slate-200 mt-1">
                  95.3% Carbon Dioxide (CO₂) · 2.6% Nitrogen (N₂) · 1.9% Argon (Ar) · 0.16% Oxygen (O₂)
                </div>
              </div>

              <button
                onClick={onExploreSurface}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-orange-500 text-slate-950 rounded hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap"
              >
                <span>Descend to Surface</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Planetary Physical Characteristics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marsMetrics.map((metric, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFactIndex(idx)}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                selectedFactIndex === idx
                  ? 'bg-orange-950/20 border-orange-500/50 shadow-lg shadow-orange-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-800/80">{metric.icon}</div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">{metric.comparison}</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{metric.label}</div>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-1 tabular-nums">{metric.value}</div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-slate-800/80 pt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
