"use client";

import { Building2 } from "lucide-react";
import { ForBusinessModal } from "@/components/for-business-modal";

export function BusinessCtaBanner() {
  return (
    <section className="border-y border-[#1B5E37]/10 bg-[#1B5E37]/[0.06] py-12 md:py-16">
      <div className="mx-auto flex max-w-[1136px] flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1B5E37]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1B5E37]">
            <Building2 className="h-3.5 w-3.5" />
            Ulo for Business
          </div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-[#1a2e24] md:text-3xl">
            Need verified staff for your business?
          </h2>
          <p className="text-base leading-relaxed text-[#475467]">
            Hotels, restaurants, offices, and households — tell us what you
            need and our team will reach out with tailored staffing options.
          </p>
        </div>
        <ForBusinessModal
          triggerClassName="h-12 shrink-0 rounded-xl bg-[#1B5E37] px-8 text-base font-semibold text-white shadow-[0_4px_14px_rgba(27,94,55,0.28)] hover:bg-[#154a2d] hover:text-white"
          triggerChildren="Get in touch"
        />
      </div>
    </section>
  );
}
