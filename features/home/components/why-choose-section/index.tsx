"use client";

import {
  BadgeCheck,
  FileCheck2,
  GraduationCap,
  Star,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const BENEFITS: readonly {
  label: string;
  icon: LucideIcon;
  iconClassName?: string;
}[] = [
  { label: "Identity verified workers", icon: BadgeCheck },
  { label: "Reference checked", icon: FileCheck2 },
  { label: "Basic training completed", icon: GraduationCap },
  {
    label: "Rated by real customers",
    icon: Star,
    iconClassName: "fill-[#1B5E37]",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function WhyChooseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-[#E8E6E0]/80 bg-transparent py-16 md:py-24">
      <div className="mx-auto max-w-[1136px] px-4">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1a2e24] md:text-[2rem] text-center mb-10 md:mb-14">
          Why choose Ulo?
        </h2>
        <motion.div
          className="grid grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto"
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-60px" }}
        >
          {BENEFITS.map(({ label, icon: Icon, iconClassName }) => (
            <motion.div
              key={label}
              variants={reduceMotion ? undefined : item}
              whileHover={
                reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }
              }
              className="flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-2 py-5 shadow-[0_1px_3px_rgba(27,94,55,0.08),0_4px_14px_rgba(0,0,0,0.04)] border border-[#EEF0EB] transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B5E37]/12 text-[#1B5E37]">
                <Icon
                  className={cn("h-5 w-5 shrink-0", iconClassName)}
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
              <p className="text-[15px] font-medium leading-snug text-[#344054]">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
