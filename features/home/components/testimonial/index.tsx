"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 0,
    quote:
      "I found a reliable nanny within 2 days. Very professional.",
    name: "Sarah",
    location: "Lekki",
  },
  {
    id: 1,
    quote:
      "No stress, no bad experiences. Highly recommend Ulo.",
    name: "Tunde",
    location: "Yaba",
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

const TestimonialSection = () => {
  return (
    <section className="border-t border-[#E8E6E0]/80 bg-transparent py-16 md:py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1a2e24] md:text-[2rem] text-center mb-10 md:mb-14">
          What our customers say
        </h2>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="rounded-2xl border border-[#EEF0EB] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:p-8"
            >
              <Stars />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#344054] md:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-[#1a2e24]">{t.name}</span>
                <span className="text-[#475467]">, {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
