import React from 'react';
import { ArrowDown, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import heroEarthImage from '../assets/images/mars_earth_horizon_1792569261977.jpg';

interface HeroSectionProps {
  onBeginMission: () => void;
  onExploreTelemetry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBeginMission, onExploreTelemetry }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Hero Image with Film Grain Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroEarthImage}
          alt="Earth orbital horizon from low orbit"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-[pulse_16s_ease-in-out_infinite] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/70 to-[#05070B]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05070B_80%)]" />
      </div>

      {/* Top Telemetry Stamp */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-semibold uppercase tracking-wider">EXPEDITION ODYSSEY-01</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <span className="hidden sm:inline">EARTH-MARS CYCLER PROTOCOL</span>
        </div>
        <div className="flex items-center gap-4 tabular-nums">
          <span>COORDINATES: L2 + TMI VECTORS</span>
          <span className="hidden md:inline text-emerald-400">TELEMETRY NOMINAL</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono tracking-widest uppercase rounded border border-amber-500/30 bg-amber-500/10 text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interplanetary Deep Space Initiative</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-50 uppercase font-display leading-[0.95]">
          Mission: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">Mars</span>
        </h1>

        <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-light tracking-widest uppercase text-slate-300 font-display">
          The Human Odyssey
        </div>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Humanity’s next giant leap starts here. Journey across 54 million kilometers of deep space to establish the first permanent settlement on the Red Planet.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onBeginMission}
            className="w-full sm:w-auto px-8 py-3.5 text-sm uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            Begin Mission
          </button>
          <button
            onClick={onExploreTelemetry}
            className="w-full sm:w-auto px-6 py-3.5 text-sm uppercase tracking-wider font-medium text-slate-300 border border-slate-700 bg-slate-900/60 rounded hover:bg-slate-800 hover:text-white transition-all active:scale-95"
          >
            Flight Telemetry
          </button>
          <a
            href="/mission_mars_dossier.pdf"
            download="Mission_Mars_The_Human_Odyssey_Dossier.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-mono text-amber-300/90 border border-amber-500/30 bg-amber-500/10 rounded hover:bg-amber-500/20 transition-all active:scale-95"
            title="Download full 4-page Mission Dossier PDF"
          >
            <span>PDF Dossier</span>
          </a>
        </div>
      </div>

      {/* Bottom KPI Telemetry Strip */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
        <div className="border-r border-slate-800/70 pr-4 last:border-0">
          <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Target Body</div>
          <div className="text-lg font-bold text-slate-100 font-display">Mars (Sol IV)</div>
          <div className="text-xs text-slate-400">Fourth Planet from Sun</div>
        </div>
        <div className="border-r border-slate-800/70 pr-4 last:border-0">
          <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Transfer Transit</div>
          <div className="text-lg font-bold text-slate-100 font-mono tabular-nums">~180 - 210 Days</div>
          <div className="text-xs text-slate-400">Hohmann Elliptic Orbit</div>
        </div>
        <div className="border-r border-slate-800/70 pr-4 last:border-0">
          <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Surface Gravity</div>
          <div className="text-lg font-bold text-amber-400 font-mono tabular-nums">0.38 g (3.72 m/s²)</div>
          <div className="text-xs text-slate-400">38% of Earth standard</div>
        </div>
        <div>
          <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400">Primary Objective</div>
          <div className="text-lg font-bold text-emerald-400 font-display">Permanent Settlement</div>
          <div className="text-xs text-slate-400">Ares Base Alpha Outpost</div>
        </div>
      </div>
    </section>
  );
};
