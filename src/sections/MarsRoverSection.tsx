import React, { useState } from 'react';
import { ROVER_INSTRUMENTS, RoverInstrument } from '../data/missionData';
import { Radio, Scan, ArrowRight, Zap, Target, Battery, Compass, CheckCircle2 } from 'lucide-react';
import roverImg from '../assets/images/mars_rover_traverse_1792569263885.jpg';
import { spaceSound } from '../utils/audioSynth';

interface MarsRoverSectionProps {
  onProceedToColony: () => void;
}

export const MarsRoverSection: React.FC<MarsRoverSectionProps> = ({ onProceedToColony }) => {
  const [selectedInstrument, setSelectedInstrument] = useState<RoverInstrument>(ROVER_INSTRUMENTS[0]);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);

  const activeTarget = selectedInstrument.sampleTargets[selectedTargetIndex];

  const handleTriggerScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    spaceSound.playLaserScan();

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      spaceSound.playTelemetryPing();
    }, 1200);
  };

  return (
    <section id="rover" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 05B · Autonomous Surface Robotics</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Scientific Rover Recon
            </h2>
          </div>
          <div className="font-mono text-xs text-right text-slate-400">
            <span className="text-amber-400 font-semibold">UNIT: ODYSSEY ROVER-01</span>
            <div>MISSION CLOCK: SOL 428 · ODOMETER: 24.6 KM</div>
          </div>
        </div>

        {/* Hero Visual: Mars Rover in action */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8">
          <div className="aspect-[16/9] max-h-[440px] w-full relative">
            <img
              src={roverImg}
              alt="Scientific exploration rover with articulated arm sampling Martian crater outcrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-black/40" />

            {/* In-view Telemetry HUD */}
            <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-200">
              <div className="text-amber-400 font-bold uppercase">AUTONOMOUS HAZARD NAVIGATION: ACTIVE</div>
              <div className="text-slate-300">Slip Ratio: 4.2% · Incline: 12° · Ground Temp: −48°C</div>
            </div>

            {/* Quick Status Bar at bottom of photo */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 bg-black/75 backdrop-blur-md border border-white/10 p-3 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Battery className="w-3.5 h-3.5" /> 94% MMRTG Power
                </span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="hidden sm:inline">UHF Orbiter Relay: Odyssey Mars Recon</span>
              </div>
              <span className="text-amber-400 uppercase font-semibold">Target Locked: Delta Strata</span>
            </div>
          </div>
        </div>

        {/* Interactive Simulated Science Lab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Instrument Selector (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
              Onboard Science Payload
            </div>
            {ROVER_INSTRUMENTS.map((inst) => {
              const isSelected = inst.id === selectedInstrument.id;
              return (
                <button
                  key={inst.id}
                  onClick={() => {
                    setSelectedInstrument(inst);
                    setSelectedTargetIndex(0);
                    setScanComplete(false);
                    spaceSound.playTelemetryPing();
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400">{inst.code}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">CALIBRATED</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100 mt-1">{inst.name}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{inst.purpose}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Target Scanner Console (Right) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  {selectedInstrument.code} Analysis Console
                </span>
                <h3 className="text-xl font-bold text-slate-100 font-display mt-0.5">
                  {selectedInstrument.name}
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                SENSOR: {selectedInstrument.detectionType}
              </div>
            </div>

            {/* Target Outcrop Selector */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Select Mineral Outcrop Target:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedInstrument.sampleTargets.map((tgt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedTargetIndex(i);
                      setScanComplete(false);
                    }}
                    className={`p-3 rounded-lg text-left border transition-all ${
                      selectedTargetIndex === i
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{tgt.name}</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate mt-1">
                      {tgt.composition}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scan Action & Output Graph */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Target: {activeTarget.name}
                </span>
                <button
                  onClick={handleTriggerScan}
                  disabled={isScanning}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 disabled:opacity-50 transition-colors"
                >
                  <Scan className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Pulsing Laser...' : 'Execute Sensor Scan'}</span>
                </button>
              </div>

              {/* Progress/Simulated Spectrum */}
              {isScanning ? (
                <div className="py-8 text-center space-y-2">
                  <div className="text-xs font-mono text-amber-400 animate-pulse">
                    EMITTING UV RAMAN SPECTRA & X-RAY FLUORESCENCE BEAM...
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-2/3 animate-[pulse_1s_infinite]" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Chemical Composition Confidence:</span>
                    <span className="text-emerald-400 font-bold tabular-nums">
                      {activeTarget.compPercent}% MATCH
                    </span>
                  </div>

                  {/* Spectral Percentage Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-700"
                      style={{ width: `${activeTarget.compPercent}%` }}
                    />
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed pt-2">
                    <strong className="text-slate-100 font-medium">Astrobiological Context: </strong>
                    {activeTarget.significance}
                  </div>
                </div>
              )}
            </div>

            {/* Proceed to Colony CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onProceedToColony}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors shadow-md"
              >
                <span>Proceed to Human Settlement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
