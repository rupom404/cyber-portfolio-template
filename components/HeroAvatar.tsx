'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Radio, Terminal, Crosshair } from 'lucide-react';

export default function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Link animations smoothly to scroll progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth physics spring to eliminate scroll jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Scroll-derived transformations
  const rotateOuter = useTransform(smoothProgress, [0, 1], [0, 180]);
  const rotateInner = useTransform(smoothProgress, [0, 1], [0, -180]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.5, 1], [6, 0, -6]);
  const cardRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-5, 0, 5]);
  const cardScale = useTransform(smoothProgress, [0, 0.5, 1], [0.93, 1, 0.95]);
  const cardY = useTransform(smoothProgress, [0, 1], [-15, 20]);
  const scanY = useTransform(smoothProgress, [0, 1], ['-20%', '260%']);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.25, 0.65, 0.25]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[290px] lg:max-w-[310px] aspect-[4/5] mx-auto flex items-center justify-center select-none perspective-[1000px]"
    >
      {/* 1. SCROLL-DRIVEN COUNTER-ROTATING RADAR RINGS */}
      <motion.div
        style={{ rotate: rotateOuter }}
        className="absolute -inset-5 sm:-inset-7 rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
      />
      <motion.div
        style={{ rotate: rotateInner }}
        className="absolute -inset-2 sm:-inset-3 rounded-full border border-cyan-400/15 pointer-events-none"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8]" />
      </motion.div>

      {/* 2. DYNAMIC AMBIENT NEON GLOW */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-2 rounded-3xl bg-cyan-500/15 blur-2xl -z-10 pointer-events-none"
      />

      {/* 3. 3D TILTED MAIN CARD & TACTICAL FRAME */}
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
          rotateX: cardRotateX,
          rotateY: cardRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-2xl p-[1px] bg-gradient-to-b from-cyan-400/50 via-cyan-900/20 to-blue-600/40 shadow-[0_0_25px_rgba(6,182,212,0.2)] group transition-shadow duration-500 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)]"
      >
        {/* Inner Card Container */}
        <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-[#04070d]">
          {/* Top HUD Telemetry Bar */}
          <div className="absolute top-0 inset-x-0 z-20 h-6 sm:h-7 px-2.5 sm:px-3 flex items-center justify-between bg-[#04060a]/85 backdrop-blur-md border-b border-cyan-900/40 text-[9px] font-mono text-cyan-400/90">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <Radio size={10} className="text-emerald-400 animate-pulse" /> TARGET_LOCK
            </span>
            <span className="text-zinc-500">0x007</span>
          </div>

          {/* Profile Picture */}
          <img
            src="/profile.jpg"
            alt="Iftakhar Ahmed"
            className="w-full h-full object-cover object-center grayscale-[12%] contrast-[105%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 pt-6 sm:pt-7 pb-7 sm:pb-8"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* Holographic Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_3px] opacity-25 pointer-events-none" />

          {/* Laser Scanning Line Driven by Scroll */}
          <motion.div
            style={{ y: scanY }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#22d3ee] pointer-events-none z-10"
          />

          {/* Bottom Security Operator Tag */}
          <div className="absolute bottom-0 inset-x-0 z-20 h-7 sm:h-8 px-2.5 sm:px-3 flex items-center justify-between bg-[#04060a]/90 backdrop-blur-md border-t border-cyan-900/40 text-[9px] sm:text-[10px] font-mono text-zinc-300">
            <span className="flex items-center gap-1 sm:gap-1.5 text-cyan-300">
              <Shield size={11} className="text-cyan-400" /> OPERATOR
            </span>
            <span className="text-[8px] sm:text-[9px] text-zinc-500 font-mono flex items-center gap-1">
              <Terminal size={9} /> ARCH_SEC
            </span>
          </div>
        </div>

        {/* 4. TACTICAL CORNER BRACKETS */}
        <div className="absolute -top-1 -left-1 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-3 sm:w-3.5 h-3 sm:h-3.5 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

        {/* Reticle Accent on Desktop */}
        <Crosshair
          size={14}
          className="absolute -top-5 -right-5 text-cyan-500/50 animate-spin [animation-duration:16s] hidden sm:block pointer-events-none"
        />
      </motion.div>
    </div>
  );
}