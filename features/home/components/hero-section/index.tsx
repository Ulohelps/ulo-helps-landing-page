"use client";

import { Button } from "@/components/ui/button";
import { CARESEEKER_REGISTER_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AvatarA from "@/public/about-us/about-us-hero-image-01.png";
import AvatarB from "@/public/about-us/about-us-hero-image-02.png";
import HeroMain from "@/public/hero-section.png";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

function HeroVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative mx-auto flex min-h-[400px] w-full max-w-[440px] items-center justify-center py-6 md:min-h-[480px] md:py-0">
      {/* Concentric echo rings */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-[2rem] border-2 border-[#1B5E37]/[0.14] md:rounded-[2.25rem]"
            style={{
              width: `calc(68% + ${i * 56}px)`,
              height: `calc(78% + ${i * 48}px)`,
              maxWidth: 380 + i * 28,
              maxHeight: 440 + i * 32,
            }}
          />
        ))}
      </div>

      {/* Dark portrait frame */}
      <div className="relative z-10 w-[min(100%,280px)] overflow-hidden rounded-[1.75rem] bg-[#0f1712] shadow-[0_24px_48px_rgba(15,23,18,0.35)] md:w-[300px]">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={HeroMain}
            alt="Verified domestic worker smiling, ready to help"
            fill
            className="object-cover object-[center_15%]"
            sizes="300px"
            priority
          />
        </div>
      </div>

      {/* Floating profile — bottom-left */}
      <motion.div
        className="absolute bottom-[8%] left-0 z-20 w-[max(200px,52vw)] max-w-[220px] rounded-xl border border-white/80 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,18,0.12)] md:bottom-[12%] md:-left-2"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
        }
      >
        <div className="flex gap-2.5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image
              src={AvatarA}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-[#1a2e24]">
              Raheemat Adenike
            </p>
            <p className="text-xs text-[#475467]">Childcare nanny · Lagos</p>
            <span className="mt-1.5 inline-flex items-center rounded-full bg-[#1B5E37]/12 px-2 py-0.5 text-[10px] font-semibold text-[#1B5E37]">
              Verified profile
            </span>
            <p className="mt-0.5 text-[10px] font-medium text-[#1B5E37]">
              Ready &amp; reliable
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating profile — top-right */}
      <motion.div
        className="absolute -right-1 top-[6%] z-20 w-[max(200px,52vw)] max-w-[210px] rounded-xl border border-white/80 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,18,0.12)] md:right-0 md:top-[10%]"
        {...(reduceMotion
          ? {}
          : {
              animate: { y: [0, -5, 0] },
              transition: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 0.8,
              },
            })}
      >
        <div className="flex gap-2.5">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image
              src={AvatarB}
              alt=""
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold text-[#1a2e24]">
              Chinedu Okafor
            </p>
            <p className="text-xs text-[#475467]">Housekeeper · Lekki</p>
            <span className="mt-1.5 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900">
              Low responsiveness
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative shields */}
      <div
        className="absolute left-[4%] top-[38%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-white shadow-md md:left-[2%]"
        aria-hidden
      >
        <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <div
        className="absolute bottom-[22%] right-[2%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 text-[#1a1408] shadow-md md:right-[4%]"
        aria-hidden
      >
        <Zap className="h-5 w-5" strokeWidth={2.4} />
      </div>
    </div>
  );
}

export function HeroSection() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-transparent pb-10 pt-24 md:pb-14 md:pt-28">
      {/*
        Bottom: fixed AnimatedPageBackground (gradient wash, orbs, grid).
        Top: translucent mint (#D9EAD3) so the hero is clearly green while the animation still reads through.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(217, 234, 211, 0.97) 0%,
            rgba(217, 234, 211, 0.94) 32%,
            rgba(217, 234, 211, 0.9) 58%,
            rgba(217, 234, 211, 0.58) 88%,
            rgba(253, 252, 247, 0) 100%
          )`,
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-2 md:px-6 md:pb-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left column */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <motion.h1
              className="text-balance text-3xl font-bold leading-[1.12] tracking-tight text-[#2d3436] md:text-4xl lg:text-[2.65rem] lg:leading-[1.08]"
              initial={reduceMotion ? false : fadeUp.initial}
              animate={reduceMotion ? undefined : fadeUp.animate}
              transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : 0.04 }}
            >
              Hire trusted & verified domestic workers in Lagos
            </motion.h1>
            <motion.p
              className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#4a5568] md:mx-0 md:text-lg"
              initial={reduceMotion ? false : fadeUp.initial}
              animate={reduceMotion ? undefined : fadeUp.animate}
              transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : 0.12 }}
            >
              Find domestic workers you can trust, fully verified and ready to
              help. Hire with confidence, right from your phone.
            </motion.p>

            {/* <motion.div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap md:items-start md:justify-start"
              initial={reduceMotion ? false : fadeUp.initial}
              animate={reduceMotion ? undefined : fadeUp.animate}
              transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : 0.2 }}
            >
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-xl bg-[#1a1a1a] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Download on the App Store
              </Link>
              <Link
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-xl bg-[#1a1a1a] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get it on Google Play
              </Link>
            </motion.div> */}

            <motion.div
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap md:items-center md:justify-start"
              initial={reduceMotion ? false : fadeUp.initial}
              animate={reduceMotion ? undefined : fadeUp.animate}
              transition={{ duration: 0.55, ease, delay: reduceMotion ? 0 : 0.28 }}
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <Button
                  onClick={() => router.push(CARESEEKER_REGISTER_URL)}
                  className={cn(
                    "h-11 rounded-full bg-[#1B5E37] px-7 text-sm font-semibold text-white",
                    "shadow-[0_4px_14px_rgba(27,94,55,0.28)] hover:bg-[#154a2d] hover:text-white"
                  )}
                >
                  Find a verified worker
                </Button>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <Button
                  variant="outline"
                  asChild
                  className="h-auto min-h-11 rounded-full border-[#1B5E37]/40 bg-white/80 px-6 py-2.5 text-center text-sm font-semibold leading-snug text-[#1B5E37] shadow-sm backdrop-blur-sm hover:border-[#1B5E37]/55 hover:bg-white hover:text-[#154a2d] whitespace-normal"
                >
                  <Link
                    href="/for-domestic-workers"
                    className="group inline-flex flex-wrap items-center justify-center gap-1.5 px-1 text-center"
                  >
                    <span className="text-balance">Register as a domestic worker</span>
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="order-1 hidden md:block md:order-2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={
                reduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.6, ease, delay: 0.1 }}
            >
              <HeroVisual reduceMotion={!!reduceMotion} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
