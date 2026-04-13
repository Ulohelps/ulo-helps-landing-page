import React from "react";
import Image from "next/image";
import ChefPic from "@/public/about-us/about-ulo.png";

const OurStory = () => {
  return (
    <section className="mx-auto max-w-[1136px] px-4 py-16 md:py-24 lg:py-28">
      <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-14 xl:gap-16">
        <div className="order-2 w-full shrink-0 lg:order-1 lg:w-[min(52%,556px)]">
          <div className="relative overflow-hidden rounded-2xl border border-[#17403A]/15 shadow-[0_12px_40px_-12px_rgba(23,64,58,0.18)] md:rounded-3xl">
            <Image
              src={ChefPic}
              alt="ULO domestic work and care"
              width={1000}
              height={1000}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 556px"
            />
          </div>
        </div>
        <div className="order-1 w-full lg:order-2 lg:flex-1">
          <div className="rounded-2xl border border-[#17403A]/20 bg-[#D4E8DB] p-6 shadow-sm sm:p-8 md:rounded-3xl md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight text-[#06212C] sm:text-[28px]">
              About ULO
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#06212C] sm:text-[17px]">
              Ulo helps provides fast and easy access to verified and skilled
              domestic workers for families and individuals who value convenience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
