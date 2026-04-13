"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

function ReadMoreQuote({
  quote,
  clampChars = 140,
}: {
  quote: string;
  clampChars?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const normalized = quote.trim();
  const needsClamp = normalized.length > clampChars;
  const shown = !needsClamp || expanded ? normalized : `${normalized.slice(0, clampChars).trimEnd()}…`;

  return (
    <div className="mt-4">
      <blockquote className="text-[15px] leading-relaxed text-[#344054] md:text-base">
        &ldquo;{shown}&rdquo;
      </blockquote>
      {needsClamp ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-[#1B5E37] hover:text-[#154a2d] underline underline-offset-2"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}

const TestimonialSection = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const epsilon = 8;
    setCanPrev(scrollLeft > epsilon);
    setCanNext(scrollLeft < scrollWidth - clientWidth - epsilon);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollByDir = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.85, 320);
    el.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-t border-[#E8E6E0]/80 bg-transparent py-16 md:py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1a2e24] md:text-[2rem] text-center mb-10 md:mb-14">
          What our customers say
        </h2>

        <div className="relative md:static">
          <div
            ref={scrollerRef}
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
                <ReadMoreQuote quote={t.quote} />
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-[#1a2e24]">{t.name}</span>
                  {"location" in t && t.location ? (
                    <span className="text-[#475467]">, {t.location}</span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollByDir("prev")}
            disabled={!canPrev}
            className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8E6E0] bg-white/95 text-[#1a2e24] shadow-md backdrop-blur-sm transition-colors hover:border-[#1B5E37]/35 hover:bg-white disabled:pointer-events-none disabled:opacity-30 md:hidden"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollByDir("next")}
            disabled={!canNext}
            className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8E6E0] bg-white/95 text-[#1a2e24] shadow-md backdrop-blur-sm transition-colors hover:border-[#1B5E37]/35 hover:bg-white disabled:pointer-events-none disabled:opacity-30 md:hidden"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
