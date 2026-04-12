"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 0,
    quote:
      "The representative was very professional and supportive throughout the process of scanning through several potential candidates until I found a suitable person. Many thanks.",
    name: "Temidayo Odulaja",
  },
  {
    id: 1,
    quote:
      "I hired my housekeeper from Ulo helps. It's been 8 months since I hired her and she's doing perfectly fine.",
    name: "Chiamaka Igwe",
  },
  {
    id: 2,
    quote:
      "I had a very good experience with Ulohelps in searching for a job, I was interviewed the second day of my registration and immediately got a job, luckily for me it was an immediate resumption job. Thank you Ulohelps because I'd have been stranded in Lagos with no place to stay…. Ulohelps registration and getting a job is the fastest I've ever seen…. thank you so much ulohelps",
    name: "Morenike Blessing",
    location: "Lagos",
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

        <div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-4 pb-2 [-webkit-overflow-scrolling:touch] scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:snap-none"
          role="region"
          aria-label="Customer testimonials"
        >
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="w-[min(22rem,calc(100vw-2rem))] shrink-0 snap-center rounded-2xl border border-[#EEF0EB] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:w-auto md:min-w-0 md:shrink md:p-8"
            >
              <Stars />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#344054] md:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-[#1a2e24]">{t.name}</span>
                {"location" in t && t.location ? (
                  <span className="text-[#475467]">, {t.location}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
