'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '@/lib/soundEngine';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CyberCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const isInteractive =
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.closest('a') ||
        target?.closest('button');

      if (isInteractive) {
        if (!isHovered) soundFx.playHover();
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      soundFx.playClick();
      setRipples((prev) => [...prev.slice(-4), { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Click Shockwaves */}
      <AnimatePresence>
        {ripples.map((r) => (
          <div key={r.id} style={{ left: r.x, top: r.y }} className="absolute">
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
            />
          </div>
        ))}
      </AnimatePresence>

      {/* Cyber Reticle Target */}
      <motion.div
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovered ? 1.4 : 1,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.4 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 flex items-center justify-center pointer-events-none"
      >
        <span className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        <span className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[2px] h-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        <span className="absolute left-[-2px] top-1/2 -translate-y-1/2 h-[2px] w-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        <span className="absolute right-[-2px] top-1/2 -translate-y-1/2 h-[2px] w-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
      </motion.div>

      {/* Center Target Dot */}
      <motion.div
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isHovered ? 0.6 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 800, mass: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] pointer-events-none"
      />
    </div>
  );
}