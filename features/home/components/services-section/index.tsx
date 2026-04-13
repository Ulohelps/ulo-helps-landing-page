"use client";

import { Button } from "@/components/ui/button";
// import { CARESEEKER_REGISTER_URL, DOMESTIC_WORKER_CTA_URL } from "@/lib/site";
import { StartNowModal } from "@/components/start-now-modal";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";

const SERVICE_LIST = [
  {
    label: "Nanny",
    iconSrc: "/icons/nanny.png",
  },
  {
    label: "Housekeeper",
    iconSrc: "/icons/housekeeper.png",
  },
] as const;

const ServiceSection = () => {
  const router = useRouter();

  return (
    <section className="border-t border-[#E8E6E0]/80 bg-transparent py-16 md:py-24">
      <div className="mx-auto max-w-[1136px] px-4">
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#1a2e24] md:text-[2rem] text-center mb-10 md:mb-14">
          Services we offer
        </h2>

        <div
          className="mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide md:mx-auto md:grid md:max-w-xl md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
          role="list"
        >
          {SERVICE_LIST.map((service) => (
            <div
              key={service.label}
              role="listitem"
              className="flex min-w-[148px] shrink-0 snap-center flex-col items-center justify-center  rounded-2xl border border-[#EEF0EB] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:border-[#1B5E37]/20 hover:shadow-md md:min-w-0"
            >
              <div
                className="flex  items-center justify-center rounded-2xl"
              >
                <Image
                  src={service.iconSrc}
                  alt=""
                  width={78}
                  height={78}
                  className=" object-contain"
                />
              </div>
              <p className="text-center text-sm font-semibold text-[#1a2e24]">
                {service.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
          <StartNowModal
            triggerClassName="h-auto min-h-12 w-full shrink-0 rounded-xl bg-[#1B5E37] px-8 py-3 text-center text-base font-semibold leading-snug text-white shadow-[0_4px_14px_rgba(27,94,55,0.28)] hover:bg-[#154a2d] hover:text-white whitespace-normal sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
