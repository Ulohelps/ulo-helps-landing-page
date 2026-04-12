"use client";

import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

const STEPS = [
  { n: 1, title: "Tell us what you need" },
  { n: 2, title: "Pay securely to confirm your request" },
  { n: 3, title: "We match you with verified workers" },
  { n: 4, title: "Hire & get started" },
] as const;

const HowItWorks = () => {
  return (
    <section className="border-t border-white/[0.08] bg-[#17403A] py-16 md:py-24">
      <div className="mx-auto max-w-[1136px] px-4">
        <h2 className="mb-12 text-center font-serif text-3xl font-semibold tracking-tight text-[#FDFCF7] md:mb-16 md:text-[2rem]">
          How it works
        </h2>

        <div className="mx-auto flex max-w-5xl flex-row items-center gap-4 md:items-start md:justify-center md:gap-4">
          {STEPS.map((step, i) => (
            <Fragment key={step.n}>
              <div className="flex min-w-0 flex-1 flex-col items-center text-center md:w-auto md:max-w-[220px] md:flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9EAD3] text-lg font-bold text-[#17403A] shadow-md">
                  {step.n}
                </div>
                <p className="mt-4 text-[15px] font-medium leading-snug text-[#E8F5EC]/95">
                  {step.title}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="hidden shrink-0 text-white/35 md:flex md:items-center md:self-center md:pb-10 md:pt-0"
                  aria-hidden
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={2} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
