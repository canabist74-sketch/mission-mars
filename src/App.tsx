/**
 * MISSION: MARS — THE HUMAN ODYSSEY
 * Production-ready, cinematic, interactive digital odyssey.
 */
import React, { useState, useEffect } from 'react';
import { Starfield } from './components/Starfield';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { EarthSection } from './sections/EarthSection';
import { LaunchSection } from './sections/LaunchSection';
import { DeepSpaceSection } from './sections/DeepSpaceSection';
import { MarsArrivalSection } from './sections/MarsArrivalSection';
import { MarsExplorationSection } from './sections/MarsExplorationSection';
import { MarsRoverSection } from './sections/MarsRoverSection';
import { MarsColonySection } from './sections/MarsColonySection';
import { LivingOnMarsSection } from './sections/LivingOnMarsSection';
import { FutureSection } from './sections/FutureSection';
import { spaceSound } from './utils/audioSynth';

export default function App() {
  const [activeStage, setActiveStage] = useState<string>('earth');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to keep active stage in sync with the viewport
  useEffect(() => {
    const sections = [
      { id: 'hero', stage: 'earth' },
      { id: 'earth', stage: 'earth' },
      { id: 'launch', stage: 'launch' },
      { id: 'space', stage: 'space' },
      { id: 'arrival', stage: 'arrival' },
      { id: 'exploration', stage: 'exploration' },
      { id: 'rover', stage: 'exploration' },
      { id: 'colony', stage: 'colony' },
      { id: 'survival', stage: 'colony' },
      { id: 'future', stage: 'future' },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveStage(sections[i].stage);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        spaceSound.toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070B] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Starfield */}
      <Starfield />

      {/* Persistent Navigation & Progress Dock */}
      <Navigation
        activeStage={activeStage}
        onSelectStage={(stageId) => scrollToSection(stageId)}
      />

      {/* Main Mission Flow */}
      <main className="relative z-10">
        <HeroSection
          onBeginMission={() => scrollToSection('earth')}
          onExploreTelemetry={() => scrollToSection('space')}
        />

        <EarthSection
          onProceedToLaunch={() => scrollToSection('launch')}
        />

        <LaunchSection
          onEnterDeepSpace={() => scrollToSection('space')}
        />

        <DeepSpaceSection
          onApproachMars={() => scrollToSection('arrival')}
        />

        <MarsArrivalSection
          onExploreSurface={() => scrollToSection('exploration')}
        />

        <MarsExplorationSection
          onProceedToRover={() => scrollToSection('rover')}
        />

        <MarsRoverSection
          onProceedToColony={() => scrollToSection('colony')}
        />

        <MarsColonySection
          onProceedToSurvival={() => scrollToSection('survival')}
        />

        <LivingOnMarsSection
          onProceedToFuture={() => scrollToSection('future')}
        />

        <FutureSection
          onStartAgain={() => scrollToSection('hero')}
          onExploreMission={() => scrollToSection('exploration')}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold uppercase">Mission: Mars</span>
            <span>·</span>
            <span>The Human Odyssey</span>
          </div>
          <div>
            Built with React, Three.js & Tailwind CSS · Planetary telemetry simulated from NASA JPL & ESA datasets.
          </div>
        </div>
      </footer>
    </div>
  );
}
