"use client";
import React, { useEffect, useRef } from "react";
import {
  NannyIcon,
  PetCareICon,
  DriverICon,
  ChefICon,
  ElderCareICon,
  HousekeeperICon,
  LaundryICon,
  CleanerIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import BgImage from "@/public/images/image 6.svg";

const SERVICE_LIST = [
  {
    label: "Nanny",
    value: "CHILDCARE_NANNY",
    icon: <NannyIcon />,
    color: "#0E92C7",
  },
  {
    label: "Cleaner",
    value: "CLEANER",
    icon: <CleanerIcon />,
    color: "#009987",
  },
  {
    label: "Housekeeper",
    value: "HOUSEKEEPER",
    icon: <HousekeeperICon />,
    color: "#8F76B8",
  },
  { label: "Chef", value: "CHEF", icon: <ChefICon />, color: "#F1473C" },
  { label: "Driver", value: "DRIVER", icon: <DriverICon />, color: "#0D5EBA" },
  {
    label: "Elder care",
    value: "ELDER_CARE",
    icon: <ElderCareICon />,
    color: "#E74A8A",
  },
  {
    label: "Laundry man",
    value: "LAUNDRY_WASHER",
    icon: <LaundryICon />,
    color: "#AB5BA6",
  },
];

const ServiceSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const services = servicesRef.current;

    if (!scrollContainer || !services) return;

    // Clone the services for seamless looping
    const clone = services.cloneNode(true);
    scrollContainer.appendChild(clone);

    let animationFrameId: number;
    let scrollPosition = 0;
    const speed = 0.5; // Adjust speed here (lower = slower)

    const animate = () => {
      scrollPosition += speed;

      // Reset scroll position when reaching the end of original content
      if (scrollPosition >= services.scrollWidth) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      // Clean up the clone when component unmounts
      if (clone && scrollContainer.contains(clone)) {
        scrollContainer.removeChild(clone);
      }
    };
  }, []);

  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url("/images/image 6.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1136px] mx-auto">
        <div className="w-full max-w-[640px] mx-auto text-center mb-12">
          <h2 className="text-[32px] text-[#344054] font-semibold mb-3">
            Because the right help changes everything
          </h2>
          <p className="text-base text-[#475367]">
            Getting the help you need shouldn't be hard. With ULO, it isn't. We
            bring you verified caregivers, fast matching, and support every step
            of the way.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          {/* <div className="absolute -left-10 top-0 bottom-0 w-[160px] bg-gradient-to-r from-[#fafafa] via-white to-transparent z-10 pointer-events-none" />
          <div className="absolute -right-10 top-0 bottom-0 w-[160px] bg-gradient-to-l from-[#fafafa] via-white to-transparent z-10 pointer-events-none" /> */}

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-5 overflow-x-hidden py-4"
          >
            {/* Services list */}
            <div
              ref={servicesRef}
              className="flex items-center gap-5 flex-shrink-0"
            >
              {SERVICE_LIST.map((service) => (
                <div
                  key={service.value}
                  className="flex flex-col bg-white items-center justify-center gap-4 p-6 border border-[#E4E7EC] rounded-[24px] w-[160px] h-[120px] flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: `${service.color}1A` }}
                  >
                    {service.icon}
                  </div>
                  <p
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{ color: service.color }}
                  >
                    {service.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-16">
          <Button>Join as a careseeker</Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
