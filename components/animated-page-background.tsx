"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function StaticOrbs() {
  return (
    <>
      <div className="absolute -left-[18%] top-[8%] h-[min(480px,55vw)] w-[min(480px,55vw)] rounded-full bg-[#1B5E37]/[0.12] blur-[100px]" />
      <div className="absolute -right-[12%] top-[28%] h-[min(420px,48vw)] w-[min(420px,48vw)] rounded-full bg-[#2d7a4e]/[0.1] blur-[90px]" />
      <div className="absolute bottom-[5%] left-[15%] h-[min(380px,42vw)] w-[min(380px,42vw)] rounded-full bg-[#fa6d4d]/[0.09] blur-[85px]" />
      <div className="absolute top-[6%] right-[4%] h-[min(340px,42vw)] w-[min(340px,42vw)] rounded-full bg-[#fa6d4d]/[0.07] blur-[78px]" />
    </>
  );
}

export function AnimatedPageBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#FDFCF7]" />

      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27, 94, 55, 0.042) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 94, 55, 0.042) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250, 109, 77, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 109, 77, 0.028) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          backgroundPosition: "28px 18px",
        }}
      />

      {reduceMotion ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5EC]/48 via-[#FFF2EC]/45 to-[#fa6d4d]/[0.12] opacity-[0.88]" />
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#E8F5EC]/48 via-[#FFF2EC]/45 to-[#fa6d4d]/[0.12]"
          animate={{ opacity: [0.68, 1, 0.68] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {reduceMotion ? (
        <StaticOrbs />
      ) : (
        <>
          <motion.div
            className="absolute -left-[18%] top-[8%] h-[min(480px,55vw)] w-[min(480px,55vw)] rounded-full bg-[#1B5E37]/[0.12] blur-[100px]"
            animate={{
              x: [0, 36, -12, 0],
              y: [0, 28, 14, 0],
              scale: [1, 1.08, 0.98, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease }}
          />
          <motion.div
            className="absolute -right-[12%] top-[28%] h-[min(420px,48vw)] w-[min(420px,48vw)] rounded-full bg-[#2d7a4e]/[0.1] blur-[90px]"
            animate={{
              x: [0, -32, 18, 0],
              y: [0, 40, -16, 0],
              scale: [1, 1.06, 1.02, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-[5%] left-[15%] h-[min(380px,42vw)] w-[min(380px,42vw)] rounded-full bg-[#fa6d4d]/[0.09] blur-[85px]"
            animate={{
              x: [0, 22, -20, 0],
              y: [0, -24, 12, 0],
              scale: [1, 1.05, 1, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease, delay: 2 }}
          />
          <motion.div
            className="absolute top-[6%] right-[4%] h-[min(340px,42vw)] w-[min(340px,42vw)] rounded-full bg-[#fa6d4d]/[0.075] blur-[78px]"
            animate={{
              x: [0, -18, 14, 0],
              y: [0, 20, -8, 0],
              scale: [1, 1.04, 0.99, 1],
            }}
            transition={{ duration: 21, repeat: Infinity, ease, delay: 0.5 }}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 92% 8%, rgba(250, 109, 77, 0.06), transparent 70%),
            radial-gradient(ellipse 85% 75% at 50% 42%, transparent 35%, rgba(253, 252, 247, 0.52) 100%)
          `,
        }}
      />
    </div>
  );
}
