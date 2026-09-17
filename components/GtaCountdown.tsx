'use client';

import { useState, useEffect } from 'react';
import { Gamepad2 } from 'lucide-react';

export default function GtaCountdown() {
  // Target: November 19, 2026 (Daytime BST)
  const targetTime = new Date('2026-11-19T11:00:00+06:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  if (!timeLeft) return null;

  return (
    <aside
      aria-label="GTA VI Launch Countdown"
      className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-50 select-none pointer-events-auto"
    >
      <div className="flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border border-pink-500/35 bg-[#04060a]/90 backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.18)] font-mono text-[10px] sm:text-xs">
        {/* Neon Pulse Badge */}
        <div className="flex items-center gap-1 text-pink-400 font-bold tracking-wider">
          <Gamepad2 size={13} className="text-pink-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px]">GTA VI</span>
        </div>

        <span className="text-zinc-700">|</span>

        {/* Live Ticking Segments */}
        <div className="flex items-center gap-1 text-zinc-200">
          <span className="text-cyan-300 font-semibold">{timeLeft.days}</span>
          <span className="text-zinc-500 text-[9px] sm:text-[10px]">d</span>
          <span className="text-zinc-600">:</span>
          <span className="text-cyan-300 font-semibold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-zinc-500 text-[9px] sm:text-[10px]">h</span>
          <span className="text-zinc-600">:</span>
          <span className="text-cyan-300 font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-zinc-500 text-[9px] sm:text-[10px]">m</span>
          <span className="text-zinc-600">:</span>
          <span className="text-pink-400 font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-zinc-500 text-[9px] sm:text-[10px]">s</span>
        </div>
      </div>
    </aside>
  );
}