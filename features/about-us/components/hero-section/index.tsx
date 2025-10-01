"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import User1 from "@/public/about-us/about-us-hero-image-03.png";
import User2 from "@/public/about-us/about-us-hero-image-01.png";
import User3 from "@/public/about-us/about-us-hero-image-02.png";

const images = [User1, User2, User3];

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth >= 640) return;

    let scrollAmount = 0;
    const scrollStep = 1;

    const scrollInterval = setInterval(() => {
      if (!el) return;

      scrollAmount += scrollStep;

      // When scrolled past the first set, reset to start smoothly
      if (scrollAmount >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        el.scrollLeft += scrollStep;
      }
    }, 20); // Adjust speed here

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section
      className="py-32 bg-gradient-to-br from-[#f9fcff] to-[#fff4ee]"
      style={{
        backgroundImage: `url("/bg-gradient.png")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1136px] mx-auto text-center px-4">
        <div className="max-w-[750px] mx-auto">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#06212C] mb-4 leading-tight">
            Raising the standard of domestic work with trust at the heart
          </h1>
          <p className="text-base sm:text-lg text-[#344054] font-normal mb-6">
            At ULO, we believe care is more than a service—it's the soul of
            every strong home and community. That’s why we’re building a world
            where domestic work is trusted, verified, and deeply respected.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex items-center overflow-x-scroll scrollbar-hide gap-4 sm:gap-5 mt-12 whitespace-nowrap"
        >
          {[...images, ...images].map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="user"
              height={1000}
              width={1000}
              className="w-full sm:w-[300px] md:w-[340px] lg:w-[388px] rounded-[24px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
