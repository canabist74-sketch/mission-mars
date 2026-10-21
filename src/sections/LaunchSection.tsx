import React, { useState, useEffect } from 'react';
import { Rocket, Flame, ArrowRight, RotateCcw, Activity } from 'lucide-react';
import { spaceSound } from '../utils/audioSynth';

interface LaunchSectionProps {
  onEnterDeepSpace: () => void;
}

export const LaunchSection: React.FC<LaunchSectionProps> = ({ onEnterDeepSpace }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [launchStatus, setLaunchStatus] = useState<'idle' | 'counting' | 'ascent' | 'staging' | 'orbit'>('idle');
  const [altitude, setAltitude] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  const startCountdown = () => {
    setLaunchStatus('counting');
    setCountdown(3);
    spaceSound.playTelemetryPing();
  };

  useEffect(() => {
    if (launchStatus !== 'counting' || countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        spaceSound.playTelemetryPing();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown reaches 0 -> LIFTOFF
      setLaunchStatus('ascent');
      spaceSound.playLaunchRumble(5);
    }
  }, [countdown, launchStatus]);

  // Simulation loop for ascent
  useEffect(() => {
    if (launchStatus !== 'ascent' && launchStatus !== 'staging') return;

    const interval = setInterval(() => {
      setAltitude((prev) => {
        if (prev < 80) return prev + 2.5;
        if (prev < 180) {
          setLaunchStatus('staging');
          return prev + 6;
        }
        if (prev < 400) return prev + 12;
        setLaunchStatus('orbit');
        return 400;
      });

      setVelocity((prev) => {
        if (prev < 28000) return prev + 450;
        return 28000;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [launchStatus]);

  const resetLaunch = () => {
    setCountdown(null);
    setLaunchStatus('idle');
    setAltitude(0);
    setVelocity(0);
  };

  return (
    <section id="launch" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-hidden">
      {/* Dynamic atmospheric gradient background that shifts from cyan/blue lower atmosphere to dark space */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          launchStatus === 'idle'
            ? 'bg-gradient-to-b from-sky-950/20 via-[#05070B] to-[#05070B]'
            : launchStatus === 'ascent'
            ? 'bg-gradient-to-b from-amber-950/30 via-slate-950 to-[#05070B]'
            : 'bg-gradient-to-b from-slate-950 via-[#05070B] to-[#05070B]'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">Stage 02 · Trans-Mars Injection</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 font-display">
              Launch Sequence
            </h2>
          </div>
          <div className="font-mono text-xs text-right">
            <div className="text-slate-400 uppercase">Mission Status</div>
            <div className={`font-semibold ${launchStatus === 'orbit' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {launchStatus === 'idle' && 'PAD STANDBY · COUNTDOWN READY'}
              {launchStatus === 'counting' && 'TERMINAL COUNTDOWN INITIATED'}
              {launchStatus === 'ascent' && 'LIFTOFF · FIRST STAGE BOOST'}
              {launchStatus === 'staging' && 'STAGE SEPARATION · VACUUM BURN'}
              {launchStatus === 'orbit' && 'TRANS-MARS INJECTION CONFIRMED'}
            </div>
          </div>
        </div>

        {/* Central Launch Simulation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Console: Rocket & Countdown Graphic */}
          <div className="lg:col-span-7 relative min-h-[460px] rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-slate-800 p-8 flex flex-col justify-between overflow-hidden">
            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-amber-500" />
                <span>ODYSSEY HEAVY LAUNCH VEHICLE</span>
              </span>
              <span>SIMULATED FLIGHT PROFILE</span>
            </div>

            {/* Central Animated Viewport */}
            <div className="relative my-auto flex flex-col items-center justify-center py-8">
              {launchStatus === 'idle' && (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                    <Rocket className="w-10 h-10 transform -rotate-45" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono tracking-widest text-slate-400">All Systems Nominal</div>
                    <div className="text-2xl font-bold font-display text-slate-100 mt-1">Ready for Ignition</div>
                  </div>
                  <button
                    onClick={startCountdown}
                    className="px-8 py-3 text-xs uppercase tracking-wider font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-all shadow-md active:scale-95"
                  >
                    Initiate Countdown
                  </button>
                </div>
              )}

              {launchStatus === 'counting' && (
                <div className="text-center space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-400">Terminal Count</div>
                  <div className="text-8xl font-black font-mono tabular-nums text-slate-100 motion-safe:animate-scale">
                    {countdown !== null && countdown > 0 ? `0${countdown}` : 'IGNITION'}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Propellant Tanks Pressurizing · Guidance Internal
                  </div>
                </div>
              )}

              {(launchStatus === 'ascent' || launchStatus === 'staging' || launchStatus === 'orbit') && (
                <div className="text-center space-y-6 w-full max-w-md">
                  {/* Rocket Visual with Thrust Flame */}
                  <div className="relative mx-auto w-12 h-36 flex flex-col items-center">
                    <Rocket className="w-12 h-12 text-slate-100 transform -rotate-45 relative z-10" />
                    {launchStatus !== 'orbit' && (
                      <div className="w-6 h-20 bg-gradient-to-b from-amber-400 via-orange-500 to-transparent rounded-full blur-[2px] animate-pulse" />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                      {launchStatus === 'ascent' && 'Atmospheric Ascent (Max-Q Cleared)'}
                      {launchStatus === 'staging' && 'Second Stage Ignition · Leaving Earth Gravity Well'}
                      {launchStatus === 'orbit' && 'Trans-Mars Injection Burn Complete'}
                    </div>
                    <div className="text-2xl font-bold text-slate-100 font-display mt-1">
                      {launchStatus === 'orbit' ? 'Departure Confirmed' : 'Climbing to Orbit'}
                    </div>
                  </div>

                  {/* Progress Bar of Escape Velocity */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (velocity / 28000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                onClick={resetLaunch}
                disabled={launchStatus === 'idle'}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Launchpad</span>
              </button>

              <button
                onClick={onEnterDeepSpace}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              >
                <span>Enter Deep Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Console: Live Telemetry Gauges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Flight Telemetry</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> AUTONOMOUS GUIDANCE
                </span>
              </div>

              {/* Altitude readout */}
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">Current Altitude</div>
                <div className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
                  {altitude.toFixed(1)} <span className="text-sm font-normal text-slate-400">KM</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {altitude < 100 ? 'Karman line (100km boundary ahead)' : 'Low Earth Orbit orbital plane attained'}
                </div>
              </div>

              {/* Velocity readout */}
              <div>
                <div className="text-[11px] font-mono uppercase text-slate-400">Orbital Velocity</div>
                <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                  {velocity.toLocaleString()} <span className="text-sm font-normal text-slate-400">KM/H</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Escape velocity: 40,320 km/h required for interplanetary injection.
                </div>
              </div>

              {/* Staging Milestones */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="text-[11px] text-slate-400 uppercase">Flight Milestones</div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>T-00:00:00 Liftoff & Ignition</span>
                  <span className={launchStatus !== 'idle' ? 'text-emerald-400' : 'text-slate-400'}>
                    {launchStatus !== 'idle' ? 'Passed' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>T+00:01:12 Max-Q (Aero Stress)</span>
                  <span className={altitude > 40 ? 'text-emerald-400' : 'text-slate-400'}>
                    {altitude > 40 ? 'Passed' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>T+00:02:45 Stage 1 Booster MECO</span>
                  <span className={altitude > 100 ? 'text-emerald-400' : 'text-slate-400'}>
                    {altitude > 100 ? 'Passed' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>T+00:06:20 Trans-Mars Injection Burn</span>
                  <span className={launchStatus === 'orbit' ? 'text-emerald-400' : 'text-slate-400'}>
                    {launchStatus === 'orbit' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quote banner */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 italic">
              "When you break through the atmospheric veil and the blue rim drops away, there is only the silence of the void and the rust-red star ahead."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
