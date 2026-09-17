'use client';

import { Volume2, VolumeX, Sparkles, EyeOff } from 'lucide-react';
import { soundFx } from '@/lib/soundEngine';

interface ControlsProps {
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  animEnabled: boolean;
  setAnimEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export default function CyberControls({
  soundEnabled,
  setSoundEnabled,
  animEnabled,
  setAnimEnabled,
}: ControlsProps) {
  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.isMuted = !next;
    soundFx.playToggle(next);
    setSoundEnabled(next);
  };

  const toggleAnim = () => {
    soundFx.playToggle(!animEnabled);
    setAnimEnabled((prev) => !prev);
  };

  return (
    <aside
      aria-label="Cyber Controls"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 p-1 rounded-full border border-cyan-500/30 bg-[#04060a]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-auto select-none"
    >
      {/* Sound Toggle Icon */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => soundFx.playHover()}
        aria-label={soundEnabled ? 'Disable Audio SFX' : 'Enable Audio SFX'}
        title={soundEnabled ? 'Audio SFX: Active' : 'Audio SFX: Muted'}
        className={`relative p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
          soundEnabled
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
            : 'text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-zinc-900/60'
        }`}
      >
        {soundEnabled ? (
          <Volume2 size={15} className="text-cyan-400" />
        ) : (
          <VolumeX size={15} />
        )}
      </button>

      {/* Visual FX Toggle Icon */}
      <button
        onClick={toggleAnim}
        onMouseEnter={() => soundFx.playHover()}
        aria-label={animEnabled ? 'Disable Motion FX' : 'Enable Motion FX'}
        title={animEnabled ? 'Visual FX: Active' : 'Visual FX: Static'}
        className={`relative p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
          animEnabled
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
            : 'text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-zinc-900/60'
        }`}
      >
        {animEnabled ? (
          <Sparkles size={15} className="text-cyan-400" />
        ) : (
          <EyeOff size={15} />
        )}
      </button>
    </aside>
  );
}