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
      aria-label="Cyber HUD Control Deck"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full border border-cyan-500/30 bg-[#06080d]/85 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]"
    >
      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => soundFx.playHover()}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-200 ${
          soundEnabled
            ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
        title="Toggle Cyber SFX"
      >
        {soundEnabled ? (
          <>
            <Volume2 size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">SFX: ON</span>
            <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
              <span className="w-0.5 h-2.5 bg-cyan-300 animate-bounce" />
            </span>
          </>
        ) : (
          <>
            <VolumeX size={13} />
            <span className="hidden sm:inline">SFX: OFF</span>
          </>
        )}
      </button>

      {/* Visual Animation FX Toggle */}
      <button
        onClick={toggleAnim}
        onMouseEnter={() => soundFx.playHover()}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-200 ${
          animEnabled
            ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
        title="Toggle Motion"
      >
        {animEnabled ? (
          <>
            <Sparkles size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">FX: ACTIVE</span>
          </>
        ) : (
          <>
            <EyeOff size={13} />
            <span className="hidden sm:inline">FX: STATIC</span>
          </>
        )}
      </button>
    </aside>
  );
}