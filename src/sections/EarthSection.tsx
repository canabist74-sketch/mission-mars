import React, { useState } from 'react';
import { Planet3D } from '../components/Planet3D';
import { Globe, ArrowRight, ShieldCheck, Compass, Activity } from 'lucide-react';

interface EarthSectionProps {
  onProceedToLaunch: () => void;
}

export const EarthSection: React.FC<EarthSectionProps> = ({ onProceedToLaunch }) => {
  const [activeTab, setActiveTab] = useState<'resilience' | 'origins' | 'tech'>('resilience');

  const pillars = {
    resilience: {
      title: 'Planetary Insurance & Resilience',
      tagline: 'Preserving the light of consciousness beyond a single cradle.',
      points: [
        'Earth has experienced five mass extinction events throughout its natural geological history.',
        'Becoming multiplanetary guarantees that humanity and terrestrial biodiversity endure past planetary threats.',
        'Mars serves as the first self-sustaining evolutionary branch of civilization in the cosmos.'
      ]
    },
    origins: {
      title: 'The Search for Life’s Genesis',
      tagline: 'Did life emerge independently on a second world?',
      points: [
        'Four billion years ago, Mars possessed a thick atmosphere, vast oceans, and volcanic hydrothermal vents.',
        'Unlocking micro-fossils or biosignatures in Martian mudstones reveals whether life is an inevitable cosmic principle.',
        'Comparative astrobiology transforms our understanding of DNA, biochemistry, and our place in the universe.'
      ]
    },
    tech: {
      title: 'Breakthrough Closed-Loop Tech',
      tagline: 'Innovations for Mars directly heal and sustain Earth.',
      points: [
        'Survival on Mars demands 98%+ water recycling, zero-waste agriculture, and extreme-efficiency solar grids.',
        'Direct carbon capture technology developed for Mars propellant synthesis can scrub greenhouse emissions on Earth.',
        'Compact modular fission and closed-loop ECLSS architecture provide clean abundance for arid regions on Earth.'
      ]
    }
  };

  return (
    <section id="earth" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 01 · Point of Origin</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Why Mars?
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Earth is where our story began. But remaining bound to one planet leaves humanity vulnerable. Mars is our natural proving ground.
          </p>
        </div>

        {/* 2-Column Showcase: Left = 3D Interactive Earth, Right = Philosophical & Scientific Imperatives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Earth Globe */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900/50 to-slate-950/80 border border-slate-800/80 p-6 overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Globe className="w-3.5 h-3.5" /> Earth (Sol III)
              </span>
              <span>Rotate & Drag to Inspect</span>
            </div>

            <div className="w-full h-[360px] sm:h-[420px] flex items-center justify-center">
              <Planet3D type="earth" autoRotate={true} />
            </div>

            {/* Earth Metrics Strip */}
            <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center text-xs font-mono">
              <div>
                <div className="text-slate-400 text-[10px] uppercase">Orbital Speed</div>
                <div className="text-slate-200 font-semibold tabular-nums">29.78 km/s</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase">Atmospheric Pressure</div>
                <div className="text-slate-200 font-semibold tabular-nums">101.3 kPa</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase">Surface Gravity</div>
                <div className="text-slate-200 font-semibold tabular-nums">9.81 m/s² (1g)</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Pillars Tabs & Deep Insights */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tab buttons */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab('resilience')}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'resilience'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Resilience
              </button>
              <button
                onClick={() => setActiveTab('origins')}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'origins'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Origins of Life
              </button>
              <button
                onClick={() => setActiveTab('tech')}
                className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeTab === 'tech'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Earth Impact
              </button>
            </div>

            {/* Active Content Card */}
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100 font-display">
                  {pillars[activeTab].title}
                </h3>
                <p className="text-xs text-amber-400/90 font-mono mt-1">
                  {pillars[activeTab].tagline}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {pillars[activeTab].points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                    <span className="font-mono text-xs text-amber-500 mt-0.5">0{i + 1}.</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Transition Trigger Card */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-slate-900/80 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase font-mono text-amber-400 font-semibold">Pre-Flight Authorization</div>
                <div className="text-sm text-slate-200 mt-0.5">Orbital alignment window open. Readiness verified.</div>
              </div>
              <button
                onClick={onProceedToLaunch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors whitespace-nowrap"
              >
                <span>Initiate Launch Sequence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
