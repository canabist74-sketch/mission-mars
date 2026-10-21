import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { MISSION_STAGES } from '../data/missionData';
import { spaceSound } from '../utils/audioSynth';

interface NavigationProps {
  activeStage: string;
  onSelectStage: (stageId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeStage, onSelectStage }) => {
  const [isAudioActive, setIsAudioActive] = useState<boolean>(!spaceSound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const unmuted = spaceSound.toggleMute();
    setIsAudioActive(unmuted);
    if (unmuted) {
      spaceSound.playTelemetryPing();
    }
  };

  const handleNavClick = (stageId: string) => {
    onSelectStage(stageId);
    setMobileMenuOpen(false);
  };

  const activeStageData = MISSION_STAGES.find(s => s.id === activeStage) || MISSION_STAGES[0];

  return (
    <>
      {/* Top Bar - Strictly complies with Top Bar Contract (3 zones, single line) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070B]/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#earth"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('earth');
            }}
            className="text-lg font-bold tracking-widest text-slate-100 uppercase font-display whitespace-nowrap shrink-0 hover:text-amber-500 transition-colors"
          >
            Mission: Mars
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-slate-400">
            <button
              onClick={() => handleNavClick('earth')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${activeStage === 'earth' ? 'text-amber-400' : ''}`}
            >
              Earth
            </button>
            <button
              onClick={() => handleNavClick('launch')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${activeStage === 'launch' ? 'text-amber-400' : ''}`}
            >
              Launch
            </button>
            <button
              onClick={() => handleNavClick('space')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${activeStage === 'space' ? 'text-amber-400' : ''}`}
            >
              Deep Space
            </button>
            <button
              onClick={() => handleNavClick('arrival')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${activeStage === 'arrival' || activeStage === 'exploration' ? 'text-amber-400' : ''}`}
            >
              Surface
            </button>
            <button
              onClick={() => handleNavClick('colony')}
              className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${activeStage === 'colony' || activeStage === 'future' ? 'text-amber-400' : ''}`}
            >
              Colony
            </button>
          </nav>

          {/* Zone 3: 1 primary action area (Audio toggle & Mobile menu button) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAudioToggle}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded border transition-colors ${
                isAudioActive
                  ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isAudioActive ? 'Mute generative space soundscape' : 'Enable ambient synthesizer audio'}
              aria-label="Toggle mission audio"
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline">{isAudioActive ? 'Audio ON' : 'Audio OFF'}</span>
            </button>

            <button
              onClick={() => handleNavClick('launch')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Flight Deck</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-200 border border-slate-800 rounded bg-slate-900/40"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/90 bg-[#070B12] px-4 py-4 space-y-2">
            {MISSION_STAGES.map((stage) => {
              const isActive = stage.id === activeStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleNavClick(stage.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded transition-colors text-left ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span className="font-mono text-slate-500">{stage.index}</span>
                  <span className="font-semibold">{stage.name}</span>
                  <span className="text-[10px] text-slate-400">{stage.subtitle}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Persistent Mission Progress Dock - Desktop Floating Left Rail */}
      <aside
        aria-label="Mission Progress"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 p-3 rounded-xl bg-slate-950/60 backdrop-blur-md border border-slate-800/80 shadow-2xl"
      >
        <div className="px-2 pb-1 border-b border-slate-800/80 mb-1">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Trajectory</div>
          <div className="text-xs font-mono font-semibold text-amber-400">
            {activeStageData.index} · {activeStageData.name}
          </div>
        </div>

        {MISSION_STAGES.map((stage) => {
          const isActive = stage.id === activeStage;
          return (
            <button
              key={stage.id}
              onClick={() => handleNavClick(stage.id)}
              className={`group flex items-center gap-3 px-2 py-1.5 rounded transition-all text-left ${
                isActive
                  ? 'bg-amber-500/10 text-amber-300'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span
                className={`font-mono text-[11px] tabular-nums transition-colors ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {stage.index}
              </span>
              <div className="flex flex-col">
                <span className={`text-xs uppercase tracking-wide font-medium ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                  {stage.name}
                </span>
              </div>
            </button>
          );
        })}
      </aside>

      {/* Mobile persistent bottom stage bar */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#070B12]/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-amber-400 font-semibold">{activeStageData.index}</span>
          <span className="text-xs uppercase font-medium text-slate-200">{activeStageData.name}</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {MISSION_STAGES.map((stage) => (
            <button
              key={stage.id}
              onClick={() => handleNavClick(stage.id)}
              aria-label={`Jump to stage ${stage.index}: ${stage.name}`}
              className={`w-5 h-2 rounded-full transition-all ${
                stage.id === activeStage ? 'bg-amber-400 w-8' : 'bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
