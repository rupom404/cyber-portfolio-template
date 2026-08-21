'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const nameLines = [
  { initial: 'I', rest: 'FTAKHAR' },
  { initial: 'A', rest: 'HMED' },
  { initial: 'R', rest: 'UPOM' },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  // Step 0: Centered "IAR404" with glowing cyan accents
  // Step 1: "404" disappears, "I A R" glide into vertical column
  // Step 2: "FTAKHAR", "HMED", "UPOM" slide out horizontally
  // Step 3: Dark curved curtain slide-up exit
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1100);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3600);
    const t4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={step === 3 ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] flex flex-col justify-between bg-[#07090e] text-white select-none pointer-events-auto overflow-hidden"
    >
      {/* Ambient Theme Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-transparent to-transparent -z-10" />

      {/* Center Display Canvas */}
      <div className="flex-1 flex items-center justify-center px-8 sm:px-16 max-w-4xl mx-auto w-full">
        <motion.div
          layout
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex ${
            step === 0
              ? 'flex-row items-center justify-center'
              : 'flex-col items-start justify-center w-full max-w-lg space-y-2 sm:space-y-4'
          }`}
        >
          {nameLines.map((line, index) => (
            <motion.div
              layout
              key={line.initial}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline overflow-hidden"
            >
              {/* Initials (I, A, R) - Glowing Cyan Gradient */}
              <motion.span
                layout="position"
                className="text-5xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              >
                {line.initial}
              </motion.span>

              {/* Expanding Letters - Crisp Bright Zinc/White */}
              <motion.div
                initial={false}
                animate={
                  step >= 2
                    ? { width: 'auto', opacity: 1, x: 0 }
                    : { width: 0, opacity: 0, x: -15 }
                }
                transition={{
                  duration: 0.65,
                  delay: step >= 2 ? index * 0.12 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-5xl sm:text-8xl font-black tracking-tight text-zinc-100 ml-1">
                  {line.rest}
                </span>
              </motion.div>

              {/* 404 Badge/Suffix in Step 0 */}
              {index === 2 && (
                <motion.div
                  layout="position"
                  animate={
                    step === 0
                      ? { opacity: 1, width: 'auto', scale: 1 }
                      : { opacity: 0, width: 0, scale: 0.7 }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="text-5xl sm:text-8xl font-black tracking-tight text-cyan-400/80 ml-1 font-mono">
                    404
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Matching Curved Wave Curtain */}
      <div className="w-full overflow-hidden leading-none translate-y-[99%]">
        <svg
          className="w-full h-16 sm:h-24 fill-[#07090e]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,120 960,120 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </motion.div>
  );
}