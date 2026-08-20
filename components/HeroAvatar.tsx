'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Crosshair } from 'lucide-react';

export default function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Link HUD rings rotation to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const rotateOuter = useTransform(smoothProgress, [0, 1], [0, 240]);
  const rotateInner = useTransform(smoothProgress, [0, 1], [0, -240]);
  const cardScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.03, 0.96]);
  const cardY = useTransform(smoothProgress, [0, 1], [-10, 15]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[280px] lg:max-w-[300px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      {/* 1. OUTER ROTATING DASHED TARGETING RING */}
      <motion.div
        style={{ rotate: rotateOuter }}
        className="absolute -inset-5 sm:-inset-6 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
      />

      {/* 2. INNER COUNTER-ROTATING RADAR RING WITH SATELLITE NODES */}
      <motion.div
        style={{ rotate: rotateInner }}
        className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-cyan-500/25 pointer-events-none"
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8]" />
      </motion.div>

      {/* 3. AMBIENT NEON GLOW */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-2xl -z-10 pointer-events-none" />

      {/* 4. MAIN CIRCULAR PHOTO FRAME */}
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
        }}
        className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-cyan-400/60 via-cyan-900/40 to-blue-500/60 shadow-[0_0_30px_rgba(6,182,212,0.25)] group"
      >
        {/* Inner Masked Circle */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-[#04070d] border border-cyan-500/40">
          {/* Clean Profile Picture */}
          <img
            src="/profile.jpg"
            alt="Iftakhar Ahmed"
            className="w-full h-full object-cover object-[center_18%] scale-[1.22] contrast-[105%] group-hover:scale-[1.28] transition-all duration-700 pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* 5. BOTTOM CYBER OPERATOR BADGE */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-[#04060a]/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-cyan-300 whitespace-nowrap pointer-events-none">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>AUTH_OPERATOR // 0x007</span>
        </div>

        {/* Top-Right Reticle Crosshair */}
        <Crosshair
          size={16}
          className="absolute -top-3 -right-3 text-cyan-400/60 animate-spin [animation-duration:20s] hidden sm:block pointer-events-none"
        />
      </motion.div>
    </div>
  );
}