import React, { useState } from 'react';
import { RotateCcw, Compass, CheckCircle2, Award, Download, ArrowUpRight, Share2, Sparkles } from 'lucide-react';
import { spaceSound } from '../utils/audioSynth';

interface FutureSectionProps {
  onStartAgain: () => void;
  onExploreMission: () => void;
}

export const FutureSection: React.FC<FutureSectionProps> = ({ onStartAgain, onExploreMission }) => {
  const [dossierCopied, setDossierCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setDossierCopied(true);
    spaceSound.playTelemetryPing();
    setTimeout(() => setDossierCopied(false), 2000);
  };

  return (
    <section id="future" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-hidden flex flex-col justify-between">
      {/* Background Star Haze */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070B] via-[#0b101d] to-[#05070B] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto my-auto text-center py-12 space-y-12">
        {/* Core Prompt Inscription */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest uppercase text-amber-400 border border-amber-500/30 bg-amber-500/10 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Epilogue · The Interplanetary Century</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-300 font-display">
            Could humanity become an interplanetary species?
          </h2>

          <div className="py-6 max-w-3xl mx-auto">
            <p className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 leading-tight">
              The future is not just somewhere we go.
              <br />
              It is something we build.
            </p>
          </div>

          <div className="p-3 inline-block rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono tracking-widest uppercase text-slate-400">
            STAGE 07 · EXPEDITION ARCHIVE CONFIRMED · SOL RECORD SAVED
          </div>
        </div>

        {/* Mission Dossier Card */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 text-left space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Mission Record</div>
                <div className="text-lg font-bold text-slate-100 font-display">Ares Odyssey Flight Dossier</div>
              </div>
            </div>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Mission Complete
            </span>
          </div>

          {/* Key Milestones Checked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Earth Launch & TMI Injection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>54.6M km Deep Space Cruise</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mars Orbital Entry & Landing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Surface Exploration & Rover Sampling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ares Base Alpha Settlement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>In-Situ Resource Utilization (ISRU)</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-300 border border-slate-700 bg-slate-900 rounded hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{dossierCopied ? 'Link Copied to Clipboard' : 'Share Mission Record'}</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onStartAgain}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Again</span>
              </button>

              <button
                onClick={onExploreMission}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-slate-300 border border-slate-700 bg-slate-900 rounded hover:bg-slate-800 transition-colors"
              >
                <span>Explore the Mission</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scientific Acknowledgments */}
        <div className="max-w-xl mx-auto text-xs text-slate-400 space-y-2">
          <p>
            Ground telemetry, planetary geography, and atmospheric metrics modeled in cooperation with NASA JPL, ESA Mars Express, MRO HiRISE, and the Perseverance Science Team.
          </p>
          <div className="text-[11px] font-mono text-slate-400">
            MISSION: MARS — THE HUMAN ODYSSEY · 2026 EXPEDITION ARCHIVES
          </div>
        </div>
      </div>
    </section>
  );
};
