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
    <aside aria-label="Cyber HUD Control Deck" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full border border-cyan-500/30 bg-[#06080d]/80 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.2)]">
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => soundFx.playHover()}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
          soundEnabled
            ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
        title="Toggle Cyber SFX"
      >
        {soundEnabled ? (
          <>
            <Volume2 size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">SFX: ON</span>
            {/* Animated EQ Bars */}
            <span className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-cyan-300 animate-bounce" />
              <span className="w-0.5 h-1.5 bg-cyan-500 animate-pulse" />
            </span>
          </>
        ) : (
          <>
            <VolumeX size={14} />
            <span className="hidden sm:inline">SFX: OFF</span>
          </>
        )}
      </button>

      {/* Visual Animation FX Toggle Button */}
      <button
        onClick={toggleAnim}
        onMouseEnter={() => soundFx.playHover()}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
          animEnabled
            ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
        title="Toggle Background Motion"
      >
        {animEnabled ? (
          <>
            <Sparkles size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">FX: ACTIVE</span>
          </>
        ) : (
          <>
            <EyeOff size={14} />
            <span className="hidden sm:inline">FX: STATIC</span>
          </>
        )}
      </button>
    </aside>
  );
}